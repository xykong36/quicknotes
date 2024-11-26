import { createClient } from "@supabase/supabase-js";
import { Word, Difficulty, Example } from "./types";
import { Database } from "@/app/types/Supabase";

// Environment variables validation
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Initialize Supabase client with proper types
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Type guard for Difficulty enum
const isDifficulty = (value: unknown): value is Difficulty => {
  return Object.values(Difficulty).includes(value as Difficulty);
};

// Type guard for Example array
const isExampleArray = (value: unknown): value is Example[] => {
  if (!Array.isArray(value)) return false;
  return value.every(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "text" in item &&
      "translation" in item
  );
};

// Helper function to convert database timestamp to Date
const toDate = (timestamp: string | null): Date => {
  return timestamp ? new Date(timestamp) : new Date();
};

// Helper function to normalize word data from database
const normalizeWord = (dbWord: any): Word => {
  const word = dbWord.word || "";
  return {
    id: dbWord.id.toString(),
    word: word,
    wordLowerCase: word.toLowerCase(),
    firstLetter: word.charAt(0).toLowerCase(),
    length: word.length,
    translation: dbWord.translation || "",
    pronunciation: dbWord.pronunciation || "",
    examples: isExampleArray(dbWord.examples)
      ? dbWord.examples
      : [
          {
            text: dbWord.example || "",
            translation: "",
          },
        ],
    difficulty: isDifficulty(dbWord.difficulty)
      ? dbWord.difficulty
      : Difficulty.EASY,
    tags: Array.isArray(dbWord.tags) ? dbWord.tags : [],
    category: dbWord.category || undefined,
    isPartOfExpression: Boolean(dbWord.isPartOfExpression),
    expressionIds: Array.isArray(dbWord.expressionIds)
      ? dbWord.expressionIds
      : [],
    reviewCount:
      typeof dbWord.reviewCount === "number" ? dbWord.reviewCount : 0,
    masteryLevel:
      typeof dbWord.masteryLevel === "number" ? dbWord.masteryLevel : 0,
    lastReviewed: dbWord.lastReviewed ? toDate(dbWord.lastReviewed) : undefined,
    createdAt: toDate(dbWord.createdAt),
    updatedAt: toDate(dbWord.updatedAt),
  };
};

// Get all words with efficient querying
export const getWords = async (): Promise<Word[]> => {
  const { data: words, error } = await supabase
    .from("words")
    .select("*")
    .order("word", { ascending: true });

  if (error) {
    throw new Error(`Error fetching words: ${error.message}`);
  }

  return (words || []).map(normalizeWord);
};

// Get a single word by spell (case-insensitive)
export const getWord = async (spell: string): Promise<Word | null> => {
  const { data: word, error } = await supabase
    .from("words")
    .select("*")
    .ilike("word", spell)
    .single();

  if (error) {
    console.error(`Error fetching word '${spell}': ${error.message}`);
    return null;
  }

  return word ? normalizeWord(word) : null;
};

// Get words that are part of expressions
export const getWordsInExpressions = async (): Promise<Word[]> => {
  const { data: words, error } = await supabase
    .from("words")
    .select("*")
    .eq("isPartOfExpression", true)
    .order("word", { ascending: true });

  if (error) {
    throw new Error(`Error fetching words in expressions: ${error.message}`);
  }

  return (words || []).map(normalizeWord);
};

// Get words by difficulty level
export const getWordsByDifficulty = async (
  difficulty: Difficulty
): Promise<Word[]> => {
  const { data: words, error } = await supabase
    .from("words")
    .select("*")
    .eq("difficulty", difficulty)
    .order("word", { ascending: true });

  if (error) {
    throw new Error(
      `Error fetching words with difficulty ${difficulty}: ${error.message}`
    );
  }

  return (words || []).map(normalizeWord);
};

// Search words with various criteria
interface SearchCriteria {
  query?: string;
  difficulty?: Difficulty;
  tags?: string[];
  isInExpression?: boolean;
  minMasteryLevel?: number;
}

export const searchWords = async (
  criteria: SearchCriteria
): Promise<Word[]> => {
  let query = supabase.from("words").select("*");

  if (criteria.query) {
    query = query.ilike("word", `%${criteria.query}%`);
  }

  if (criteria.difficulty) {
    query = query.eq("difficulty", criteria.difficulty);
  }

  if (criteria.tags?.length) {
    query = query.contains("tags", criteria.tags);
  }

  if (typeof criteria.isInExpression === "boolean") {
    query = query.eq("isPartOfExpression", criteria.isInExpression);
  }

  if (typeof criteria.minMasteryLevel === "number") {
    query = query.gte("masteryLevel", criteria.minMasteryLevel);
  }

  const { data: words, error } = await query.order("word", { ascending: true });

  if (error) {
    throw new Error(`Error searching words: ${error.message}`);
  }

  return (words || []).map(normalizeWord);
};

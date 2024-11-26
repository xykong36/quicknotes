import { createClient } from "@supabase/supabase-js";
import { Word } from "./types";
import { Database } from "@app/types/Supabase";

// Initialize Supabase client
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const getWords = async (): Promise<Word[]> => {
  const { data: words, error } = await supabase.from("words").select("*");
  if (error) {
    throw new Error(`Error fetching words: ${error.message}`);
  }
  return words || [];
};

export async function getWordById(id: string): Promise<Word | null> {
  const { data: word, error } = await supabase
    .from("words")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error(`Error fetching word with id ${id}: ${error.message}`);
    return null;
  }
  return word;
}

export async function getWord(spell: string): Promise<Word | null> {
  const { data: word, error } = await supabase
    .from("words")
    .select("*")
    .eq("word", spell)
    .single();
  if (error) {
    console.error(`Error fetching word with word ${spell}: ${error.message}`);
    return null;
  }
  return word;
}

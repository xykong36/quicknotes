import { cache } from "react";
import { Word } from "./types";
import path from "path";
import { promises as fs } from "fs";

export const getWords = cache(async (): Promise<Word[]> => {
  const filePath = path.join(process.cwd(), "data/words.json");
  const data = await fs.readFile(filePath, "utf8");
  const words = JSON.parse(data);
  return words.words;
});

export async function getWord(id: string): Promise<Word | null> {
  const words = await getWords();
  return words.find((word) => word.id === id) || null;
}

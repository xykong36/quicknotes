export interface Word {
  id: string;
  word: string;
  translation: string;
  pronunciation: string;
  example: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  lastReviewed?: string;
}

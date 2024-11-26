import Link from "next/link";
import { Word } from "@/lib/types";

interface WordCardProps {
  word: Word;
}

export default function WordCard({ word }: WordCardProps) {
  return (
    <Link
      href={`/glossary/${word.word}`}
      className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold mb-2">{word.word}</h2>
          <p className="text-gray-600">{word.translation}</p>
        </div>
        <span
          className={`px-2 py-1 rounded text-sm ${
            word.difficulty === "easy"
              ? "bg-green-100 text-green-800"
              : word.difficulty === "medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {word.difficulty}
        </span>
      </div>
      {word.tags.length > 0 && (
        <div className="mt-4 flex gap-2 flex-wrap">
          {word.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}

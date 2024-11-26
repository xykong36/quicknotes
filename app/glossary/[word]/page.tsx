import { getWord, getWords } from "@/lib/words";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    word: string;
  };
}

export async function generateStaticParams() {
  const words = await getWords();
  return words.map((word) => ({
    word: word.word,
  }));
}

export default async function WordPage({ params }: PageProps) {
  const word = await getWord(params.word);

  if (!word) {
    notFound();
  }

  return (
    <article className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{word.word}</h1>
        <div className="flex gap-4 text-gray-600">
          <p>发音: {word.pronunciation}</p>
          <p>难度: {word.difficulty}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">翻译</h2>
        <p className="text-xl">{word.translation}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">例句</h2>
        <p className="italic">{word.example}</p>
      </div>

      {word.tags.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">标签</h2>
          <div className="flex gap-2 flex-wrap">
            {word.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

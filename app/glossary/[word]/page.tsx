import { getWord, getWords } from "@/lib/words";
import { notFound } from "next/navigation";
import { Word } from "@/lib/types";

interface PageProps {
  params: {
    word: string;
  };
}

export async function generateStaticParams() {
  const words = await getWords();
  return words.map((word: Word) => ({
    word: word.word,
  }));
}

export default async function WordPage({ params }: PageProps) {
  const word = await getWord(params.word);

  if (!word) {
    notFound();
  }

  // 获取第一个例句，如果没有则返回空字符串
  const firstExample = word.examples[0] ?? { text: "", translation: "" };

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
        <div>
          <p className="italic">{firstExample.text}</p>
          <p className="mt-2 text-gray-600">{firstExample.translation}</p>
        </div>
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

      {word.isPartOfExpression && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">相关表达</h2>
          <p className="text-gray-600">此单词是常用表达的一部分</p>
        </div>
      )}
    </article>
  );
}

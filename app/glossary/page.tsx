// 移除 "use client" 指令，使其成为服务器组件
import { getWords } from "@/lib/words";
import WordCard from "@/components/WordCard";
import { Suspense } from "react";
import { Word } from "@/lib/types";

async function WordList() {
  const words: Word[] = await getWords();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {words.map((word) => (
        <WordCard key={word.id} word={word} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">单词本</h1>
      <Suspense fallback={<div>加载中...</div>}>
        <WordList />
      </Suspense>
    </div>
  );
}

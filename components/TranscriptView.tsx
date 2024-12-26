const TEXT_COLORS = [
  "text-emerald-600 underline decoration-emerald-600/30",
  "text-rose-500 underline decoration-rose-500/30",
  "text-blue-600 underline decoration-blue-600/30",
  "text-amber-500 underline decoration-amber-500/30",
  "text-purple-600 underline decoration-purple-600/30",
  "text-red-500 underline decoration-red-500/30",
  "text-orange-500 underline decoration-orange-500/30",
  "text-indigo-600 underline decoration-indigo-600/30",
  "text-lime-600 underline decoration-lime-600/30",
  "text-pink-500 underline decoration-pink-500/30",
  "text-yellow-600 underline decoration-yellow-600/30",
  "text-violet-600 underline decoration-violet-600/30",
];

import { useState } from "react";

function BlankFilling({
  text,
  highlights,
}: {
  text: string;
  highlights: string[];
}) {
  const [revealedAnswers, setRevealedAnswers] = useState<{
    [key: number]: boolean;
  }>({});
  const parts = text.split(
    new RegExp(
      `(${highlights
        .map((str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|")})`,
      "g"
    )
  );

  const toggleAnswer = (index: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <p className="text-lg leading-relaxed font-bold">
      {parts.map((part, i) => {
        const highlightIndex = highlights.indexOf(part);
        if (highlightIndex !== -1) {
          return (
            <span
              key={i}
              onClick={() => toggleAnswer(highlightIndex)}
              className="cursor-pointer mx-2"
            >
              {revealedAnswers[highlightIndex] ? (
                <span
                  className={TEXT_COLORS[highlightIndex % TEXT_COLORS.length]}
                >
                  {part}
                </span>
              ) : (
                <span
                  className={TEXT_COLORS[highlightIndex % TEXT_COLORS.length]}
                >
                  {"_".repeat(part.length)}
                </span>
              )}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

function HighlightedText({
  text,
  highlights,
}: {
  text: string;
  highlights: string[];
}) {
  const parts = text.split(
    new RegExp(
      `(${highlights
        .map((str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|")})`,
      "g"
    )
  );

  return (
    <p className="text-lg leading-relaxed font-bold">
      {parts.map((part, i) => {
        const highlightIndex = highlights.indexOf(part);
        return highlightIndex !== -1 ? (
          <span
            key={i}
            className={TEXT_COLORS[highlightIndex % TEXT_COLORS.length]}
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </p>
  );
}

export default function TranscriptView({
  transcript,
  highlights,
}: {
  transcript: { en: string; cn: string };
  highlights: { en: string[]; cn: string[] };
}) {
  return (
    <div className="space-y-8">
      <section className="p-6">
        <HighlightedText text={transcript.cn} highlights={highlights.cn} />
      </section>

      <section className="p-6">
        <div className="flex gap-8">
          <div className="w-3/5">
            <HighlightedText text={transcript.en} highlights={highlights.en} />
          </div>
          <div className="w-2/5 border-l pl-8">
            <HighlightedText text={transcript.cn} highlights={highlights.cn} />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-medium mb-4">Vocabulary</h3>
        <div className="grid grid-cols-2 gap-4">
          {highlights.en.map((highlight, index) => (
            <div
              key={highlight}
              className="rounded-lg border p-3 flex justify-between items-center font-bold"
            >
              <span className={TEXT_COLORS[index % TEXT_COLORS.length]}>
                {highlight}
              </span>
              <span className="text-gray-600">{highlights.cn[index]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-4 border-t">
        <div className="space-y-4">
          <HighlightedText text={transcript.cn} highlights={highlights.cn} />
          <BlankFilling text={transcript.en} highlights={highlights.en} />
        </div>
      </section>
    </div>
  );
}

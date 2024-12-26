import { useState } from "react";
import { useHighlightedText } from "../hooks/useHighlightedText";
import { HighlightedSpan } from "./HighlightedSpan";

interface BlankFillingProps {
  text: string;
  highlights: string[];
}

export const BlankFilling = ({ text, highlights }: BlankFillingProps) => {
  const [revealedAnswers, setRevealedAnswers] = useState<
    Record<number, boolean>
  >({});
  const parts = useHighlightedText(text, highlights);

  const toggleAnswer = (index: number) => {
    setRevealedAnswers((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <p className="text-lg leading-relaxed font-bold">
      {parts.map((part, i) => {
        const highlightIndex = highlights.indexOf(part);
        if (highlightIndex === -1) return <span key={i}>{part}</span>;

        return (
          <span
            key={i}
            onClick={() => toggleAnswer(highlightIndex)}
            className="cursor-pointer mx-2"
          >
            {revealedAnswers[highlightIndex] ? (
              <HighlightedSpan text={part} colorIndex={highlightIndex} />
            ) : (
              <HighlightedSpan
                text={"_".repeat(part.length)}
                colorIndex={highlightIndex}
              />
            )}
          </span>
        );
      })}
    </p>
  );
};

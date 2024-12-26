import { useHighlightedText } from "@/hooks/useHighlightedText";
import { HighlightedSpan } from "./HighlightedSpan";

interface HighlightedTextProps {
  text: string;
  highlights: string[];
}

export const HighlightedText = ({ text, highlights }: HighlightedTextProps) => {
  const parts = useHighlightedText(text, highlights);

  return (
    <p className="text-lg leading-relaxed font-bold">
      {parts.map((part, i) => {
        const highlightIndex = highlights.indexOf(part);
        return highlightIndex !== -1 ? (
          <HighlightedSpan key={i} text={part} colorIndex={highlightIndex} />
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </p>
  );
};

import { TEXT_COLORS } from "@/constants/colors";

interface HighlightedSpanProps {
  text: string;
  colorIndex: number;
}

export const HighlightedSpan = ({ text, colorIndex }: HighlightedSpanProps) => (
  <span className={TEXT_COLORS[colorIndex % TEXT_COLORS.length]}>{text}</span>
);

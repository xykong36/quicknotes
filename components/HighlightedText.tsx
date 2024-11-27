import React from "react";
import parse from "html-react-parser";

interface HighlightedTextProps {
  html: string;
  className?: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  html,
  className = "text-lg leading-relaxed",
}) => {
  return <div className={className}>{parse(html)}</div>;
};

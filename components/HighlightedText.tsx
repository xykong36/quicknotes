import React from "react";

interface HighlightedTextProps {
  html: string;
  className?: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  html,
  className = "text-lg leading-relaxed",
}) => {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};

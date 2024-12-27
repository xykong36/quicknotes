import { memo } from "react";

interface TagButtonProps {
  tag: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

const getButtonClassName = (color: string, isSelected: boolean): string =>
  `
 px-3 py-1.5 
 rounded 
 text-sm 
 ${color}
 transition-all 
 duration-200
 ${
   isSelected
     ? "ring-2 ring-offset-2 ring-purple-500 shadow-md scale-105"
     : "opacity-80 hover:opacity-100 hover:shadow-sm"
 }
`.trim();

export const TagButton = memo(
  ({ tag, color, isSelected, onClick }: TagButtonProps) => (
    <button onClick={onClick} className={getButtonClassName(color, isSelected)}>
      {tag}
    </button>
  )
);

TagButton.displayName = "TagButton";

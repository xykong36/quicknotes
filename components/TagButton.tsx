import { memo } from "react";

interface TagButtonProps {
  tag: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

const getButtonClassName = (color: string, isSelected: boolean): string => {
  // 基础样式
  const baseStyle = `
    relative
    px-4 py-2
    rounded-full
    font-medium
    text-sm
    transition-all
    duration-300
    ease-out
    transform
    overflow-hidden
    hover:scale-105
    active:scale-95
    cursor-pointer
    backdrop-blur-sm
  `;

  // 选中状态样式
  const selectedStyle = isSelected
    ? `
      ring-2
      ring-offset-2
      ring-violet-500
      shadow-lg
      shadow-violet-100
      font-semibold
    `
    : `
      hover:shadow-md
      hover:-translate-y-0.5
      opacity-90
      hover:opacity-100
    `;

  return `
    ${baseStyle}
    ${color}
    ${selectedStyle}
  `.trim();
};

export const TagButton = memo(
  ({ tag, color, isSelected, onClick }: TagButtonProps) => (
    <button onClick={onClick} className={getButtonClassName(color, isSelected)}>
      <span className="relative z-10 flex items-center gap-1">
        <span className="opacity-70">#</span>
        {tag}
      </span>
    </button>
  )
);

TagButton.displayName = "TagButton";

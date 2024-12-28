import { useState } from "react";
import { useHighlightedText } from "@/hooks/useHighlightedText";
import { HighlightedSpan } from "./HighlightedSpan";
import { X } from "lucide-react";

interface BlankFillingProps {
  text: string;
  highlights: string[];
}

// 简化的提示消息组件
const HintMessage = ({ onClose }: { onClose: () => void }) => (
  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
    <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
      <span role="img" aria-label="hint">
        💡
      </span>
      <span className="mx-2">点击方框查看答案</span>
      <span className="text-xs text-gray-500">click to reveal</span>
      <button
        onClick={onClose}
        className="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="关闭提示"
      >
        <X size={16} className="text-gray-400 hover:text-gray-600" />
      </button>
    </div>
  </div>
);

// 简化的空白框组件
const BlankBox = ({
  width,
  colorIndex,
}: {
  width: number;
  colorIndex: number;
}) => (
  <span
    className={`inline-flex items-center justify-center border-2 rounded-md 
      min-w-[20px] h-6 mx-1 hover:bg-gray-100 hover:scale-105 
      transition-all duration-200 ease-in-out
      border-blue-${((colorIndex % 5) + 1) * 100}`}
    style={{ width: `${Math.max(width * 10, 20)}px` }}
  />
);

export const BlankFilling = ({ text, highlights }: BlankFillingProps) => {
  // 合并相关状态
  const [state, setState] = useState({
    showHint: true,
    revealed: {} as Record<number, boolean>,
  });

  // 使用 memoized 的文本分割
  const parts = useHighlightedText(text, highlights);

  // 事件处理函数
  const handleToggle = (index: number) => {
    setState((prev) => ({
      ...prev,
      revealed: { ...prev.revealed, [index]: !prev.revealed[index] },
    }));
  };

  const handleCloseHint = () => {
    setState((prev) => ({ ...prev, showHint: false }));
  };

  return (
    <div className="space-y-4">
      {state.showHint && <HintMessage onClose={handleCloseHint} />}

      <span className="block text-lg leading-relaxed font-bold">
        {parts.map((part, i) => {
          const highlightIndex = highlights.indexOf(part);

          // 非高亮文本直接返回
          if (highlightIndex === -1) {
            return <span key={i}>{part}</span>;
          }

          // 高亮文本处理
          return (
            <span
              key={i}
              onClick={() => handleToggle(highlightIndex)}
              className="cursor-pointer inline-flex items-center"
              role="button"
              tabIndex={0}
              title="点击查看答案"
              onKeyDown={(e) =>
                e.key === "Enter" && handleToggle(highlightIndex)
              }
            >
              {state.revealed[highlightIndex] ? (
                <HighlightedSpan text={part} colorIndex={highlightIndex} />
              ) : (
                <BlankBox width={part.length} colorIndex={highlightIndex} />
              )}
            </span>
          );
        })}
      </span>
    </div>
  );
};

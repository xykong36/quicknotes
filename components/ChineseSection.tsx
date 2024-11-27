import React from "react";
import { HighlightedText } from "./HighlightedText";

interface ChineseSectionProps {
  highlightedText: string;
}

export const ChineseSection: React.FC<ChineseSectionProps> = ({
  highlightedText,
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-medium mb-6 text-slate-800 flex items-center gap-2">
        一. 对照中文，尝试开口说英文
      </h2>

      <div className="bg-slate-50 rounded-lg p-6 shadow-sm border border-slate-200">
        <HighlightedText html={highlightedText} />
      </div>
    </div>
  );
};

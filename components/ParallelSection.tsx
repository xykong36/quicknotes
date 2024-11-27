import React from "react";
import { HelpCircle } from "lucide-react";
import { HighlightedText } from "./HighlightedText";

interface ParallelSectionProps {
  highlightedEnglish: string;
  highlightedChinese: string;
}

export const ParallelSection: React.FC<ParallelSectionProps> = ({
  highlightedEnglish,
  highlightedChinese,
}) => {
  return (
    <div>
      <h2 className="text-xl font-medium mb-6 text-slate-800">
        二、对照英文，排查卡壳的地方
        <div className="mt-2 flex items-center gap-2 text-sm">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <span className="text-slate-600">
            对照母语者的表达，查看不会和卡壳的地方。
          </span>
        </div>
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-50 rounded-lg p-6 shadow-sm border border-slate-200">
          <HighlightedText html={highlightedEnglish} />
        </div>

        <div className="bg-slate-50 rounded-lg p-6 shadow-sm border border-slate-200">
          <HighlightedText html={highlightedChinese} />
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Card } from "antd";
import PhraseExplanation from "./PhraseExplanation";

const phrases = [
  {
    en: "blood flow",
    cn: "促进血液循环",
    color: "text-blue-600",
  },
  {
    en: "do over and over",
    cn: "反复这样做",
    color: "text-green-600",
  },
  {
    en: "consistency",
    cn: "一直做下去",
    color: "text-purple-600",
  },
  {
    en: "build self-confidence",
    cn: "建立自信",
    color: "text-blue-600",
  },
  {
    en: "When it comes to",
    cn: "说到",
    color: "text-orange-600",
  },
  {
    en: "present ourselves to others",
    cn: "给他人的印象",
    color: "text-teal-600",
  },
  {
    en: "self-esteem",
    cn: "自尊",
    color: "text-indigo-600",
  },
  {
    en: "accomplishing",
    cn: "完成",
    color: "text-rose-600",
  },
  {
    en: "keeping yourself accountable",
    cn: "保持自律",
    color: "text-emerald-600",
  },
];

const paragraphs = {
  english: {
    text: "When you take a cold shower it immediately get that blood flow going. It will give you immediately energy and if this is something you will do over and over. It becomes a habit for you. It will become consistency and again this is where you build self-confidence and where you're actually really starting to feel yourself. When it comes to self confidence I feel that's something very often we try to find from our external world right. What other people think of us, how we present ourselves to others, But at the end your self-esteem comes from within. Almost having these little mini challenges for yourself and just accomplishing them and like doing them and keeping yourself accountable. That is where you're going to build self-confidence.",
  },
  chinese: {
    text: "当你洗冷水澡时，立刻促进血液循环，会让你瞬间充满能量。如果你反复这样做，它就会逐渐变成一种习惯。这会让你一直做下去，这也是建立自信的来源，你也开始真正去了解自己。说到自信，我们往往试图从外界寻找自信，比如别人对我们的看法、我们给他人的印象。但最终，自信是来自内心的。给自己设定一些小目标，努力完成它们，享受挑战的过程，并时刻保持自律，这才是建立自信的关键。",
  },
};

const HighlightedParagraph = ({ text, language }) => {
  // 创建一个数组来存储所有标记位置
  const markPositions = [];

  // 首先收集所有需要高亮的位置
  phrases.forEach((phrase, phraseIndex) => {
    const phraseText = language === "en" ? phrase.en : phrase.cn;
    let position = 0;

    while (true) {
      const index = text.indexOf(phraseText, position);
      if (index === -1) break;

      markPositions.push({
        start: index,
        end: index + phraseText.length,
        color: phrase.color,
        text: phraseText,
        priority: phraseIndex, // 使用数组索引作为优先级
      });

      position = index + 1; // 移动到下一个可能的位置
    }
  });

  // 按开始位置排序
  markPositions.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return a.priority - b.priority; // 如果开始位置相同，使用优先级排序
  });

  // 合并重叠的区间
  const mergedPositions = [];
  for (const pos of markPositions) {
    if (mergedPositions.length === 0) {
      mergedPositions.push(pos);
      continue;
    }

    const last = mergedPositions[mergedPositions.length - 1];
    if (pos.start < last.end) {
      // 如果当前区间的优先级更高，则使用当前区间
      if (pos.priority < last.priority) {
        mergedPositions[mergedPositions.length - 1] = pos;
      }
      // 否则保持原区间不变
    } else {
      mergedPositions.push(pos);
    }
  }

  // 生成spans
  let spans = [];
  let lastIndex = 0;

  mergedPositions.forEach((position, i) => {
    if (position.start > lastIndex) {
      spans.push(
        <span key={`text-${i}`}>
          {text.substring(lastIndex, position.start)}
        </span>
      );
    }

    spans.push(
      <span
        key={`highlight-${i}`}
        className={`${position.color} underline font-medium hover:opacity-80 cursor-pointer transition-opacity`}
        title="点击查看详情"
      >
        {position.text}
      </span>
    );

    lastIndex = position.end;
  });

  if (lastIndex < text.length) {
    spans.push(<span key="text-final">{text.substring(lastIndex)}</span>);
  }

  return <div className="leading-relaxed text-gray-800">{spans}</div>;
};

const BilingualParagraphComparison = () => {
  return (
    <Card className="w-full bg-white shadow-md">
      <div className="p-6 space-y-6">
        <HighlightedParagraph text={paragraphs.chinese.text} language="cn" />
        <div className="border-b border-gray-200" />
        <HighlightedParagraph text={paragraphs.english.text} language="en" />
        <div className="border-b border-gray-200" />
        <div className="p-6">
          <PhraseExplanation />
        </div>
      </div>
    </Card>
  );
};

const ParagraphPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <BilingualParagraphComparison />
      </div>
    </div>
  );
};

export default ParagraphPage;

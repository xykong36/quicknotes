import React from "react";

const IdiomPage = () => {
  const data = {
    "a slower morning": {
      meaning: {
        en: "A more relaxed and leisurely start to the day, with a less rushed pace than usual",
        zh: "比平常更加轻松悠闲的一个早晨，节奏更慢",
      },
      usage_context: {
        en: "Often used to describe a peaceful or relaxed morning routine, typically on weekends or holidays",
        zh: "通常用于描述周末或假期时平和轻松的早晨日常",
      },
      examples: [
        {
          english:
            "On Sundays, I like to have a slower morning - sleeping in, making coffee, and reading the paper.",
          chinese:
            "周日的时候，我喜欢慢悠悠的早晨 - 睡个懒觉，煮杯咖啡，看看报纸。",
          context: {
            en: "Describing a relaxing weekend morning routine",
            zh: "描述轻松的周末早晨日常",
          },
        },
        {
          english:
            "Since I'm working from home today, I can enjoy a slower morning without rushing to catch the train.",
          chinese:
            "因为今天在家工作，我可以享受一个从容的早晨，不用赶着去坐火车。",
          context: {
            en: "Describing a more relaxed start when there's no commute",
            zh: "描述不用通勤时更轻松的早晨",
          },
        },
      ],
      synonymous_phrases: [
        {
          en: "lazy morning",
          zh: "懒散的早晨",
        },
        {
          en: "relaxed start",
          zh: "轻松的开始",
        },
        {
          en: "easy morning",
          zh: "悠闲的早晨",
        },
        {
          en: "leisurely morning",
          zh: "从容的早晨",
        },
      ],
      related_expressions: [
        {
          phrase: {
            en: "Take it easy",
            zh: "放轻松",
          },
          meaning: {
            en: "To relax and avoid stress or hurry",
            zh: "放松心情，避免压力和匆忙",
          },
        },
        {
          phrase: {
            en: "Ease into the day",
            zh: "慢慢开始这一天",
          },
          meaning: {
            en: "To start the day gradually and without rushing",
            zh: "不慌不忙地开始新的一天",
          },
        },
      ],
    },
  };

  const phrase = Object.keys(data)[0];
  const content = data[phrase];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-green-500">✓</span>
        <h1 className="text-orange-400 text-xl">{phrase}</h1>
        <span className="text-gray-300">{content.meaning.zh}</span>
      </div>

      {/* English Definition */}
      <div className="mb-6">
        <h2 className="text-gray-400 underline mb-2">英文释义：</h2>
        <p>{content.meaning.en}</p>
      </div>

      {/* Examples */}
      {content.examples.map((example, index) => (
        <div key={index} className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-orange-500 w-6 h-6">🎯</span>
            <span>例：</span>
          </div>
          <div className="pl-8">
            <p className="mb-1">{example.chinese}</p>
            <p className="text-gray-400 underline">{example.english}</p>
          </div>
        </div>
      ))}

      {/* Synonymous Expressions */}
      <div className="mb-6">
        <h2 className="text-gray-400 underline mb-2">同义表达：</h2>
        {content.synonymous_phrases.map((phrase, index) => (
          <div key={index} className="mb-2">
            <span className="text-orange-400">{phrase.en}</span>
            <span className="text-gray-300 ml-2">{phrase.zh}</span>
          </div>
        ))}
      </div>

      {/* Related Expressions */}
      <div className="mb-6">
        <h2 className="text-gray-400 underline mb-2">相关表达：</h2>
        {content.related_expressions.map((expression, index) => (
          <div key={index} className="mb-2">
            <div className="text-gray-300">
              <span className="text-gray-300">{expression.phrase.en}</span>
              <span className="ml-2">{expression.phrase.zh}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Expressions */}
      <div>
        <h2 className="text-gray-300 mb-2">其他表达：</h2>
        <div className="text-gray-300">
          <p className="mb-2">Slow and steady 慢慢来</p>
          <p>Take it easy 慢慢来；不着急</p>
        </div>
      </div>
    </div>
  );
};

export default IdiomPage;

import React from "react";
import { Check } from "lucide-react";
import content from "../content.json"; // 假设 content.json 文件在 components 文件夹的上一级目录

const PhraseExplanation = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-50">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-amber-500">{content.header.emoji}</span>
        <span className="text-gray-700">{content.header.text}</span>
      </div>

      {/* Native Speaker Expression Section */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-amber-500">
          {content.nativeSpeakerExpression.emoji}
        </span>
        <span className="font-medium">
          {content.nativeSpeakerExpression.text}
        </span>
      </div>

      {/* Phrases */}
      {content.phrases.map((phrase, index) => (
        <div key={index} className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            {phrase.checkIcon && <Check className="text-green-500 h-5 w-5" />}
            <span>
              <span className="text-green-500 font-medium">
                {phrase.englishPhrase}
              </span>
              <span className="ml-2 text-gray-800">
                {phrase.chineseTranslation}
              </span>
            </span>
          </div>

          <div className="ml-6 mb-4">
            <div className="text-gray-600 mb-2">
              <span className="font-medium">{phrase.englishExplanation}</span>
            </div>
            {phrase.exampleSentences.map((sentence, idx) => (
              <div key={idx} className="mb-2">
                <details className="cursor-pointer">
                  <summary className="flex items-center gap-2">
                    <span className="text-amber-800">🧠</span>
                    <span>例：</span>
                    <span>{sentence.chinese}</span>
                  </summary>
                  <div className="ml-8 mt-2">{sentence.english}</div>
                </details>
              </div>
            ))}
          </div>

          <div className="mb-2">
            <div className="mb-1">
              <span className="font-medium">同义表达：</span>
              {phrase.synonyms.map((synonym, idx) => (
                <span key={idx} className="text-green-500 ml-2">
                  {synonym}
                </span>
              ))}
            </div>
            <div className="font-medium mb-1">相关表达：</div>
            <ul className="list-disc ml-6">
              {phrase.relatedExpressions.map((expression, idx) => (
                <li key={idx}>{expression}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhraseExplanation;

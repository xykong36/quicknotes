import React from "react";
// Types for the new data structure
interface SampleSentence {
  sentence: string;
  sentence_cn: string;
  source: string;
}

interface SynonymousPhrase {
  text: string;
  translation: string;
  meaning: string;
  usage_context_en: string;
  usage_context_cn: string;
  sample_sentences: SampleSentence[];
}

interface RelatedExpression {
  text: string;
  translation: string;
  meaning: string;
  usage_context_en: string;
  usage_context_cn: string;
  sample_sentences: SampleSentence[];
}

interface Expression {
  expression_id: string;
  text: string;
  translation: string;
  meaning_en: string;
  usage_context_en: string;
  usage_context_cn: string;
  sample_sentences: SampleSentence[];
  synonymous_phrases: SynonymousPhrase[];
  related_expressions: RelatedExpression[];
}

interface ExpressionsAnalysisSectionProps {
  data?: Expression[];
}

const ExpressionItem: React.FC<{
  english: string;
  chinese: string;
  className?: string;
}> = ({ english, chinese, className }) => (
  <div className={className}>
    <span className="underline">{english}</span> {chinese}
  </div>
);

export const ExpressionsAnalysisSection: React.FC<
  ExpressionsAnalysisSectionProps
> = ({
  data = [], // Provide default empty array
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-xl font-medium mt-6 mb-6 text-slate-800 flex items-center gap-2">
          母语者地道表达
          <span className="ml-2 text-base text-slate-500">
            💡 No expressions available
          </span>
        </h2>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-xl font-medium mt-6 mb-6 text-slate-800 flex items-center gap-2">
        母语者地道表达
        <span className="ml-2 text-base text-slate-500">
          💡 Learn authentic expressions used by native speakers
        </span>
      </h2>

      {data.map((expression, expressionIndex) => (
        <div
          key={expression.expression_id || expressionIndex} // Fallback to index if id is missing
          className={`bg-slate-50 rounded-lg p-6 shadow-sm border border-slate-200 ${
            expressionIndex !== data.length - 1 ? "mb-8" : ""
          }`}
        >
          {/* Main Expression */}
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500">✓</span>
              <span className="text-lg leading-relaxed font-bold text-emerald-500">
                {expression.text}
              </span>
              <span className="text-slate-700">{expression.translation}</span>
            </div>
          </div>

          {/* English Definition */}
          <div className="mb-6">
            <h3 className="text-slate-800 font-medium mb-2">英文释义：</h3>
            <p className="text-lg leading-relaxed font-bold text-slate-700">
              {expression.meaning_en}
            </p>
          </div>

          {/* Usage Context */}
          <div className="mb-6">
            <h3 className="text-slate-800 font-medium mb-2">使用场景：</h3>
            <p className="text-slate-700 mb-2">{expression.usage_context_cn}</p>
            <p className="text-slate-600">{expression.usage_context_en}</p>
          </div>

          {/* Examples */}
          {expression.sample_sentences?.length > 0 && (
            <div className="mb-6">
              {expression.sample_sentences.map((example, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center gap-2 mb-2 text-slate-700">
                    <span>🎯</span>
                    <span>例：</span>
                  </div>
                  <div className="pl-8">
                    <p className="mb-2 text-slate-700">{example.sentence_cn}</p>
                    <p className="text-lg leading-relaxed font-bold text-slate-600">
                      {example.sentence}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Source: {example.source}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Synonymous Expressions */}
          {expression.synonymous_phrases?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-slate-800 font-medium mb-3">同义表达：</h3>
              <div className="space-y-4">
                {expression.synonymous_phrases.map((phrase, index) => (
                  <div key={index} className="pl-4">
                    <ExpressionItem
                      english={phrase.text}
                      chinese={phrase.translation}
                      className="text-lg leading-relaxed font-bold text-slate-700 mb-2"
                    />
                    <p className="text-slate-600 mb-2">{phrase.meaning}</p>
                    <p className="text-slate-600 mb-2">
                      {phrase.usage_context_cn}
                    </p>
                    {phrase.sample_sentences?.map((sentence, sIndex) => (
                      <div key={sIndex} className="mb-3 pl-4">
                        <p className="text-slate-700">{sentence.sentence_cn}</p>
                        <p className="text-slate-600">{sentence.sentence}</p>
                        <p className="text-sm text-slate-500 mt-1">
                          Source: {sentence.source}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Expressions */}
          {expression.related_expressions?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-slate-800 font-medium mb-3">相关表达：</h3>
              <div className="space-y-4">
                {expression.related_expressions.map((expr, index) => (
                  <div key={index} className="pl-4">
                    <ExpressionItem
                      english={expr.text}
                      chinese={expr.translation}
                      className="text-lg leading-relaxed font-bold text-slate-700 mb-2"
                    />
                    <p className="text-slate-600 mb-2">{expr.meaning}</p>
                    <p className="text-slate-600 mb-2">
                      {expr.usage_context_cn}
                    </p>
                    {expr.sample_sentences?.map((sentence, sIndex) => (
                      <div key={sIndex} className="mb-3 pl-4">
                        <p className="text-slate-700">{sentence.sentence_cn}</p>
                        <p className="text-slate-600">{sentence.sentence}</p>
                        <p className="text-sm text-slate-500 mt-1">
                          Source: {sentence.source}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpressionsAnalysisSection;

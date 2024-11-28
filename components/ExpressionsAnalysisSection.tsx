// import React from "react";
// import { ExpressionItem } from "./ExpressionItem";
// import { IdiomData } from "@/types";

// interface ExpressionsAnalysisSectionProps {
//   data: Record<string, IdiomData>;
// }

// export const ExpressionsAnalysisSection: React.FC<
//   ExpressionsAnalysisSectionProps
// > = ({ data }) => {
//   const phrase = Object.keys(data)[0];
//   const content = data[phrase];

//   return (
//     <div className="mb-12">
//       <h2 className="text-xl font-medium mb-6 text-slate-800 flex items-center gap-2">
//         精读文本，积累地道实用生词和短语
//       </h2>

//       <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 space-y-6">
//         {/* Main Expression */}
//         <div className="flex items-center gap-2">
//           <span className="text-emerald-500">✓</span>
//           <span className="text-emerald-500">{phrase}</span>
//           <span className="text-slate-600">{content.meaning.zh}</span>
//         </div>

//         {/* English Definition */}
//         <div>
//           <h3 className="text-slate-600 underline mb-2">英文释义：</h3>
//           <p className="text-slate-700">{content.meaning.en}</p>
//         </div>

//         {/* Examples */}
//         <div>
//           {content.examples.map((example, index) => (
//             <div key={index} className="mb-4">
//               <div className="flex items-center gap-2 mb-2">
//                 <span>🎯</span>
//                 <span className="text-slate-600">例：</span>
//               </div>
//               <div className="pl-8">
//                 <p className="text-slate-600 mb-1">{example.chinese}</p>
//                 <p className="text-slate-500 underline">{example.english}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Synonymous Expressions */}
//         <div>
//           <h3 className="text-slate-600 underline mb-2">同义表达：</h3>
//           {content.synonymous_phrases.map((phrase, index) => (
//             <ExpressionItem
//               key={index}
//               english={phrase.en}
//               chinese={phrase.zh}
//               className="text-slate-600"
//             />
//           ))}
//         </div>

//         {/* Related Expressions */}
//         <div>
//           <h3 className="text-slate-600 underline mb-2">相关表达：</h3>
//           {content.related_expressions.map((expression, index) => (
//             <ExpressionItem
//               key={index}
//               english={expression.phrase.en}
//               chinese={expression.phrase.zh}
//               className="text-slate-600"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

import React from "react";
import { ExpressionItem } from "./ExpressionItem";
import { IdiomData } from "@/types";

interface ExpressionsAnalysisSectionProps {
  data: Record<string, IdiomData>;
}

export const ExpressionsAnalysisSection: React.FC<
  ExpressionsAnalysisSectionProps
> = ({ data }) => {
  const phrase = Object.keys(data)[0];
  const content = data[phrase];

  return (
    <div className="mb-12">
      <h2 className="text-xl font-medium mb-6 text-slate-800 flex items-center gap-2">
        三. 精读文本，积累地道实用生词和短语
        <span className="ml-2 text-base text-slate-500">
          😊学习母语者地道的表达。坚持每天积累一点点，你会惊讶于自己的词汇量增长速度。
        </span>
      </h2>

      <div className="bg-slate-50 rounded-lg p-6 shadow-sm border border-slate-200">
        {/* Main Expression */}
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">✓</span>
            <span className="text-lg leading-relaxed font-bold text-emerald-500">
              {phrase}
            </span>
            <span className="text-slate-700">{content.meaning.zh}</span>
          </div>
        </div>

        {/* English Definition */}
        <div className="mb-6">
          <h3 className="text-slate-800 font-medium mb-2">英文释义：</h3>
          <p className="text-lg leading-relaxed font-bold text-slate-700">
            {content.meaning.en}
          </p>
        </div>

        {/* Examples */}
        <div className="mb-6">
          {content.examples.map((example, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center gap-2 mb-2 text-slate-700">
                <span>🎯</span>
                <span>例：</span>
              </div>
              <div className="pl-8">
                <p className="mb-2 text-slate-700">{example.chinese}</p>
                <p className="text-lg leading-relaxed font-bold text-slate-600">
                  {example.english}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Synonymous Expressions */}
        <div className="mb-6">
          <h3 className="text-slate-800 font-medium mb-3">同义表达：</h3>
          <div className="space-y-2">
            {content.synonymous_phrases.map((phrase, index) => (
              <ExpressionItem
                key={index}
                english={phrase.en}
                chinese={phrase.zh}
                className="text-lg leading-relaxed font-bold text-slate-700"
              />
            ))}
          </div>
        </div>

        {/* Related Expressions */}
        <div className="mb-6">
          <h3 className="text-slate-800 font-medium mb-3">相关表达：</h3>
          <div className="space-y-2">
            {content.related_expressions.map((expression, index) => (
              <ExpressionItem
                key={index}
                english={expression.phrase.en}
                chinese={expression.phrase.zh}
                className="text-lg leading-relaxed font-bold text-slate-700"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

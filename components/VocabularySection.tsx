import { HighlightedSpan } from "./HighlightedSpan";

interface VocabularyItem {
  english: string;
  chinese: string;
}

interface VocabularySectionProps {
  highlightsEn: string[];
  highlightsCn: string[];
  title?: string;
}

export const VocabularySection = ({
  highlightsEn,
  highlightsCn,
  title = "Vocabulary",
}: VocabularySectionProps) => {
  // Combine English and Chinese words into a single array of objects
  const vocabularyItems: VocabularyItem[] = highlightsEn.map(
    (english, index) => ({
      english,
      chinese: highlightsCn[index] || "",
    })
  );

  return (
    <section className="bg-white rounded-xl font-bold shadow-lg p-4 sm:p-6">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      {/* Mobile-first: Start with single column, then use sm: breakpoint for desktop */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {vocabularyItems.map((item, index) => (
          <li
            key={`${item.english}-${index}`}
            className="rounded-lg border border-gray-200 p-3 flex flex-row justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <HighlightedSpan text={item.english} colorIndex={index} />
            <span className="text-gray-600 font-medium ml-2">
              {item.chinese}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

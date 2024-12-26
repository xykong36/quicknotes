import { HighlightedSpan } from "./HighlightedSpan";

interface VocabularySectionProps {
  highlightsEn: string[];
  highlightsCn: string[];
}

export const VocabularySection = ({
  highlightsEn,
  highlightsCn,
}: VocabularySectionProps) => (
  <section className="bg-white rounded-xl shadow-lg p-6">
    <h3 className="text-lg font-medium mb-4">Vocabulary</h3>
    <div className="grid grid-cols-2 gap-4">
      {highlightsEn.map((highlight, index) => (
        <div
          key={highlight}
          className="rounded-lg border p-3 flex justify-between items-center font-bold"
        >
          <HighlightedSpan text={highlight} colorIndex={index} />
          <span className="text-gray-600">{highlightsCn[index]}</span>
        </div>
      ))}
    </div>
  </section>
);

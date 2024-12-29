import { HighlightedSpan } from "./HighlightedSpan";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {vocabularyItems.map((item, index) => (
          <li key={`${item.english}-${index}`}>
            <Link href={`/expression/${encodeURIComponent(item.english)}`}>
              <Button
                variant="ghost"
                className="w-full rounded-lg border border-gray-200 p-3 flex flex-row justify-between items-center hover:bg-gray-50 hover:text-gray-700 transition-all group"
              >
                <div className="flex items-center flex-1">
                  <HighlightedSpan text={item.english} colorIndex={index} />
                  <span className="text-gray-600 font-medium ml-2">
                    {item.chinese}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-black-300" />
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

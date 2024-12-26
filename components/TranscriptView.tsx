import { TranscriptData, HighlightData } from "../types/transcript";
import { HighlightedText } from "./HighlightedText";
import { BlankFilling } from "./BlankFilling";
import { VocabularySection } from "./VocabularySection";

interface TranscriptViewProps {
  transcript: TranscriptData;
  highlights: HighlightData;
}

export default function TranscriptView({
  transcript,
  highlights,
}: TranscriptViewProps) {
  return (
    <div className="space-y-8">
      <section className="p-6">
        <HighlightedText text={transcript.cn} highlights={highlights.cn} />
      </section>

      <section className="p-6">
        <div className="flex gap-8">
          <div className="w-3/5">
            <HighlightedText text={transcript.en} highlights={highlights.en} />
          </div>
          <div className="w-2/5 border-l pl-8">
            <HighlightedText text={transcript.cn} highlights={highlights.cn} />
          </div>
        </div>
      </section>

      <VocabularySection
        highlightsEn={highlights.en}
        highlightsCn={highlights.cn}
      />

      <section className="pt-4 border-t">
        <div className="space-y-4">
          <HighlightedText text={transcript.cn} highlights={highlights.cn} />
          <BlankFilling text={transcript.en} highlights={highlights.en} />
        </div>
      </section>
    </div>
  );
}

import { TranscriptData, HighlightData } from "../types/transcript";
import { HighlightedText } from "./HighlightedText";
import { BlankFilling } from "./BlankFilling";
import { VocabularySection } from "./VocabularySection";
import AudioPlayer from "./AudioPlayer";

interface TranscriptViewProps {
  transcript: TranscriptData;
  highlights: HighlightData;
  episodeId: string;
}

export default function TranscriptView({
  transcript,
  highlights,
  episodeId,
}: TranscriptViewProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Part1 对照中文 尝试开口说英文
      </h2>
      <section className="p-6">
        <HighlightedText text={transcript.cn} highlights={highlights.cn} />
      </section>

      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Part2 对照英文 排查卡壳的地方
      </h2>
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

      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Part3 精读文本 积累地道实用生词和短语
      </h2>
      <VocabularySection
        highlightsEn={highlights.en}
        highlightsCn={highlights.cn}
      />

      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Part4 模仿跟读 学习语音语调
      </h2>
      <section className="pt-10 border-b">
        <div className="mb-2">
          <AudioPlayer episodeId={episodeId} />
        </div>
      </section>

      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Part6 口头填空 及时巩固地道表达
      </h2>
      <section className="pt-2">
        <div className="space-y-4">
          <HighlightedText text={transcript.cn} highlights={highlights.cn} />
          <BlankFilling text={transcript.en} highlights={highlights.en} />
        </div>
      </section>
    </div>
  );
}

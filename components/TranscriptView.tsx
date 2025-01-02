import { TranscriptData, HighlightData } from "../types/transcript";
import { HighlightedText } from "./HighlightedText";
import { BlankFilling } from "./BlankFilling";
import { VocabularySection } from "./VocabularySection";
import AudioPlayer from "./AudioPlayer";
import { AudioProvider } from "@/contexts/AudioContext";

interface TranscriptViewProps {
  transcript: TranscriptData;
  highlights: HighlightData;
  episodeId: string;
}

const ContentBlock = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>{children}</div>
);

export default function TranscriptView({
  transcript,
  highlights,
  episodeId,
}: TranscriptViewProps) {
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-8 px-4 md:px-0">
      {children}
    </h2>
  );

  const Section = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <section className={`p-4 md:p-6 ${className}`}>{children}</section>;

  const PlayerSection = ({ className = "" }: { className?: string }) => (
    <div className={`mb-4 ${className}`}>
      <AudioPlayer />
    </div>
  );

  return (
    <AudioProvider episodeId={episodeId}>
      <div className="pt-6 space-y-6 md:space-y-8 max-w-7xl mx-auto">
        {/* Part 1 */}
        <div>
          <SectionTitle>Part1 对照中文 尝试开口说英文</SectionTitle>
          <Section>
            <HighlightedText text={transcript.cn} highlights={highlights.cn} />
          </Section>
        </div>

        {/* Part 2 */}
        <div>
          <SectionTitle>Part2 对照英文 排查卡壳的地方</SectionTitle>
          <Section>
            <PlayerSection className="mb-6" />
            <div className="flex flex-col md:flex-row md:gap-8">
              <div className="w-full md:w-3/5 space-y-4">
                <ContentBlock className="md:bg-transparent md:p-0">
                  <HighlightedText
                    text={transcript.en}
                    highlights={highlights.en}
                  />
                </ContentBlock>
              </div>
              <div className="hidden md:block md:w-2/5 md:border-l md:pl-8">
                <div className="md:bg-transparent">
                  <HighlightedText
                    text={transcript.cn}
                    highlights={highlights.cn}
                  />
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Part 3 */}
        <div>
          <SectionTitle>Part3 精读文本 积累地道实用生词和短语</SectionTitle>
          <Section>
            <VocabularySection
              highlightsEn={highlights.en}
              highlightsCn={highlights.cn}
            />
          </Section>
        </div>

        {/* Part 4 */}
        <div>
          <SectionTitle>Part4 模仿跟读 学习语音语调</SectionTitle>
          <Section className="border-b">
            <PlayerSection />
          </Section>
        </div>

        {/* Part 6 */}
        <div>
          <SectionTitle>Part6 口头填空 及时巩固地道表达</SectionTitle>
          <Section>
            <div className="space-y-4">
              <ContentBlock className="mb-4">
                <HighlightedText
                  text={transcript.cn}
                  highlights={highlights.cn}
                />
              </ContentBlock>
              <BlankFilling text={transcript.en} highlights={highlights.en} />
            </div>
          </Section>
        </div>
      </div>
    </AudioProvider>
  );
}

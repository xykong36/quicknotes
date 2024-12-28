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

// 提取可复用的内容区块组件
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
  // 提取 Section 标题组件以复用样式
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-8 px-4 md:px-0">
      {children}
    </h2>
  );

  // 提取 Section 容器组件
  const Section = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <section className={`p-4 md:p-6 ${className}`}>{children}</section>;

  // 提取音频播放器组件，统一样式
  const PlayerSection = ({ className = "" }: { className?: string }) => (
    <div className={`mb-4 ${className}`}>
      <AudioPlayer episodeId={episodeId} />
    </div>
  );

  return (
    <div className="pt-6 space-y-6 md:space-y-8 max-w-7xl mx-auto">
      {/* Part 1 */}
      <div>
        <SectionTitle>Part1 对照中文 尝试开口说英文</SectionTitle>
        <Section>
          <HighlightedText text={transcript.cn} highlights={highlights.cn} />
        </Section>
      </div>

      {/* Part 2 - 移动端上下布局，桌面端左右布局 */}
      <div>
        <SectionTitle>Part2 对照英文 排查卡壳的地方</SectionTitle>
        <Section>
          {/* Audio player for Part 2 */}
          <PlayerSection className="mb-6" />

          {/* Mobile-first: Container starts as single column */}
          <div className="flex flex-col md:flex-row md:gap-8">
            {/* English section with player - full width on mobile */}
            <div className="w-full md:w-3/5 space-y-4">
              <ContentBlock className="md:bg-transparent md:p-0">
                <HighlightedText
                  text={transcript.en}
                  highlights={highlights.en}
                />
              </ContentBlock>
            </div>

            {/* Chinese section - hidden on mobile, visible on md breakpoint */}
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
  );
}

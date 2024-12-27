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

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
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
          <div className="flex flex-col md:flex-row md:gap-8">
            {/* 英文部分 */}
            <div className="mb-6 md:mb-0 md:w-3/5">
              <div className="bg-gray-50 p-4 rounded-lg md:bg-transparent md:p-0">
                <HighlightedText
                  text={transcript.en}
                  highlights={highlights.en}
                />
              </div>
            </div>

            {/* 中文部分 */}
            <div className="md:w-2/5 md:border-l md:pl-8">
              <div className="bg-gray-50 p-4 rounded-lg md:bg-transparent md:p-0">
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
          <div className="mb-2">
            <AudioPlayer episodeId={episodeId} />
          </div>
        </Section>
      </div>

      {/* Part 6 */}
      <div>
        <SectionTitle>Part6 口头填空 及时巩固地道表达</SectionTitle>
        <Section>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <HighlightedText
                text={transcript.cn}
                highlights={highlights.cn}
              />
            </div>
            <BlankFilling text={transcript.en} highlights={highlights.en} />
          </div>
        </Section>
      </div>
    </div>
  );
}

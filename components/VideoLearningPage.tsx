"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import subtitles from "@/data/subtitles.json";
// const subtitles = [
//   {
//     timestamp: "00:04",
//     en: "Few insects have captured our imagination like the monarch butterfly. Their migration is one of the most iconic wildlife spectacles in North America, but they are also one of the best environmental indicators we have of the health of our ecosystems.",
//     cn: "很少有昆虫像帝王蝶一样如此吸引我们的想象力。它们的迁徙是北美最具标志性的野生动物奇观之一，同时它们也是我们衡量生态系统健康状况的最佳环境指标之一。",
//     highlights: {
//       en: [
//         "captured our imagination",
//         "iconic wildlife spectacles",
//         "environmental indicators",
//       ],
//       cn: ["吸引我们的想象力", "标志性的野生动物奇观", "环境指标"],
//     },
//   },
//   {
//     timestamp: "00:20",
//     en: "And they have been in decline for the last 40 years. So they might be telling us a bigger story. A story about our relationship with the natural world.",
//     cn: "在过去40年里，它们的数量一直在减少。因此，它们可能在向我们讲述一个更大的故事——一个关于我们与自然世界关系的故事。",
//     highlights: {
//       en: ["in decline", "relationship with the natural world"],
//       cn: ["数量减少", "与自然世界的关系"],
//     },
//   },
//   {
//     timestamp: "00:31",
//     en: "Every year, these amazing insects undertake one of the most extraordinary journeys on this planet. It takes from three to five generations of monarchs to complete the whole migration.",
//     cn: "每年，这些神奇的昆虫都会开始地球上最非凡的旅程之一。完成整个迁徙需要经过三到五代帝王蝶。",
//     highlights: {
//       en: ["extraordinary journeys", "generations"],
//       cn: ["非凡的旅程", "代"],
//     },
//   },
//   {
//     timestamp: "00:44",
//     en: "And it starts in Mexico in the spring, when the monarchs that spend the winter there travel back north to lay their eggs. So the first and second generation of monarchs are born and remain in the USA, and they live up to six weeks, more or less.",
//     cn: "这一切始于墨西哥的春天，在那里过冬的帝王蝶会向北迁徙产卵。第一代和第二代帝王蝶出生在美国并留在那里，它们的寿命大约是六周左右。",
//     highlights: {
//       en: ["travel back north", "lay their eggs", "six weeks"],
//       cn: ["向北迁徙", "产卵", "六周"],
//     },
//   },
//   {
//     timestamp: "01:01",
//     en: "But most migratory monarchs belong to the third and fourth generation.",
//     cn: "但大多数迁徙的帝王蝶属于第三代和第四代。",
//     highlights: {
//       en: ["migratory monarchs"],
//       cn: ["迁徙的帝王蝶"],
//     },
//   },
// ];

const highlightColors = [
  "text-pink-600 font-medium",
  "text-blue-600 font-medium",
  "text-emerald-600 font-medium",
  "text-purple-600 font-medium",
  "text-amber-600 font-medium",
];

const VideoLearningPage = ({ videoId }: VideoLearningPageProps) => {
  const videoRef = useRef<HTMLIFrameElement>(null);
  const [showChinese, setShowChinese] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);

  const handleTimeUpdate = (time: string) => {
    const [minutes, seconds] = time.split(":").map(Number);
    const totalSeconds = minutes * 60 + seconds;

    if (videoRef.current) {
      const iframe = videoRef.current;
      iframe.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: "seekTo",
          args: [totalSeconds],
        }),
        "*"
      );
    }
  };

  const highlightText = (
    text: string,
    highlights: string[],
    colorIndex: number
  ) => {
    let result = text;
    highlights.forEach((highlight, i) => {
      const color = highlightColors[(colorIndex + i) % highlightColors.length];
      const regex = new RegExp(highlight, "gi");
      result = result.replace(
        regex,
        `<span class="${color} hover:underline">${highlight}</span>`
      );
    });
    return <div dangerouslySetInnerHTML={{ __html: result }} />;
  };

  const getSubtitlesByVideoId = (videoId) => {
    const video = subtitles.find((video) => video.video_id === videoId);
    return video ? video.subtitle : [];
  };

  const subtitlesForVideo = getSubtitlesByVideoId(videoId);

  return (
    <div className="w-full">
      {/* Video Section */}
      <div className="aspect-w-16 aspect-h-9 mb-10 max-w-4xl mx-auto h-[500px]">
        <iframe
          ref={videoRef}
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Controls */}
      <div className="flex justify-end mb-4 space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowEnglish(!showEnglish)}
          className="flex items-center gap-2"
        >
          {showEnglish ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          {showEnglish ? "Hide English" : "Show English"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowChinese(!showChinese)}
          className="flex items-center gap-2"
        >
          {showChinese ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
          {showChinese ? "隐藏中文" : "显示中文"}
        </Button>
      </div>

      {/* Subtitles Section */}
      <ScrollArea className="h-[600px] rounded-md border">
        <div className="p-4">
          <div className="space-y-4">
            {subtitlesForVideo.map((subtitle, index) => (
              <Card
                key={index}
                className="w-full hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => handleTimeUpdate(subtitle.timestamp)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-500">
                      {subtitle.timestamp}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {showEnglish && (
                      <div className="text-gray-900">
                        {highlightText(
                          subtitle.en,
                          subtitle.highlights.en,
                          index
                        )}
                      </div>
                    )}
                    {showChinese && (
                      <div className="text-gray-600">
                        {highlightText(
                          subtitle.cn,
                          subtitle.highlights.cn,
                          index
                        )}
                      </div>
                    )}
                    {!showEnglish && !showChinese && (
                      <div className="text-gray-400 italic text-center py-2">
                        点击显示按钮查看字幕 / Click show button to view
                        subtitles
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default VideoLearningPage;

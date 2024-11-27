import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import subtitles from "@/data/subtitles.json";

const highlightColors = [
  "text-emerald-600 font-medium", // 绿色
  "text-orange-500 font-medium", // 橙色
  "text-blue-500 font-medium", // 蓝色
  "text-red-500 font-medium", // 红色
  "text-pink-500 font-medium", // 粉色
];

interface VideoLearningPageProps {
  videoId: string;
}

const VideoLearningPage = ({ videoId }: VideoLearningPageProps) => {
  const videoRef = useRef<HTMLIFrameElement>(null);

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
        `<span class="${color}">${highlight}</span>`
      );
    });
    return <div dangerouslySetInnerHTML={{ __html: result }} />;
  };

  const getSubtitlesByVideoId = (videoId: string) => {
    const video = subtitles.find((video) => video.video_id === videoId);
    return video ? video.subtitle : [];
  };

  const subtitlesForVideo = getSubtitlesByVideoId(videoId);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">视频学习</h1>

      {/* Video Section */}
      <div className="aspect-w-16 aspect-h-9 mb-10 h-[500px]">
        <iframe
          ref={videoRef}
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Subtitles Tabs */}
      <Tabs defaultValue="chinese" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="chinese">对照中文，尝试开口说英文</TabsTrigger>
          <TabsTrigger value="parallel">对照英文，排查卡壳的地方</TabsTrigger>
        </TabsList>

        {/* Chinese First Tab */}
        <TabsContent value="chinese">
          <ScrollArea className="h-[600px] rounded-md border">
            <div className="p-6 space-y-6">
              {subtitlesForVideo.map((subtitle, index) => (
                <Card
                  key={`chinese-${index}`}
                  className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  onClick={() => handleTimeUpdate(subtitle.timestamp)}
                >
                  <CardContent className="p-6">
                    <div className="text-gray-600 mb-4">
                      {highlightText(
                        subtitle.cn,
                        subtitle.highlights.cn,
                        index
                      )}
                    </div>
                    <div className="text-sm text-gray-400">
                      {subtitle.timestamp}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Parallel Text Tab */}
        <TabsContent value="parallel">
          <ScrollArea className="h-[600px] rounded-md border">
            <div className="p-6 space-y-6">
              {subtitlesForVideo.map((subtitle, index) => (
                <Card
                  key={`parallel-${index}`}
                  className="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  onClick={() => handleTimeUpdate(subtitle.timestamp)}
                >
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        {highlightText(
                          subtitle.en,
                          subtitle.highlights.en,
                          index
                        )}
                      </div>
                      <div className="text-gray-600">
                        {highlightText(
                          subtitle.cn,
                          subtitle.highlights.cn,
                          index
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                      {subtitle.timestamp}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VideoLearningPage;

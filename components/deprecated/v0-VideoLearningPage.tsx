"use client";

import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EyeOff, Eye } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import subtitles from "@/data/subtitles.json";

const highlightColors = [
  "text-pink-600 font-medium",
  "text-blue-600 font-medium",
  "text-emerald-600 font-medium",
  "text-purple-600 font-medium",
  "text-amber-600 font-medium",
];

interface VideoLearningPageProps {
  videoId: string;
}

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

  const getSubtitlesByVideoId = (videoId: string) => {
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

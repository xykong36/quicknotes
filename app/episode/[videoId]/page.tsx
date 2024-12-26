"use client";

import React from "react";
import { ExpressionsAnalysisSection } from "@/components/ExpressionsAnalysisSection";

import subtitles from "@/data/subtitles.json";
import ep4ExpressionsData from "@/data/local/ep4-expressions.json";
import type { VideoSubtitle } from "@/types";
import SubtitlePlayer from "@/components/SubtitlePlayer";

export default function LanguageLearningPage({
  params: { videoId },
}: {
  params: { videoId: string };
}) {
  const video = React.useMemo(() => {
    return (subtitles as VideoSubtitle[]).find((v) => v.video_id === videoId);
  }, [videoId]);

  if (!video) {
    return (
      <div className="min-h-screen bg-white text-slate-900 p-8">
        Video not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 p-8">
      <h1 className="text-4xl font-bold mb-2">Video {videoId}</h1>

      <ExpressionsAnalysisSection data={ep4ExpressionsData.expressions} />

      <SubtitlePlayer />
    </div>
  );
}

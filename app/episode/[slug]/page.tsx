"use client";

import React from "react";
import { ChineseSection } from "@/components/ChineseSection";
import { ParallelSection } from "@/components/ParallelSection";
import { ExpressionsAnalysisSection } from "@/components/ExpressionsAnalysisSection";
import { highlightText, combineSubtitles } from "@/lib/utils";
import subtitles from "@/data/subtitles.json";
import idiomData from "@/data/idiom.json";
import type { VideoSubtitle } from "@/types";

const colorClasses = [
  "text-emerald-600",
  "text-orange-500",
  "text-blue-600",
  "text-red-500",
  "text-pink-500",
] as const;

export default function LanguageLearningPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const videoId = slug;

  const video = React.useMemo(() => {
    return (subtitles as VideoSubtitle[]).find((v) => v.video_id === videoId);
  }, [videoId]);

  const { text, highlights } = React.useMemo(() => {
    if (!video)
      return { text: { en: "", cn: "" }, highlights: { en: [], cn: [] } };
    return combineSubtitles(video.subtitle);
  }, [video]);

  const highlightedContent = React.useMemo(() => {
    // Debug logs
    // console.log("highlights", highlights);
    // console.log("text.cn", text.cn, "highlights.cn", highlights.cn);
    // console.log(
    //   "highlightText(text.cn, highlights.cn, colorClasses)",
    //   highlightText(text.cn, highlights.cn, colorClasses)
    // );
    return {
      english: highlightText(text.en, highlights.en, colorClasses),
      chinese: highlightText(text.cn, highlights.cn, colorClasses),
    };
  }, [text, highlights]);

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

      <ChineseSection highlightedText={highlightedContent.chinese} />

      <ParallelSection
        highlightedEnglish={highlightedContent.english}
        highlightedChinese={highlightedContent.chinese}
      />

      <ExpressionsAnalysisSection data={idiomData} />
    </div>
  );
}

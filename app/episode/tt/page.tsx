"use client";

import React from "react";
import type { Transcript, Subtitle } from "@/types/transcript";

function combineSubtitles(subtitles: Subtitle[]) {
  return {
    en: subtitles.map((s) => s.en).join(" "),
    cn: subtitles.map((s) => s.cn).join(""),
  };
}

async function getTranscript(videoId: string) {
  console.log(videoId);
  const response = await fetch(`/api/transcripts/jFl9kFms7nA`);
  if (!response.ok) {
    throw new Error("Failed to fetch transcript");
  }
  const data = await response.json();
  return data.transcript as Transcript;
}

export default function TranscriptPage({
  params: { videoId },
}: {
  params: { videoId: string };
}) {
  const [transcript, setTranscript] = React.useState<{
    en: string;
    cn: string;
  } | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadTranscript() {
      try {
        setLoading(true);
        const data = await getTranscript(videoId);
        setTranscript(combineSubtitles(data.subtitles));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load transcript"
        );
      } finally {
        setLoading(false);
      }
    }

    loadTranscript();
  }, [videoId]);

  if (loading) {
    return <div className="animate-pulse p-8">Loading transcript...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-8">Error: {error}</div>;
  }

  if (!transcript) {
    return <div className="p-8">No transcript found</div>;
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold">Video Transcript: {videoId}</h1>

      <div className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">English Text</h2>
          <div className="text-lg leading-relaxed">{transcript.en}</div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Chinese Text</h2>
          <div className="text-lg leading-relaxed">{transcript.cn}</div>
        </div>
      </div>
    </div>
  );
}

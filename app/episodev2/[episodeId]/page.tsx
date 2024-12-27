"use client";

import { notFound } from "next/navigation";
import TranscriptView from "@/components/TranscriptView";
import allTranscripts from "@/data/local/all-full-transcript.json";

interface PageProps {
  params: {
    episodeId: string;
  };
}

interface Transcript {
  full_transcript: {
    en: string;
    cn: string;
  };
  highlights: {
    en: string[];
    cn: string[];
  };
}

interface AllTranscripts {
  [key: string]: Transcript;
}

// 定义 allTranscripts 的类型
const typedAllTranscripts: AllTranscripts = allTranscripts as AllTranscripts;

export default function Page({ params }: PageProps) {
  const { episodeId } = params;
  const episodeKey = `episode_${episodeId}`;
  const episodeData = typedAllTranscripts[episodeKey];

  if (!episodeData) {
    notFound();
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <main className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Episode {episodeId} Transcript
        </h1>
        <TranscriptView
          transcript={episodeData.full_transcript}
          highlights={episodeData.highlights}
          episodeId={episodeId}
        />
      </main>
    </div>
  );
}

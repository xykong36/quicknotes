"use client";

import TranscriptView from "@/components/TranscriptView";

interface TranscriptViewWrapperProps {
  transcript: {
    en: string;
    cn: string;
  };
  highlights: {
    en: string[];
    cn: string[];
  };
  episodeId: string;
}

export default function TranscriptViewWrapper(
  props: TranscriptViewWrapperProps
) {
  return <TranscriptView {...props} />;
}

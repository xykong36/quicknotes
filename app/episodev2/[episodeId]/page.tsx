"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import TranscriptView from "@/components/TranscriptView";
import allTranscripts from "@/data/local/all-full-transcript.json";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

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

const typedAllTranscripts: AllTranscripts = allTranscripts as AllTranscripts;

export default function Page({ params }: PageProps) {
  const { episodeId } = params;
  const episodeKey = `episode_${episodeId}`;
  const episodeData = typedAllTranscripts[episodeKey];

  if (!episodeData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-4 py-4 md:py-8 mx-auto max-w-4xl">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Episode {episodeId}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <TranscriptView
          transcript={episodeData.full_transcript}
          highlights={episodeData.highlights}
          episodeId={episodeId}
        />
      </main>
    </div>
  );
}

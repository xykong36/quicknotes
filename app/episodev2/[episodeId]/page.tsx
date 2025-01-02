import React, { lazy } from "react";
import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import allTranscripts from "@/data/local/all-full-transcript.json";

// Lazy load the TranscriptViewWrapper component
const TranscriptViewWrapper = lazy(() => import("./TranscriptViewWrapper"));

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

// Static params generation remains the same
export async function generateStaticParams() {
  const episodeIds = Object.keys(typedAllTranscripts).map((key) => ({
    episodeId: key.replace("episode_", ""),
  }));
  return episodeIds;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { episodeId } = params;
  return {
    title: `Episode ${episodeId} | Your App Name`,
    description: `Full transcript and analysis for Episode ${episodeId}`,
  };
}

export const dynamic = "force-static";
export const revalidate = false;

export default function Page({ params }: PageProps) {
  const { episodeId } = params;
  const episodeKey = `episode_${episodeId}`;
  const episodeData = typedAllTranscripts[episodeKey];

  if (!episodeData) {
    return null;
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

        <TranscriptViewWrapper
          transcript={episodeData.full_transcript}
          highlights={episodeData.highlights}
          episodeId={episodeId}
        />
      </main>
    </div>
  );
}

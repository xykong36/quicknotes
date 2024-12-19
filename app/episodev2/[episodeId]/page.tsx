"use client";

import React from "react";

export default function LanguageLearningPage({
  params: { episodeId },
}: {
  params: { episodeId: string };
}) {
  return (
    <div className="min-h-screen bg-white text-slate-900 p-8">
      <h1 className="text-4xl font-bold mb-2">Episode {episodeId}</h1>
    </div>
  );
}

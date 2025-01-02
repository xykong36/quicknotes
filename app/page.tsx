"use client";

import React from "react";
import episodes from "@/data/episodes.json";
import { useSearch } from "@/hooks/useSearch";
import { SearchBar } from "@/components/SearchBar";
import { TopicTagSection } from "@/components/TopicTagSection";
import { EpisodeHeader } from "@/components/EpisodeHeader";
import { EpisodeGrid } from "@/components/EpisodeGrid";

const HomePage = () => {
  const {
    query,
    selectedTags,
    filteredEpisodes,
    setSearchQuery,
    toggleTag,
    clearTags,
  } = useSearch(episodes.episodes);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-1 items-center">
        <SearchBar value={query} onChange={setSearchQuery} />
      </div>
      <TopicTagSection
        selectedTags={selectedTags}
        onClearTags={clearTags}
        onToggleTag={(tag) => toggleTag(tag, "topics")}
      />

      <div className="flex h-full">
        <div className="flex-1 flex flex-col min-h-screen w-full md:w-[calc(100%-16rem)]">
          <main className="flex-1 p-4 md:p-6">
            <EpisodeHeader
              count={filteredEpisodes.length}
              selectedTopics={selectedTags.topics}
            />
            <EpisodeGrid episodes={filteredEpisodes} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

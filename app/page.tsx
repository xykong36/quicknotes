"use client";

import React, { useState, useMemo } from "react";

import { TopicTag } from "@/constants/tags/enums";
import { EpisodeGrid } from "@/components/EpisodeGrid";
import episodes from "@/data/episodes.json";
import { EpisodeHeader } from "@/components/EpisodeHeader";
import { TopicTagSection } from "@/components/TopicTagSection";
import { SearchHeader } from "@/components/SearchHeader";
import { Sidebar } from "@/components/Sidebar";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState({
    topics: [] as TopicTag[],
  });

  const filteredEpisodes = useMemo(() => {
    let filtered = episodes.episodes;

    // Filter by topics if any topics are selected
    if (selectedTags.topics.length > 0) {
      filtered = filtered.filter((episode) => {
        const episodeTopics = episode.topic_tag.split(",").map((t) => t.trim());
        return selectedTags.topics.some((selectedTopic) =>
          episodeTopics.includes(selectedTopic)
        );
      });
    }

    // Filter by search query if present
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (episode) =>
          episode.youtube_creator.toLowerCase().includes(query) ||
          episode.topic_tag.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedTags.topics, searchQuery]);

  const toggleTag = (tag: TopicTag, category: "topics") => {
    setSelectedTags((prev) => ({
      ...prev,
      [category]: prev[category].includes(tag)
        ? prev[category].filter((t) => t !== tag)
        : [...prev[category], tag],
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex h-full">
        <Sidebar isOpen={isSidebarOpen}>
          <TopicTagSection
            selectedTags={selectedTags}
            onClearTags={() => setSelectedTags({ ...selectedTags, topics: [] })}
            onToggleTag={(tag) => toggleTag(tag, "topics")}
          />
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen w-full md:w-[calc(100%-16rem)]">
          <SearchHeader
            isSidebarOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <main className="flex-1 p-4 md:p-6">
            <EpisodeHeader
              count={filteredEpisodes.length}
              selectedTopics={selectedTags.topics}
            />
            <EpisodeGrid episodes={filteredEpisodes} />
          </main>
        </div>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;

"use client";

import React, { useState, useMemo } from "react";
import { Search, Menu, X } from "lucide-react";

import { TOPIC_TAG_COLORS } from "@/constants/tags/colors";
import { TopicTag } from "@/constants/tags/enums";
import { EpisodeGrid } from "@/components/EpisodeGrid";
import episodes from "@/data/episodes.json";

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
        // Split the comma-separated topic_tag string into an array
        const episodeTopics = episode.topic_tag.split(",").map((t) => t.trim());
        // Check if any selected topic matches with episode topics
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

  const TagButton = ({
    tag,
    color,
    isSelected,
    onClick,
  }: {
    tag: string;
    color: string;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`
        px-3 py-1.5 rounded text-sm ${color}
        transition-all duration-200
        ${
          isSelected
            ? "ring-2 ring-offset-2 ring-purple-500 shadow-md scale-105"
            : "opacity-80 hover:opacity-100 hover:shadow-sm"
        }
      `}
    >
      {tag}
    </button>
  );

  const TopicTagSection = () => (
    <div className="px-4">
      <div className="inline-flex items-center space-x-2 mb-3">
        <div className="bg-black text-white text-sm font-bold py-1 px-2">
          TOPIC
        </div>
        {selectedTags.topics.length > 0 && (
          <button
            onClick={() => setSelectedTags((prev) => ({ ...prev, topics: [] }))}
            className="text-xs text-gray-500 hover:text-red-500"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.values(TopicTag).map((tag) => (
          <TagButton
            key={tag}
            tag={tag}
            color={TOPIC_TAG_COLORS[tag]}
            isSelected={selectedTags.topics.includes(tag)}
            onClick={() => toggleTag(tag, "topics")}
          />
        ))}
      </div>
    </div>
  );

  // 主要修改部分
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - Fixed for mobile */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg md:hidden"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold">英语素材库</h1>
          </div>
        </div>

        {/* Search bar */}
        <div className="p-4 border-t border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search creator or topic..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-30
          transform transition-transform duration-300 ease-in-out
          w-64 bg-white border-r border-gray-200
          md:translate-x-0 md:static
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="overflow-y-auto h-full">
            <div className="space-y-8 pt-4">
              <TopicTagSection />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="p-4 md:p-6">
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredEpisodes.length} videos
              {selectedTags.topics.length > 0 &&
                ` for topics: ${selectedTags.topics.join(", ")}`}
            </div>

            <h2 className="text-xl md:text-2xl font-bold mb-6 text-black">
              Episodes
            </h2>
            <EpisodeGrid episodes={filteredEpisodes} />
          </div>
        </main>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePage;

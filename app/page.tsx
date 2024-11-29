"use client";

import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { VideoGrid } from "@/components/VideoGrid";
import { CATEGORIES } from "@/constants/categories";
import Link from "next/link";
import { YoutubeVideo } from "@/app/types/YoutubeVideo";

const HomePage = () => {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos");
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await response.json();
        setVideos(data.videos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const allowedVideoIds = [
    "PnBMdJ5KeHk",
    "WrxJKj71c9o",
    "jFl9kFms7nA",
    "Z6bxX3mcfJg",
    "sgHHRVH0NFo",
  ];

  const filteredExamples = videos.filter((video) => {
    const matchesSearch = video.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesTopic =
      selectedTopics.length === 0 || selectedTopics.includes(video.topic_tag);

    const matchesLevel =
      selectedLevels.length === 0 || selectedLevels.includes(video.level_tag);

    return (
      allowedVideoIds.includes(video.video_id) &&
      matchesSearch &&
      matchesTopic &&
      matchesLevel
    );
  });

  const toggleTag = (tag: string, category: "topic" | "level") => {
    if (category === "topic") {
      setSelectedTopics((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    } else {
      setSelectedLevels((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      );
    }
  };

  const getTagStyles = (
    tag: string,
    category: "topic" | "level",
    baseColor: string
  ) => {
    const isSelected =
      category === "topic"
        ? selectedTopics.includes(tag)
        : selectedLevels.includes(tag);

    return `
      px-3
      py-1
      rounded
      text-sm
      ${baseColor}
      transition-all
      duration-200
      ${
        isSelected
          ? "ring-2 ring-offset-2 ring-purple-500 shadow-md scale-105"
          : "opacity-80 hover:opacity-100 hover:shadow-sm"
      }
    `;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="w-full h-full flex items-center justify-center text-red-500">
          {error}
        </div>
      ) : (
        <div className="flex w-full">
          {/* Fixed Left Sidebar */}
          <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2 p-6 mb-4">
              <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                <Search className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold">英语素材库</h1>
            </div>

            {/* Categories */}
            <div className="space-y-8">
              <div className="bg-cyan-400 text-white text-sm font-bold py-1 px-2 mb-3 inline-block">
                <Link href="/glossary">点击跳转到 单词本</Link>
              </div>

              {/* Topics */}
              <div className="px-4">
                <div className="inline-flex items-center space-x-2 mb-3">
                  <div className="bg-black text-white text-sm font-bold py-1 px-2">
                    TOPIC
                  </div>
                  {selectedTopics.length > 0 && (
                    <button
                      onClick={() => setSelectedTopics([])}
                      className="text-xs text-gray-500 hover:text-red-500"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.find(
                    (c) => c.id === "acquisition"
                  )?.subcategories.map((subcategory) => (
                    <button
                      key={subcategory.id}
                      onClick={() => toggleTag(subcategory.label, "topic")}
                      className={getTagStyles(
                        subcategory.label,
                        "topic",
                        subcategory.color
                      )}
                    >
                      {subcategory.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Levels */}
              <div className="px-4">
                <div className="inline-flex items-center space-x-2 mb-3">
                  <div className="bg-black text-white text-sm font-bold py-1 px-2">
                    LEVEL
                  </div>
                  {selectedLevels.length > 0 && (
                    <button
                      onClick={() => setSelectedLevels([])}
                      className="text-xs text-gray-500 hover:text-red-500"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.find((c) => c.id === "level")?.subcategories.map(
                    (subcategory) => (
                      <button
                        key={subcategory.id}
                        onClick={() => toggleTag(subcategory.label, "level")}
                        className={getTagStyles(
                          subcategory.label,
                          "level",
                          subcategory.color
                        )}
                      >
                        {subcategory.label}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Right Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search examples..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter Stats */}
              <div className="mb-4 text-sm text-gray-600">
                Showing {filteredExamples.length} videos
                {selectedTopics.length > 0 &&
                  ` for topics: ${selectedTopics.join(", ")}`}
                {selectedLevels.length > 0 &&
                  ` at levels: ${selectedLevels.join(", ")}`}
              </div>

              <VideoGrid videos={filteredExamples} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

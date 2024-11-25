"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { VideoGrid } from "@/components/VideoGrid";
import youtubeVideos from "@/data/youtube_videos.json";
import { CATEGORIES } from "@/constants/categories";
import Link from "next/link";

const YOUTUBE_VIDEOS = youtubeVideos;

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredExamples = YOUTUBE_VIDEOS.filter((video) => {
    const matchesSearch = video.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      // TODO: 添加视频标签
      video.tags.some((tag) => selectedTags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="flex h-screen overflow-hidden">
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
        <div className="space-y-6">
          <div className="bg-cyan-400 text-white text-sm font-bold py-1 px-2 mb-3 inline-block">
            <Link href="/glossary">Glossary</Link>
          </div>
          {CATEGORIES.map((category) => (
            <div key={category.id} className="px-4">
              <div className="bg-black text-white text-sm font-bold py-1 px-2 mb-3 inline-block">
                {category.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {category.subcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    className={`px-3 py-1 rounded text-sm ${
                      subcategory.color
                    } transition-opacity ${
                      selectedTags.includes(subcategory.label)
                        ? "opacity-100"
                        : "opacity-80 hover:opacity-100"
                    }`}
                    onClick={() => toggleTag(subcategory.label)}
                  >
                    {subcategory.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
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

          <VideoGrid videos={filteredExamples} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

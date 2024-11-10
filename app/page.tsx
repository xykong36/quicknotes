"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { ExampleGrid } from "@/components/ExampleGrid";
import ParagraphPage from "../components/ParagraphPage";
import youtubeVideos from "@/data/youtube_videos.json";

const CATEGORIES = [
  {
    id: "acquisition",
    label: "TOPIC",
    subcategories: [
      { id: "technology", label: "Technology", color: "bg-blue-100" },
      { id: "climate-change", label: "Climate Change", color: "bg-green-100" },
      { id: "education", label: "Education", color: "bg-yellow-100" },
      { id: "health", label: "Health", color: "bg-red-100" },
      { id: "economics", label: "Economics", color: "bg-purple-100" },
      { id: "politics", label: "Politics", color: "bg-orange-100" },
    ],
  },
  {
    id: "level",
    label: "LEVEL",
    subcategories: [
      { id: "cet4", label: "CET-4", color: "bg-blue-100" },
      { id: "cet6", label: "CET-6", color: "bg-pink-100" },
      { id: "ielts6", label: "IELTS 6", color: "bg-green-100" },
      { id: "ielts7", label: "IELTS 7", color: "bg-yellow-100" },
      { id: "ielts8", label: "IELTS 8", color: "bg-purple-100" },
      { id: "toefl", label: "TOEFL", color: "bg-red-100" },
    ],
  },
  {
    id: "subject",
    label: "SUBJECT",
    subcategories: [
      { id: "math", label: "Math", color: "bg-blue-100" },
      { id: "geography", label: "Geography", color: "bg-green-100" },
      { id: "biology", label: "Biology", color: "bg-red-100" },
      { id: "chemistry", label: "Chemistry", color: "bg-yellow-100" },
      { id: "physics", label: "Physics", color: "bg-purple-100" },
      { id: "history", label: "History", color: "bg-orange-100" },
    ],
  },
];

const YOUTUBE_VIDEOS = youtubeVideos;
const EXAMPLES = [
  {
    id: 1,
    title: "Same interview. 700x reach.",
    duration: "30 secs",
    tags: ["Social"],
    image: "/static/images/ocean.jpeg",
  },
  {
    id: 2,
    title: "Posting seltzer. Making money.",
    duration: "2 mins",
    tags: ["Creative"],
    image: "/static/images/ocean.jpeg",
  },
];

const MarketingExamples = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const filteredExamples = YOUTUBE_VIDEOS.filter((example) => {
    const matchesSearch = example.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      example.tags.some((tag) => selectedTags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag) => {
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

          {/* Examples Grid */}
          <ExampleGrid examples={filteredExamples} />
        </div>
      </div>
    </div>
  );
};

export default MarketingExamples;

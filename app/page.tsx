"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { ExampleGrid } from "@/components/ExampleGrid";

// Mock data structure
const CATEGORIES = [
  {
    id: "acquisition",
    label: "ACQUISITION",
    subcategories: [
      { id: "content", label: "Content" },
      { id: "seo", label: "SEO" },
      { id: "sales", label: "Sales" },
      { id: "social", label: "Social" },
      { id: "ads", label: "Ads" },
    ],
  },
  {
    id: "conversion",
    label: "CONVERSION",
    subcategories: [
      { id: "copywriting", label: "Copywriting" },
      { id: "landing-page", label: "Landing Page" },
    ],
  },
  {
    id: "more",
    label: "MORE",
    subcategories: [
      { id: "retention", label: "Retention" },
      { id: "brand", label: "Brand" },
      { id: "referral", label: "Referral" },
      { id: "creative", label: "Creative" },
    ],
  },
];

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
  // Add more examples as needed
];

const MarketingExamples = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const filteredExamples = EXAMPLES.filter((example) => {
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
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
            <Search className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold">MARKETING EXAMPLES</h1>
        </div>
      </div>

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

      {/* Categories */}
      <div className="mb-8 space-y-4">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="space-y-2">
            <h2 className="text-sm font-bold text-gray-600">
              {category.label}
            </h2>
            <div className="flex flex-wrap gap-2">
              {category.subcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  className={`px-4 py-1 rounded-full text-sm ${
                    selectedTags.includes(subcategory.label)
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
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

      {/* Examples Grid */}
      <ExampleGrid examples={filteredExamples} />
    </div>
  );
};

export default MarketingExamples;

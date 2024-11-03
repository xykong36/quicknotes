"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { ExampleGrid } from "@/components/ExampleGrid";
import ParagraphPage from "../components/ParagraphPage";

const CATEGORIES = [
  {
    id: "acquisition",
    label: "ACQUISITION",
    subcategories: [
      { id: "content", label: "Content", color: "bg-pink-100" },
      { id: "seo", label: "SEO", color: "bg-green-100" },
      { id: "sales", label: "Sales", color: "bg-purple-100" },
      { id: "social", label: "Social", color: "bg-purple-200" },
      { id: "ads", label: "Ads", color: "bg-yellow-100" },
    ],
  },
  {
    id: "conversion",
    label: "CONVERSION",
    subcategories: [
      { id: "copywriting", label: "Copywriting", color: "bg-blue-100" },
      { id: "landing-page", label: "Landing Page", color: "bg-pink-100" },
    ],
  },
  {
    id: "more",
    label: "MORE",
    subcategories: [
      { id: "retention", label: "Retention", color: "bg-green-100" },
      { id: "brand", label: "Brand", color: "bg-purple-100" },
      { id: "referral", label: "Referral", color: "bg-purple-200" },
      { id: "creative", label: "Creative", color: "bg-yellow-100" },
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
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Left Sidebar */}
      <div className="w-64 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2 p-6 mb-4">
          <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
            <Search className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold">MARKETING</h1>
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

        {/* Newsletter Section */}
        <div className="mt-6 px-4">
          <div className="bg-black text-white text-sm font-bold py-1 px-2 mb-3 inline-block">
            NEWSLETTER
          </div>
          {/* Add newsletter content here */}
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

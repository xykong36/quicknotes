"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, HeartOff } from "lucide-react";

interface Highlight {
  term: string;
  definition: string;
}

interface SavedTerm {
  term: string;
  definition: string;
  savedAt: string;
}

const HighlightText = ({
  text,
  highlights,
}: {
  text: string;
  highlights: Highlight[];
}) => {
  const [activePopover, setActivePopover] = useState<string | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const [savedTerms, setSavedTerms] = useState<SavedTerm[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("savedTerms");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const highlightRefs = useRef<Map<string, HTMLSpanElement>>(new Map());

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("savedTerms", JSON.stringify(savedTerms));
    }
  }, [savedTerms]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        activePopover &&
        !highlightRefs.current
          .get(activePopover)
          ?.contains(event.target as Node)
      ) {
        setActivePopover(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activePopover]);

  const handleMouseEnter = (
    term: string,
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    setPopoverPosition({
      top: rect.bottom + scrollTop,
      left: rect.left + rect.width / 2,
    });
    setActivePopover(term);
  };

  const handleSaveTerm = (term: string, definition: string) => {
    setSavedTerms((prev) => {
      const isAlreadySaved = prev.some((item) => item.term === term);
      if (isAlreadySaved) {
        return prev.filter((item) => item.term !== term);
      } else {
        const newSavedTerm: SavedTerm = {
          term,
          definition,
          savedAt: new Date().toISOString(),
        };
        return [...prev, newSavedTerm];
      }
    });
  };

  const isTermSaved = (term: string) => {
    return savedTerms.some((item) => item.term === term);
  };

  const renderText = () => {
    let lastIndex = 0;
    const parts = [];
    const sortedHighlights = [...highlights].sort(
      (a, b) => text.indexOf(a.term) - text.indexOf(b.term)
    );

    sortedHighlights.forEach((highlight, index) => {
      const termIndex = text.indexOf(highlight.term, lastIndex);
      if (termIndex === -1) return;

      if (termIndex > lastIndex) {
        parts.push(text.slice(lastIndex, termIndex));
      }

      parts.push(
        <span
          key={`highlight-${index}`}
          ref={(el) => el && highlightRefs.current.set(highlight.term, el)}
          className="bg-yellow-200 hover:bg-yellow-300 cursor-pointer px-1 rounded transition-colors"
          onMouseEnter={(e) => handleMouseEnter(highlight.term, e)}
        >
          {highlight.term}
        </span>
      );

      lastIndex = termIndex + highlight.term.length;
    });

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  return (
    <div className="relative">
      <p className="leading-relaxed">{renderText()}</p>

      {activePopover && (
        <div
          className="absolute z-50 bg-white shadow-lg rounded-lg p-4 max-w-xs transform -translate-x-1/2"
          style={{
            top: `${popoverPosition.top}px`,
            left: `${popoverPosition.left}px`,
          }}
        >
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-4 bg-white transform rotate-45" />
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              {highlights.find((h) => h.term === activePopover)?.definition}
            </p>

            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  const highlight = highlights.find(
                    (h) => h.term === activePopover
                  );
                  if (highlight) {
                    handleSaveTerm(highlight.term, highlight.definition);
                  }
                }}
                className="flex items-center space-x-1 text-sm px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {isTermSaved(activePopover) ? (
                  <>
                    <HeartOff className="w-4 h-4 text-gray-600" />
                    <span>取消收藏</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>收藏</span>
                  </>
                )}
              </button>
              {isTermSaved(activePopover) && (
                <span className="text-xs text-gray-500">已收藏</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// SavedTermsList 组件用于显示已保存的术语
const SavedTermsList = ({ savedTerms }: { savedTerms: SavedTerm[] }) => {
  if (savedTerms.length === 0) {
    return <p className="text-gray-500 text-center py-4">暂无收藏的术语</p>;
  }

  return (
    <div className="space-y-4">
      {savedTerms.map((term) => (
        <div key={term.term} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium mb-2">{term.term}</h3>
          <p className="text-sm text-gray-600">{term.definition}</p>
          <p className="text-xs text-gray-400 mt-2">
            收藏于 {new Date(term.savedAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

// 示例用法
export default function Demo() {
  const [showSaved, setShowSaved] = useState(false);
  const [savedTerms, setSavedTerms] = useState<SavedTerm[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("savedTerms");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("savedTerms");
      if (saved) {
        setSavedTerms(JSON.parse(saved));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const sampleText =
    "Ideation is an important part of the service design process because it helps generate a large number of ideas for potential solutions for a given problem. It is necessary to plan in advance to ensure that the process is structured and effective in generating useful ideas.";

  const highlights = [
    {
      term: "service design",
      definition:
        "Service design is a multidisciplinary field that focuses on creating and improving services by considering user needs, experiences, and interactions throughout the design process.",
    },
    {
      term: "Ideation",
      definition:
        "The process of generating, developing, and communicating new ideas or concepts for solving problems or improving existing solutions.",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">服务设计术语</h1>
        <button
          onClick={() => setShowSaved(!showSaved)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <Heart className="w-5 h-5" />
          <span>我的收藏 ({savedTerms.length})</span>
        </button>
      </div>

      {showSaved ? (
        <SavedTermsList savedTerms={savedTerms} />
      ) : (
        <HighlightText text={sampleText} highlights={highlights} />
      )}
    </div>
  );
}

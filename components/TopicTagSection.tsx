import { TopicTag } from "@/constants/tags/enums";
import { TagButton } from "./TagButton";
import { TOPIC_TAG_COLORS } from "@/constants/tags/colors";
import { memo } from "react";

interface TopicTagSectionProps {
  selectedTags: {
    topics: TopicTag[];
  };
  onClearTags: () => void;
  onToggleTag: (tag: TopicTag) => void;
}

const ClearButton = memo(({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="text-xs text-gray-500 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 rounded px-2"
  >
    Clear
  </button>
));

ClearButton.displayName = "ClearButton";

const TopicLabel = memo(() => (
  <h2 className="text-lg sm:text-xl font-semibold">Topic Tags</h2>
));

TopicLabel.displayName = "TopicLabel";

export const TopicTagSection = memo(
  ({ selectedTags, onClearTags, onToggleTag }: TopicTagSectionProps) => (
    <section
      className="w-full bg-white rounded-lg shadow-sm"
      aria-labelledby="topic-tags-heading"
    >
      {/* Container with responsive padding */}
      <div className="px-3 py-4 sm:p-6">
        {/* Header section with improved spacing */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <TopicLabel />
          {selectedTags.topics.length > 0 && (
            <ClearButton onClick={onClearTags} />
          )}
        </div>

        {/* Tags container with responsive spacing */}
        <div className="flex flex-wrap gap-2 sm:gap-3" role="list">
          {Object.values(TopicTag).map((tag) => (
            <div key={tag} className="min-w-fit">
              <TagButton
                tag={tag}
                color={TOPIC_TAG_COLORS[tag]}
                isSelected={selectedTags.topics.includes(tag)}
                onClick={() => onToggleTag(tag)}
                aria-label={`Toggle ${tag} tag`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
);

TopicTagSection.displayName = "TopicTagSection";

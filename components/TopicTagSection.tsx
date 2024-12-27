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
    className="text-xs text-gray-500 hover:text-red-500"
  >
    Clear
  </button>
));

ClearButton.displayName = "ClearButton";

const TopicLabel = memo(() => (
  <div className="bg-black text-white text-sm font-bold py-1 px-2">TOPIC</div>
));

TopicLabel.displayName = "TopicLabel";

export const TopicTagSection = memo(
  ({ selectedTags, onClearTags, onToggleTag }: TopicTagSectionProps) => (
    <div className="px-4">
      <div className="inline-flex items-center space-x-2 mb-3">
        <TopicLabel />
        {selectedTags.topics.length > 0 && (
          <ClearButton onClick={onClearTags} />
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {Object.values(TopicTag).map((tag) => (
          <TagButton
            key={tag}
            tag={tag}
            color={TOPIC_TAG_COLORS[tag]}
            isSelected={selectedTags.topics.includes(tag)}
            onClick={() => onToggleTag(tag)}
          />
        ))}
      </div>
    </div>
  )
);

TopicTagSection.displayName = "TopicTagSection";

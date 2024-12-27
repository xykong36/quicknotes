import { memo } from "react";

interface EpisodeHeaderProps {
  count: number;
  selectedTopics: string[];
}

const TopicsList = memo(
  ({ topics }: { topics: string[] }) =>
    topics.length > 0 && ` for topics: ${topics.join(", ")}`
);

TopicsList.displayName = "TopicsList";

export const EpisodeHeader = memo(
  ({ count, selectedTopics }: EpisodeHeaderProps) => (
    <>
      <div className="mb-4 text-sm text-gray-600">
        Showing {count} videos
        <TopicsList topics={selectedTopics} />
      </div>
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-black">
        Episodes
      </h2>
    </>
  )
);

EpisodeHeader.displayName = "EpisodeHeader";

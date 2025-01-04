import { Episode } from "@/app/types/Episode";
import Link from "next/link";
import Image from "next/image";
import { TOPIC_TAG_COLORS } from "@/constants/tags/colors";
import { TopicTag } from "@/constants/tags/enums";

// Types and Interfaces
interface EpisodeCardProps {
  episode: Episode;
}

interface EpisodeIdBadgeProps {
  episodeId: string | number;
}

// Topic Tag Utils
const isTopicTag = (value: string): value is TopicTag => {
  return value in TopicTag;
};

const stringToTopicTag = (topic: string): TopicTag | undefined => {
  return isTopicTag(topic)
    ? TopicTag[topic as keyof typeof TopicTag]
    : undefined;
};

const getTopicTagStyle = (topic: string): string => {
  return (
    TOPIC_TAG_COLORS[stringToTopicTag(topic) as TopicTag] ?? "bg-gray-500/50"
  );
};

// Components
const EpisodeIdBadge = ({ episodeId }: EpisodeIdBadgeProps) => (
  <span className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
    EP {episodeId}
  </span>
);

const TopicTagBadge = ({ topic }: { topic: string }) => {
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full ${getTopicTagStyle(topic)}`}
    >
      {topic}
    </span>
  );
};

export const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  return (
    <Link
      href={`/episodev2/${episode.episode_id}`}
      className="relative group rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative overflow-hidden rounded-lg">
        <EpisodeIdBadge episodeId={episode.episode_id} />

        <Image
          src={`/images/episodes/ep${episode.episode_id}.png`}
          alt={`Episode ${episode.episode_id}`}
          width={800}
          height={600}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <TopicTagBadge topic={episode.topic_tag} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

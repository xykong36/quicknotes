import { Episode } from "@/app/types/Episode";
import Link from "next/link";
import Image from "next/image";
import { TOPIC_TAG_COLORS } from "@/constants/tags/colors";
import { TopicTag } from "@/constants/tags/enums";
interface EpisodeCardProps {
  episode: Episode;
}

const isTopicTag = (value: string): value is TopicTag => {
  return value in TopicTag;
};

const stringToTopicTag = (topic: string): TopicTag | undefined => {
  return isTopicTag(topic)
    ? TopicTag[topic as keyof typeof TopicTag]
    : undefined;
};

export const getTopicTagStyle = (topic: string): string => {
  return (
    TOPIC_TAG_COLORS[stringToTopicTag(topic) as TopicTag] ?? "bg-gray-500/50"
  );
};

export const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  return (
    <Link
      href={`/episodev2/${episode.episode_id}`}
      className="relative group rounded-lg overflow-hidden cursor-pointer"
    >
      <Image
        src={`/images/episodes/ep${episode.episode_id}.png`}
        alt={`Episode ${episode.episode_id}`}
        width={800}
        height={600}
        className="w-full h-48 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${getTopicTagStyle(
                episode.topic_tag
              )}`}
            >
              {episode.topic_tag}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

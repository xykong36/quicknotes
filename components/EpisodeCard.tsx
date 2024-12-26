import { Episode } from "@/app/types/Episode";
import Link from "next/link";

interface EpisodeCardProps {
  episode: Episode;
}

const getTopicTagStyle = (topic: string) => {
  const topic_tag_colors: { [key: string]: string } = {
    天气季节: "bg-blue-500/50",
    运动健身: "bg-green-500/50",
    美食烹饪: "bg-yellow-500/50",
    "日常感想/趣事": "bg-red-500/50",
    化妆服装: "bg-purple-500/50",
    学习工作: "bg-orange-500/50",
    复习课: "bg-pink-500/50",
  };
  return topic_tag_colors[topic] || "bg-gray-500/50";
};

export const EpisodeCard = ({ episode }: EpisodeCardProps) => {
  return (
    <Link
      href={`/episodev2/${episode.episode_id}`}
      className="relative group rounded-lg overflow-hidden cursor-pointer"
    >
      <img
        src={`/images/episodes/ep${episode.episode_id}.png`}
        alt={`Episode ${episode.episode_id}`}
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

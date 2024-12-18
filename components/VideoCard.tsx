import { Search } from "lucide-react";
import { YoutubeVideo } from "@/app/types/YoutubeVideo";
import Link from "next/link";

interface VideoCardProps {
  video: YoutubeVideo;
}

const getTopicTagStyle = (topic: string) => {
  const colors: { [key: string]: string } = {
    Technology: "bg-blue-500/50",
    "Climate Change": "bg-green-500/50",
    Education: "bg-yellow-500/50",
    Health: "bg-red-500/50",
    Economics: "bg-purple-500/50",
    Politics: "bg-orange-500/50",
  };
  return colors[topic] || "bg-gray-500/50";
};

const getLevelTagStyle = (level: string) => {
  const colors: { [key: string]: string } = {
    "CET-4": "bg-blue-300/50",
    "CET-6": "bg-pink-300/50",
    "IELTS 6": "bg-green-300/50",
    "IELTS 7": "bg-yellow-300/50",
    "IELTS 8": "bg-purple-300/50",
    TOEFL: "bg-red-300/50",
  };
  return colors[level] || "bg-gray-300/50";
};

export const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <Link
      href={`/episode/${video.video_id}`}
      className="relative group rounded-lg overflow-hidden cursor-pointer"
    >
      <img
        src={video.thumbnail_url}
        alt={video.title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center">
              <Search className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm">{video.duration}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${getTopicTagStyle(
                video.topic_tag
              )}`}
            >
              {video.topic_tag}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${getLevelTagStyle(
                video.level_tag
              )}`}
            >
              {video.level_tag}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

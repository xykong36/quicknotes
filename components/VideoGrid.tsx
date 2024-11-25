import { VideoCard } from "./VideoCard";
import { YoutubeVideo } from "@/app/types/YoutubeVideo";

interface VideoGridProps {
  videos: YoutubeVideo[];
}

const allowedVideoIds = [
  "PnBMdJ5KeHk",
  "WrxJKj71c9o",
  "jFl9kFms7nA",
  "Z6bxX3mcfJg",
  "sgHHRVH0NFo",
];

export const VideoGrid = ({ videos }: VideoGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <VideoCard key={video.video_id} video={video} />
      ))}
    </div>
  );
};

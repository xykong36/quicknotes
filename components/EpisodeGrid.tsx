import { EpisodeCard } from "./EpisodeCard";
import { Episode } from "@/app/types/Episode";

interface EpisodeGridProps {
  episodes: Episode[];
}

export const EpisodeGrid = ({ episodes }: EpisodeGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.episode_id} episode={episode} />
      ))}
    </div>
  );
};

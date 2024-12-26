import { EpisodeCard } from "./EpisodeCard";
import { Episode } from "@/app/types/Episode";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface EpisodeGridProps {
  episodes: Episode[];
}

export const EpisodeGrid = ({ episodes }: EpisodeGridProps) => {
  const { loadMoreRef, visibleItems, hasMore } = useInfiniteScroll({
    totalItems: episodes.length,
    itemsPerLoad: 8,
  });

  const visibleEpisodes = episodes.slice(0, visibleItems);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {visibleEpisodes.map((episode) => (
        <EpisodeCard key={episode.episode_id} episode={episode} />
      ))}
      {hasMore && <div ref={loadMoreRef} className="h-4" />}
    </div>
  );
};

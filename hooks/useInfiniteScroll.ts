import { useEffect, useRef, useState } from "react";

interface UseInfiniteScrollOptions {
  totalItems: number;
  itemsPerLoad?: number;
  threshold?: number;
}

export function useInfiniteScroll<T>({
  totalItems,
  itemsPerLoad = 8,
  threshold = 0.1,
}: UseInfiniteScrollOptions) {
  const [visibleItems, setVisibleItems] = useState<number>(itemsPerLoad);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleItems < totalItems) {
          setVisibleItems((prev) => Math.min(prev + itemsPerLoad, totalItems));
        }
      },
      { threshold }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [visibleItems, totalItems, itemsPerLoad, threshold]);

  return {
    loadMoreRef,
    visibleItems,
    hasMore: visibleItems < totalItems,
  };
}

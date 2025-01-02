import { useState, useMemo } from "react";
import { TopicTag } from "@/constants/tags/enums";
import { Episode } from "@/app/types/Episode"; // Add this type to your project

interface SearchState {
  query: string;
  selectedTags: {
    topics: TopicTag[];
  };
}

export const useSearch = (episodes: Episode[]) => {
  const [state, setState] = useState<SearchState>({
    query: "",
    selectedTags: {
      topics: [],
    },
  });

  const setSearchQuery = (query: string) => {
    setState((prev) => ({ ...prev, query }));
  };

  const toggleTag = (tag: TopicTag, category: "topics") => {
    setState((prev) => ({
      ...prev,
      selectedTags: {
        ...prev.selectedTags,
        [category]: prev.selectedTags[category].includes(tag)
          ? prev.selectedTags[category].filter((t) => t !== tag)
          : [...prev.selectedTags[category], tag],
      },
    }));
  };

  const clearTags = () => {
    setState((prev) => ({
      ...prev,
      selectedTags: { ...prev.selectedTags, topics: [] },
    }));
  };

  const filteredEpisodes = useMemo(() => {
    let filtered = episodes;

    if (state.selectedTags.topics.length > 0) {
      filtered = filtered.filter((episode) => {
        const episodeTopics = episode.topic_tag.split(",").map((t) => t.trim());
        return state.selectedTags.topics.some((selectedTopic) =>
          episodeTopics.includes(selectedTopic)
        );
      });
    }

    if (state.query.trim()) {
      const query = state.query.toLowerCase().trim();
      filtered = filtered.filter(
        (episode) =>
          episode.youtube_creator.toLowerCase().includes(query) ||
          episode.topic_tag.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [episodes, state.selectedTags.topics, state.query]);

  return {
    query: state.query,
    selectedTags: state.selectedTags,
    filteredEpisodes,
    setSearchQuery,
    toggleTag,
    clearTags,
  };
};

import { useMemo } from "react";

export const useHighlightedText = (text: string, highlights: string[]) => {
  return useMemo(() => {
    const regex = new RegExp(
      `(${highlights
        .map((str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|")})`,
      "g"
    );
    return text.split(regex);
  }, [text, highlights]);
};

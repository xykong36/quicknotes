import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Subtitle } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const highlightText = (
  text: string,
  highlights: string[],
  colors: ReadonlyArray<string>
) => {
  let result = text;
  highlights.forEach((highlight, i) => {
    const colorClass = colors[i % colors.length];
    const regex = new RegExp(highlight, "gi");
    result = result.replace(
      regex,
      `<span class="${colorClass}">${highlight}</span>`
    );
  });
  return result;
};

export const combineSubtitles = (subtitles: Subtitle[]) => {
  return {
    text: {
      en: subtitles.map((s) => s.en).join(" "),
      cn: subtitles.map((s) => s.cn).join(""),
    },
    highlights: {
      en: subtitles.flatMap((s) => s.highlights.en),
      cn: subtitles.flatMap((s) => s.highlights.cn),
    },
  };
};

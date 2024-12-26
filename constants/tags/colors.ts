import { TopicTag, DifficultyLevel } from "./enums";

export const TOPIC_TAG_COLORS: Record<TopicTag, string> = {
  [TopicTag.天气季节]: "bg-blue-500/50",
  [TopicTag.运动健身]: "bg-green-500/50",
  [TopicTag.美食烹饪]: "bg-yellow-500/50",
  [TopicTag.日常感想]: "bg-red-500/50",
  [TopicTag.化妆服装]: "bg-purple-500/50",
  [TopicTag.学习工作]: "bg-orange-500/50",
  [TopicTag.复习课]: "bg-pink-500/50",
} as const;

export const LEVEL_COLORS: Record<DifficultyLevel, string> = {
  [DifficultyLevel.Beginner]: "bg-emerald-500/50",
  [DifficultyLevel.Intermediate]: "bg-amber-500/50",
  [DifficultyLevel.Advanced]: "bg-rose-500/50",
} as const;

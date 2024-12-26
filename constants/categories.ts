export enum TopicTag {
  运动健身 = "运动健身",
  天气季节 = "天气季节",
  美食烹饪 = "美食烹饪",
  日常感想 = "日常感想",
  化妆服装 = "化妆服装",
  学习工作 = "学习工作",
}

export enum DifficultyLevel {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "advanced",
}

export const CATEGORIES = [
  {
    id: "topic",
    label: "TOPIC",
    subcategories: [
      { id: "sports-fitness", label: TopicTag.运动健身, color: "bg-blue-100" },
      {
        id: "weather-seasons",
        label: TopicTag.天气季节,
        color: "bg-green-100",
      },
      { id: "food-cooking", label: TopicTag.美食烹饪, color: "bg-yellow-100" },
      { id: "daily-thoughts", label: TopicTag.日常感想, color: "bg-pink-100" },
      {
        id: "fashion-makeup",
        label: TopicTag.化妆服装,
        color: "bg-purple-100",
      },
      { id: "study-work", label: TopicTag.学习工作, color: "bg-orange-100" },
    ],
  },
  {
    id: "level",
    label: "LEVEL",
    subcategories: [
      {
        id: "beginner",
        label: DifficultyLevel.Beginner,
        color: "bg-emerald-100",
      },
      {
        id: "intermediate",
        label: DifficultyLevel.Intermediate,
        color: "bg-amber-100",
      },
      {
        id: "advanced",
        label: DifficultyLevel.Advanced,
        color: "bg-rose-100",
      },
    ],
  },
] as const;

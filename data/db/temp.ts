// 1. transcripts collection
let transcripts = [
  {
    transcript_id: "T001",
    video_id: "PnBMdJ5KeHk",
    created_at: "2024-11-29",
    subtitles: [
      {
        timestamp: "00:04",
        en: "Few insects have captured our imagination like the monarch butterfly. Their migration is one of the most iconic wildlife spectacles in North America, but they are also one of the best environmental indicators we have of the health of our ecosystems.",
        cn: "鲜有昆虫能像帝王蝶这般牵动人心。它们的迁徙堪称北美最为壮观的自然奇景之一，同时也是衡量我们生态系统健康状况的最佳环境指标之一。",
      },
      {
        timestamp: "00:20",
        en: "And they have been in decline for the last 40 years. So they might be telling us a bigger story. A story about our relationship with the natural world.",
        cn: "在过去40年里，它们的数量持续减少。这背后或许暗示着一个更大的故事——一个关于人类与自然世界关系的故事。",
      },
      {
        timestamp: "00:31",
        en: "Every year, these amazing insects undertake one of the most extraordinary journeys on this planet. It takes from three to five generations of monarchs to complete the whole migration.",
        cn: "每年，这些神奇的昆虫都会踏上地球上最为非凡的旅程之一。完成整个迁徙需要历经三到五代帝王蝶。",
      },
      {
        timestamp: "00:44",
        en: "And it starts in Mexico in the spring, when the monarchs that spend the winter there travel back north to lay their eggs. So the first and second generation of monarchs are born and remain in the USA, and they live up to six weeks, more or less.",
        cn: "一切始于墨西哥的春天，在那里越冬的帝王蝶会北归产卵。第一代和第二代帝王蝶出生并定居在美国，它们的寿命大约有六周左右。",
      },
      {
        timestamp: "01:01",
        en: "But most migratory monarchs belong to the third and fourth generation.",
        cn: "但大多数迁徙的帝王蝶都是第三代和第四代。",
      },
    ],
  },
];

// 2. expressions collection
let expressions = [
  {
    expression_id: "E001",
    text: "captured our imagination",
    translation: "牵动人心",
    type: "collocation",
    register: "formal",
  },
  {
    expression_id: "E002",
    text: "iconic wildlife spectacles",
    translation: "壮观的自然奇景",
    type: "collocation",
    register: "formal",
  },
  {
    expression_id: "E003",
    text: "environmental indicators",
    translation: "环境指标",
    type: "academic",
    register: "formal",
  },
  {
    expression_id: "E004",
    text: "in decline",
    translation: "持续减少",
    type: "collocation",
    register: "neutral",
    created_at: new Date(),
  },
  {
    expression_id: "E005",
    text: "relationship with the natural world",
    translation: "与自然世界关系",
    type: "academic",
    register: "formal",
    created_at: new Date(),
  },
];

// 3. highlights collection
let highlights = [
  {
    video_id: "PnBMdJ5KeHk",
    expressions: [
      ObjectId("expression1_id"), // 实际使用时需要替换为真实的ObjectId
      ObjectId("expression2_id"),
      ObjectId("expression3_id"),
      ObjectId("expression4_id"),
      ObjectId("expression5_id"),
    ],
    created_at: new Date(),
  },
];

// 4. sentences collection
let sentences = [
  {
    expression_id: ObjectId("expression1_id"), // 实际使用时需要替换为真实的ObjectId
    text: "The beautiful aurora borealis captured our imagination with its dancing lights.",
    translation: "美丽的北极光以其舞动的光芒牵动着我们的心。",
    source: "Nature Documentary",
    created_at: new Date(),
  },
  {
    expression_id: ObjectId("expression2_id"),
    text: "The wildebeest migration in Africa is one of the most iconic wildlife spectacles on Earth.",
    translation: "非洲角马大迁徙是地球上最壮观的自然奇景之一。",
    source: "Wildlife Journal",
    created_at: new Date(),
  },
];

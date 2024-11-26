// 基础的 Word 接口
export interface Word {
  // 唯一标识符
  id: string;

  // 基本信息
  word: string;
  translation: string;
  pronunciation: string;

  // 示例和难度
  examples: Example[];
  difficulty: Difficulty;

  // 分类和标签
  tags: string[];
  category?: string;

  // 表达式关联
  isPartOfExpression: boolean;
  expressionIds?: string[]; // 该词所属的表达式ID列表

  // 学习和复习相关
  lastReviewed?: Date;
  reviewCount: number;
  masteryLevel: number; // 掌握程度 0-100

  // 元数据
  createdAt: Date;
  updatedAt: Date;

  // 索引字段 - 用于优化查询
  wordLowerCase: string; // word的小写形式，用于不区分大小写的查询
  firstLetter: string; // 首字母，用于按字母分类
  length: number; // 词长，用于按长度筛选
}

// 难度枚举
export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

// 示例接口
export interface Example {
  text: string;
  translation: string;
  source?: string;
}

// 表达式接口
export interface Expression {
  id: string;
  expression: string;
  translation: string;
  wordIds: string[]; // 构成该表达式的词ID列表
  difficulty: Difficulty;
  examples: Example[];
  tags: string[];
  lastReviewed?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 用于优化查询的索引类型
export type WordIndex = {
  [key: string]: {
    id: string;
    expressionIds?: string[];
  };
};

export interface Subtitle {
  timestamp: string;
  en: string;
  cn: string;
  highlights: {
    en: string[];
    cn: string[];
  };
}

export interface VideoSubtitle {
  video_id: string;
  subtitle: Subtitle[];
}

// Basic sentence structure that appears in multiple places
interface Sentence {
  sentence: string;
  sentence_cn: string;
  source: string;
}

// Structure for synonymous phrases
interface SynonymousPhrase {
  text: string;
  translation: string;
  meaning: string;
  usage_context_en: string;
  usage_context_cn: string;
  sample_sentences: Sentence[];
}

// Structure for related expressions
interface RelatedExpression {
  text: string;
  translation: string;
  meaning: string;
  usage_context_en: string;
  usage_context_cn: string;
  sample_sentences: Sentence[];
}

// Main expression interface that combines all components
interface Expression {
  expression_id: string;
  text: string;
  translation: string;
  meaning_en: string;
  usage_context_en: string;
  usage_context_cn: string;
  sample_sentences: Sentence[];
  synonymous_phrases: SynonymousPhrase[];
  related_expressions: RelatedExpression[];
}

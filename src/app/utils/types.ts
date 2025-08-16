export interface Topic {
  topic: string;
  relevance_score: string;
}

export interface TickerSentiment {
  ticker: string;
  relevance_score: string;
  ticker_sentiment_score: string;
  ticker_sentiment_label: string;
}

export interface NewsProps {
  title: string;
  url: string;
  time_published: string;
  // authors: string[];
  summary: string;
  banner_image: string;
  source: string;
  // category_within_source: string;
  // source_domain: string;
  topics: Topic[];
  overall_sentiment_label: string;
  ticker_sentiment: TickerSentiment[];
}

export type StockPoint = { t: number; p: number };
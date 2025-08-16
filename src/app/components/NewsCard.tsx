// components/NewsCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface Topic {
  topic: string;
  relevance_score: string;
}

interface TickerSentiment {
  ticker: string;
  relevance_score: string;
  ticker_sentiment_score: string;
  ticker_sentiment_label: string;
}

interface NewsProps {
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

export default function NewsCard({
  title,
  url,
  time_published,
  // authors,
  summary,
  banner_image,
  source,
  // category_within_source,
  // source_domain,
  topics,
  overall_sentiment_label,
  ticker_sentiment,
}: NewsProps) {
  const formattedDate = new Date(
    time_published?.replace(
      /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,
      "$1-$2-$3T$4:$5:$6"
    )
  ).toLocaleString();

  const sentimentColor: Record<string, string> = {
    Positive: "bg-green-500",
    "Somewhat-Bullish": "bg-emerald-400",
    Neutral: "bg-gray-400",
    Negative: "bg-red-500",
    "Somewhat-Bearish": "bg-orange-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Card className="overflow-hidden border-0 shadow-lg rounded-2xl">
        {/* Banner */}
        <div className="relative h-60 w-full">
          <Image
            src={banner_image}
            alt={title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute top-3 left-3">
            <Badge
              className={`${sentimentColor[overall_sentiment_label] || "bg-gray-500"
                } text-white shadow`}
            >
              {overall_sentiment_label}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardHeader>
          <CardTitle className="text-lg leading-snug">
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {title}
            </Link>
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <CalendarDays size={14} />
            <span>{formattedDate}</span>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <Globe size={14} />
            <span>{source}</span>
          </div>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">{summary}</p>

          {/* Topics */}
          <div className="flex flex-wrap gap-1 mb-4">
            {topics?.map((t) => (
              <Badge key={t.topic} variant="secondary">
                {t.topic}
              </Badge>
            ))}
          </div>

          {/* Ticker Sentiment */}
          <div className="bg-muted p-3 rounded-lg">
            <p className="text-xs font-semibold mb-2">Ticker Sentiment</p>
            <div className="flex flex-wrap gap-2">
              {ticker_sentiment?.map((t) => (
                <Badge
                  key={t.ticker}
                  className={`${sentimentColor[t.ticker_sentiment_label] || "bg-gray-500"
                    } text-white`}
                >
                  {t.ticker} — {t.ticker_sentiment_label}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

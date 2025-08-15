"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";

export default function NewsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch(
        `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo`
      );
      const json = await res.json();
      setData(json?.feed);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data found</p>;

  return (
    <main className="h-screen relative space-y-4 p-4">
      <h2 className="text-2xl font-bold">News Page</h2>
      {data.map((item: any, index: number) => (
        <NewsCard key={item.url || index} {...item} />
      ))}
    </main>
  );
}

"use client";
import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { CONSTANTS } from "../utils/constants";
import { NewsProps } from "../utils/types";

export default function NewsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(CONSTANTS.TRUE);

  useEffect(() => {
    async function fetchData() {
      setLoading(CONSTANTS.TRUE);
      const res = await fetch(CONSTANTS.NEWS_API_URL);
      const json = await res.json();
      setData(json?.feed);
      setLoading(CONSTANTS.FALSE);
    }

    fetchData();
  }, []);

  if (loading) return <p>{CONSTANTS.LOADING}</p>;
  if (!data) return <p>{CONSTANTS.NO_DATA_FOUND}</p>;

  return (
    <main className="h-screen relative space-y-4 p-4">
      <h2 className="text-2xl font-bold">News Page</h2>
      {data.map((item: NewsProps, index: number) => (
        <NewsCard key={item.url || index} {...item} />
      ))}
    </main>
  );
}

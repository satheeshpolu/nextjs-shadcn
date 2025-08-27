"use client";
import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { CONSTANTS } from "../utils/constants";
import { NewsProps } from "../utils/types";
import TitleHighlight from "../components/TitleHighlight";

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

  if (loading) return <p className="text-center">{CONSTANTS.LOADING}</p>;
  if (!data) return <p>{CONSTANTS.NO_DATA_FOUND}</p>;

  return (
    <main className="h-screen relative space-y-4 p-8 text-center">
      <TitleHighlight
        title="News and Insights"
        fromGradient="from-cyan-300"
        viaGradient="via-blue-300"
        toGradient="to-indigo-300"
      />

      <div style={{ overflow: "auto", height: "90vh" }}>
        {data.map((item: NewsProps, index: number) => (
          <NewsCard key={item.url || index} {...item} />
        ))}
      </div>
    </main>
  );
}

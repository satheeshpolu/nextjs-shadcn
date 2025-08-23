"use client";
import { useStock } from "@/hooks/useStock";
import RealtimeChart from "../components/RealtimeChart";
import TitleHighlight from "../components/TitleHighlight";

export default function NewsPage() {
  const { stockData, loading } = useStock();
  return (
    <main className="h-screen relative space-y-4 p-16 text-center">
      <TitleHighlight
        title="Websocket Communication"
        fromGradient="from-emerald-300"
        viaGradient="via-teal-300"
        toGradient="to-cyan-300"
      />
      <RealtimeChart data={stockData} loading={loading} />
    </main>
  );
}

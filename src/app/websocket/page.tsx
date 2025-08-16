"use client";
import { useStock } from "@/hooks/useStock";
import RealtimeChart from "../components/RealtimeChart";
import TableDemo from "../components/TableDemo";

export default function NewsPage() {
  const {stockData, loading} = useStock();
  return (
    <main className="h-screen relative space-y-4 p-12">
      <RealtimeChart data={stockData} loading={loading}/>
    </main>
  );
}

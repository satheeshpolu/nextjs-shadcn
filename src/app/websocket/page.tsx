"use client";
import RealtimeChart from "../components/RealtimeChart";
import TableDemo from "../components/TableDemo";

export default function NewsPage() {

  return (
    <main className="h-screen relative space-y-4 p-4">
      <RealtimeChart />
      <TableDemo />
    </main>
  );
}

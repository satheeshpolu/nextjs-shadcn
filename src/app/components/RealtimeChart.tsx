"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CONSTANTS } from "../utils/constants";
import { useStock } from "@/hooks/useStock";

type Point = { t: number; p: number };

export default function RealtimeChart() {
  const [data, setData] = useState<Point[]>([]);
//   const [loading, setLoading] = useState(CONSTANTS.TRUE);
const {stockData, loading} = useStock();
useEffect(() => {
   setData(stockData);
}, [stockData]);
//   useEffect(() => {
//     const socket = new WebSocket(
//       "wss://ws.finnhub.io?token=d2geer1r01qq1lhun8cgd2geer1r01qq1lhun8d0"
//     );

//     socket.addEventListener("open", () => {
//       socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
//       socket.send(
//         JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
//       );
//     });

//     socket.addEventListener("message", (event) => {
//       try {
//         setLoading(CONSTANTS.TRUE);
//         const msg = JSON.parse(event.data);
//         if (msg.type === "trade" && msg.data?.length > 0) {
//           const trades = msg.data;

//           const newPoints = trades.map((trade: any) => ({
//             t: trade.t,
//             p: trade.p,
//           }));

//           setData((prev) => [...prev.slice(-29), ...newPoints]);
//           setLoading(CONSTANTS.FALSE);
//         }
//       } catch (err) {
//         console.error("Error parsing message", err);
//       }
//     });

//     return () => {
//       socket.close();
//     };
//   }, []);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Realtime Trade Data (BTC/USDT)</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        {loading && <h1>{CONSTANTS.LOADING}</h1>}
        {!loading &&(
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="t"
                tickFormatter={(t) =>
                  new Date(t).toLocaleTimeString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                }
              />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip
                labelFormatter={(t) =>
                  new Date(t).toLocaleTimeString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                }
                formatter={(value) => [`$${value}`, "Price"]}
              />
              <Line
                type="stepAfter"
                dataKey="p" // ✅ fixed here
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

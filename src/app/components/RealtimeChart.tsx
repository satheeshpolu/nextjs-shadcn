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
import { StockPoint } from "../utils/types";

interface Props {
  data: StockPoint[];
  loading: boolean;
}

type Point = { t: number; p: number };

export default function RealtimeChart({data, loading}: Props) {

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

import { CONSTANTS } from "@/app/utils/constants";
import { StockPoint } from "@/app/utils/types";
import { useEffect, useState } from "react";

export const useStock = () => {
  // const data = "Use Stock Data";
  const [data, setData] = useState<StockPoint[]>([]);
  const [loading, setLoading] = useState(CONSTANTS.TRUE);
  const [error, setError] = useState<boolean>(CONSTANTS.FALSE);

  useEffect(() => {
    const socket = new WebSocket(
      "wss://ws.finnhub.io?token=d2geer1r01qq1lhun8cgd2geer1r01qq1lhun8d0"
    );

    socket.addEventListener("open", () => {
      socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
      socket.send(
        JSON.stringify({ type: "subscribe", symbol: "BINANCE:BTCUSDT" })
      );
    });

    socket.addEventListener("message", (event) => {
      try {
         // debugger
        setLoading(CONSTANTS.TRUE);
        const msg = JSON.parse(event.data);
        if (msg.type === "trade" && msg.data?.length > 0) {
          const trades = msg.data;

          const newPoints = trades.map((trade: StockPoint) => ({
            t: trade.t,
            p: trade.p,
          }));

          setData((prev) => [...prev.slice(-29), ...newPoints]);
          setLoading(CONSTANTS.FALSE);
        }
      } catch (error) {
         setLoading(CONSTANTS.FALSE)
         setError(CONSTANTS.TRUE)
        console.error("Error parsing message", error);
      }
    });

    return () => {
      socket.close();
    };
  }, []);
  return {stockData: data, loading, error};
};

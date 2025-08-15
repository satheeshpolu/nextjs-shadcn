import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tickers = url.searchParams.get("tickers") || "AAPL";

  const API_KEY = process.env.ALPHA_VANTAGE_KEY; // store securely in .env
  const apiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo`;
//   const apiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

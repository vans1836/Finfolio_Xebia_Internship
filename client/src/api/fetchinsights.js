// src/api/fetchInsights.js

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

export const fetchInsights = async (symbols = []) => {
  try {
    // 🔒 TEMPORARILY DISABLED FETCH CALL FOR BUILD
    // const res = await fetch(`${API_BASE}/api/quotes?symbols=${symbols.join(",")}`);
    // const data = await res.json();

    // return data.map((s) => ({
    //   symbol: s.symbol,
    //   name: s.longName || "-",
    //   price: s.regularMarketPrice || 0,
    //   change: s.regularMarketChange || 0,
    //   changePercent: s.regularMarketChangePercent || 0,
    //   volume: s.regularMarketVolume || 0,
    //   time: s.regularMarketTime || 0,
    // }));

    return []; // Return safe mock data for now
  } catch (error) {
    console.error("Insight fetch failed:", error);
    return [];
  }
};

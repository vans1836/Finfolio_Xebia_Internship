export const fetchInsights = async (symbols = []) => {
  try {
    const res = await fetch(`http://localhost:3001/api/quotes?symbols=${symbols.join(",")}`);
    const data = await res.json();

    return data.map((s) => ({
      symbol: s.symbol,
      name: s.longName || "-",
      price: s.regularMarketPrice || 0,
      change: s.regularMarketChange || 0,
      changePercent: s.regularMarketChangePercent || 0,
      volume: s.regularMarketVolume || 0,
      time: s.regularMarketTime || 0,
    }));
  } catch (error) {
    console.error("Insight fetch failed:", error);
    return [];
  }
};

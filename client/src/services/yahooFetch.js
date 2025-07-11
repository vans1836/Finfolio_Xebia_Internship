// This fetches real-time quote data from Yahoo Finance's public API
export const fetchStockQuote = async (symbol) => {
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`
    );
    const data = await response.json();
    const result = data?.quoteResponse?.result?.[0];

    if (!result) {
      throw new Error(`No data for symbol: ${symbol}`);
    }

    return {
      regularMarketPrice: result.regularMarketPrice,
      regularMarketPreviousClose: result.regularMarketPreviousClose,
    };
  } catch (error) {
    console.error("fetchStockQuote error:", error.message);
    // fallback mock data
    return {
      regularMarketPrice: 1000,
      regularMarketPreviousClose: 990,
    };
  }
};

// src/api/fetchStockQuote.js

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

/**
 * Fetches real-time stock quote from your backend (which hits Yahoo API).
 */
export const fetchStockQuote = async (symbol) => {
  try {
    const response = await fetch(`${API_BASE}/api/quote?symbol=${symbol}`);
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

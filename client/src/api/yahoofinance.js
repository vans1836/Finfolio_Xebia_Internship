// src/api/yahoofinance.js

/**
 * Fetches stock data for a given symbol from the backend API.
 * Returns the raw Yahoo Finance quote object including fields like:
 * - regularMarketPrice
 * - regularMarketChangePercent
 * - regularMarketOpen
 * - regularMarketPreviousClose
 */

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

export const fetchStockDetails = async (symbol) => {
  try {
    const response = await fetch(`${API_BASE}/api/quote?symbol=${symbol}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    console.log("Raw Yahoo data for", symbol, "→", data);

    return data; // Return full quote object
  } catch (error) {
    console.error(`Error fetching ${symbol}:`, error.message);
    return null;
  }
};

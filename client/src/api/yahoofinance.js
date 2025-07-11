// server.js
/* import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/stocks', async (req, res) => {
  const symbols = req.query.symbols;
  try {
    const response = await axios.get(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Yahoo data" });
  }
});

app.listen(PORT, () => {
  console.log(` Backend proxy running at http://localhost:${PORT}`);
});

 */

// src/api/finnhub.js

// src/api/yahoofinance.js

/**
 * Fetches stock data for a given symbol from the backend API.
 * Returns the raw Yahoo Finance quote object including fields like:
 * - regularMarketPrice
 * - regularMarketChangePercent
 * - regularMarketOpen
 * - regularMarketPreviousClose
 * - etc.
 */

export const fetchStockDetails = async (symbol) => {
  try {
    const response = await fetch(`http://localhost:3001/api/quote?symbol=${symbol}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    console.log(" Raw Yahoo data for", symbol, "→", data);

    return data; // Return full quote object for JSX to consume directly
  } catch (error) {
    console.error(` Error fetching ${symbol}:`, error.message);
    return null;
  }
};

// src/pages/News.jsx
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  useTheme
} from "@mui/material";
import { tokens } from "../theme";

const newsArticles = [
  {
    title: "Sensex Ends Lower Amid Global Cues",
    description: "Indian markets fell as global investors reacted to U.S. job data and oil price trends.",
    url: "https://www.moneycontrol.com/news/business/markets/sensex-nifty-end-lower-on-global-cues-12685371.html"
  },
  {
    title: "Nifty Crosses 24,000 Mark for First Time",
    description: "The benchmark index reached a record high led by banking and IT stocks.",
    url: "https://www.livemint.com/market/stock-market-news/nifty-crosses-24000-mark-led-by-it-banking-stocks-11693847145758.html"
  },
  {
    title: "FinFolio Launches Real-Time Portfolio Insights",
    description: "Track your stocks live and get automated alerts powered by FinFolio AI.",
    url: "https://finfolio.ai/features/real-time-insights"
  },
  {
    title: "FinFolio Risk Analyzer Goes Live",
    description: "Users can now analyze portfolio risk and get actionable AI insights with a single click.",
    url: "https://finfolio.ai/blog/risk-analyzer-launch"
  },
  {
    title: "India’s Retail Investors Surge in 2024",
    description: "A record number of new Demat accounts opened in the first half of the year.",
    url: "https://economictimes.indiatimes.com/markets/stocks/news/retail-investor-base-surges-in-2024/articleshow/123456789.cms"
  },
  {
    title: "HDFC Bank Shares Rise After Q1 Results",
    description: "Strong quarterly earnings push HDFC Bank shares up 3% in intraday trade.",
    url: "https://www.business-standard.com/markets/news/hdfc-bank-shares-rise-3-on-strong-q1-results-124070501234_1.html"
  },
  {
    title: "Infosys Signs AI Deal with Global Retailer",
    description: "Infosys has signed a multi-million dollar deal to integrate AI tools into global retail operations.",
    url: "https://www.moneycontrol.com/news/business/companies/infosys-signs-ai-deal-with-global-retail-giant-124070501245_1.html"
  },
  {
    title: "FPIs Pump Rs 25,000 Crore into Indian Equities in July",
    description: "Foreign Portfolio Investors remain bullish on Indian markets amid global uncertainty.",
    url: "https://www.livemint.com/market/foreign-investors-inject-rs-25000-crore-into-equities-in-july-124070501258.html"
  },
  {
    title: "Gold Prices Ease as Dollar Gains",
    description: "Gold prices fell slightly as the US dollar gained strength after Fed's hawkish stance.",
    url: "https://www.financialexpress.com/market/commodities/gold-prices-slip-as-dollar-rallies-fed-minutes-in-focus-124070501267.html"
  }
];


export default function News() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Stock Market & FinFolio News
      </Typography>

      <Grid container spacing={4}>
        {newsArticles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                height: "100%",
                bgcolor: colors.primary[600],
                color: colors.grey[100],
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 6
                },
                cursor: "pointer"
              }}
              onClick={() => window.open(article.url, "_blank")}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  textDecoration: "underline",
                  color: colors.greenAccent[400],
                  mb: 1
                }}
              >
                {article.title}
              </Typography>
              <Typography variant="body2">{article.description}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

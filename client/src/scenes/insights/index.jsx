/* import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions Page" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            An Important Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Another Important Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Your Favorite Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Some Random Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            The Final Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
 */

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  CircularProgress
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { fetchInsights } from "../../api/fetchinsights";

const symbols = [
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
  "ITC.NS", "KOTAKBANK.NS", "HINDUNILVR.NS", "SBIN.NS", "LT.NS"
];

const Insight = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    const data = await fetchInsights(symbols);
    setStocks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  const sorted = [...stocks].sort((a, b) => b.changePercent - a.changePercent);
  const gainer = sorted[0];
  const loser = sorted[sorted.length - 1];

  const sentimentData = [
    {
      id: "Bullish",
      label: "Bullish",
      value: stocks.filter((s) => s.changePercent > 0).length,
      color: "hsl(140, 70%, 50%)"
    },
    {
      id: "Bearish",
      label: "Bearish",
      value: stocks.filter((s) => s.changePercent < 0).length,
      color: "hsl(0, 70%, 50%)"
    },
    {
      id: "Neutral",
      label: "Neutral",
      value: stocks.filter((s) => s.changePercent === 0).length,
      color: "hsl(44, 70%, 50%)"
    }
  ];

  const lineData = [
    {
      id: "Top 5",
      data: sorted.slice(0, 5).map((s) => ({
        x: s.symbol.replace(".NS", ""),
        y: s.price
      }))
    }
  ];

  return (
    <Box m="20px">
      <Header title="INSIGHT" subtitle="Live Market Analysis & Trends" />
      {loading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px" mt="10px">
          {/* Top Gainer */}
          <Box gridColumn="span 4" backgroundColor={colors.primary[400]} p="20px" borderRadius="10px">
            <Typography variant="h6" fontWeight="600" color={colors.greenAccent[400]}>Top Gainer</Typography>
            <Typography variant="subtitle2" color={colors.grey[300]}>{gainer?.symbol}</Typography>
            <Typography variant="h3" fontWeight="bold" color={colors.greenAccent[500]} mt="10px">+{gainer?.changePercent.toFixed(2)}%</Typography>
            <Typography color={colors.grey[100]} mt="10px">₹{gainer?.price}</Typography>
          </Box>

          {/* Top Loser */}
          <Box gridColumn="span 4" backgroundColor={colors.primary[400]} p="20px" borderRadius="10px">
            <Typography variant="h6" fontWeight="600" color={colors.redAccent[400]}>Top Loser</Typography>
            <Typography variant="subtitle2" color={colors.grey[300]}>{loser?.symbol}</Typography>
            <Typography variant="h3" fontWeight="bold" color={colors.redAccent[500]} mt="10px">{loser?.changePercent.toFixed(2)}%</Typography>
            <Typography color={colors.grey[100]} mt="10px">₹{loser?.price}</Typography>
          </Box>

          {/* Sentiment Distribution */}
          <Box gridColumn="span 4" backgroundColor={colors.primary[400]} p="20px" borderRadius="10px">
            <Typography variant="h6" fontWeight="600" mb="10px" color={colors.grey[100]}>Sentiment Distribution</Typography>
            <Box height="180px">
              <ResponsivePie
                data={sentimentData}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={6}
                borderWidth={1}
                borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={colors.grey[100]}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
                theme={{ labels: { text: { fill: colors.grey[100] } } }}
              />
            </Box>
          </Box>

          {/* Line Chart */}
          <Box gridColumn="span 12" backgroundColor={colors.primary[400]} p="20px" borderRadius="10px">
            <Typography variant="h6" fontWeight="600" mb="10px" color={colors.grey[100]}>Top 5 Stock Prices</Typography>
            <Box height="300px">
              <ResponsiveLine
                data={lineData}
                margin={{ top: 20, right: 30, bottom: 50, left: 70 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 6,
                  tickPadding: 10,
                  tickRotation: 0,
                  legend: "Symbol",
                  legendOffset: 40,
                  legendPosition: "middle"
                }}
                axisLeft={{
                  tickSize: 6,
                  tickPadding: 10,
                  tickRotation: 0,
                  legend: "Price (₹)",
                  legendOffset: -50,
                  legendPosition: "middle"
                }}
                enableGridX={false}
                curve="monotoneX"
                colors={{ scheme: "nivo" }}
                pointSize={10}
                pointColor={{ theme: "background" }}
                pointBorderWidth={3}
                pointBorderColor={{ from: "serieColor" }}
                pointLabelYOffset={-12}
                useMesh={true}
                theme={{
                  textColor: colors.grey[100],
                  axis: {
                    ticks: {
                      line: { stroke: colors.grey[300], strokeWidth: 1 },
                      text: { fill: colors.grey[300], fontSize: 12 }
                    },
                    legend: {
                      text: { fill: colors.grey[100] }
                    }
                  },
                  tooltip: {
                    container: {
                      background: colors.primary[400],
                      color: colors.grey[100],
                      fontSize: 13,
                      padding: 10,
                      borderRadius: 4
                    }
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Insight;


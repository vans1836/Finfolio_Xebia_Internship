import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Tooltip,
  Divider,
} from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import { fetchStockQuote } from "../../services/yahooFetch";
import { holdings } from "../../data/portfolioData";
import { ResponsivePie } from "@nivo/pie";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [liveHoldings, setLiveHoldings] = useState([]);
  const [dayChange, setDayChange] = useState({ amount: 0, percent: 0 });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      let total = 0;
      let changeToday = 0;
      let liveData = [];

      for (const stock of holdings) {
        const quote = await fetchStockQuote(stock.symbol);
        if (!quote || !quote.regularMarketPrice || !quote.regularMarketPreviousClose) continue;

        const current = quote.regularMarketPrice;
        const prevClose = quote.regularMarketPreviousClose;
        const value = current * stock.quantity;
        const dayDiff = (current - prevClose) * stock.quantity;

        liveData.push({
          ...stock,
          current,
          change: (current - stock.avgBuyPrice).toFixed(2),
          marketValue: value.toFixed(2),
        });

        total += value;
        changeToday += dayDiff;
      }

      setLiveHoldings(liveData);
      setPortfolioValue(total);
      setDayChange({
        amount: changeToday.toFixed(2),
        percent: ((changeToday / (total - changeToday)) * 100).toFixed(2),
      });
    };

    fetchPortfolio();
  }, []);

  const allocationData = liveHoldings.map((s) => ({
    id: s.symbol,
    label: s.symbol,
    value: parseFloat(s.marketValue),
  }));

  const downloadHoldingsAsCSV = () => {
    if (!liveHoldings.length) return;

    const headers = ["Symbol", "Quantity", "Avg Buy Price", "Current Price", "Market Value", "Change"];
    const rows = liveHoldings.map(h => [
      h.symbol,
      h.quantity,
      h.avgBuyPrice,
      h.current,
      h.marketValue,
      h.change,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "portfolio_summary.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box m="20px">
      {/* USER DASHBOARD HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="📈 My Portfolio"
          subtitle={`Welcome back, ${user?.name || "Investor"}! Live snapshot of your investments`}
        />
        <Tooltip title="Export your holdings summary as PDF or CSV">
          <Button
            onClick={downloadHoldingsAsCSV}
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "8px 18px",
              borderRadius: "8px",
            }}
            startIcon={<DownloadOutlinedIcon />}
          >
            Download Summary
          </Button>
        </Tooltip>
      </Box>

      {/* PORTFOLIO SUMMARY */}
      <Box
        mt="20px"
        p="25px"
        borderRadius="12px"
        backgroundColor={colors.primary[400]}
        boxShadow="0px 2px 10px rgba(0,0,0,0.1)"
      >
        <Typography variant="h4" fontWeight="600" color={colors.greenAccent[400]}>
          ₹{portfolioValue.toLocaleString("en-IN")}
        </Typography>
        <Typography variant="body1" color={colors.grey[100]} mt="8px">
          Day's Change: <b>₹{dayChange.amount}</b> ({dayChange.percent}%)
        </Typography>
      </Box>

      {/* ALLOCATION + HOLDINGS ROW */}
      <Box
        mt="30px"
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap="20px"
      >
        <Box
          flex={1}
          height="350px"
          backgroundColor={colors.primary[400]}
          borderRadius="12px"
          p="20px"
          boxShadow="0px 2px 10px rgba(0,0,0,0.08)"
        >
          <Typography variant="h6" color={colors.grey[100]} mb="10px">
            🧩 Portfolio Allocation
          </Typography>
          <ResponsivePie
            data={allocationData}
            margin={{ top: 40, right: 60, bottom: 60, left: 60 }}
            innerRadius={0.5}
            padAngle={1}
            cornerRadius={4}
            colors={{ scheme: "category10" }}
            borderWidth={1}
            borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
            enableArcLabels={true}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            arcLinkLabelsColor={{ from: "color" }}
            arcLinkLabelsThickness={2}
            arcLinkLabelsTextColor={colors.grey[100]}
          />
        </Box>

        <Box
          flex={1}
          backgroundColor={colors.primary[400]}
          borderRadius="12px"
          p="20px"
          maxHeight="350px"
          overflow="auto"
          boxShadow="0px 2px 10px rgba(0,0,0,0.08)"
        >
          <Typography variant="h6" color={colors.grey[100]} mb="16px">
            💼 Your Holdings
          </Typography>
          <Divider sx={{ borderColor: colors.primary[500], mb: 2 }} />
          {liveHoldings.map((stock, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              py="10px"
              borderBottom={`1px solid ${colors.primary[500]}`}
            >
              <Box>
                <Typography color={colors.greenAccent[500]} fontWeight="600" fontSize="14px">
                  {stock.symbol}
                </Typography>
                <Typography color={colors.grey[100]} fontSize="13px">Qty: {stock.quantity}</Typography>
                <Typography color={colors.grey[100]} fontSize="12px">
                  Avg Buy: ₹{stock.avgBuyPrice} | Current: ₹{stock.current}
                </Typography>
              </Box>
              <Box textAlign="right">
                <Typography color={colors.grey[100]} fontSize="12px">Market Value</Typography>
                <Typography color={colors.greenAccent[300]} fontWeight="bold" fontSize="14px">
                  ₹{stock.marketValue}
                </Typography>
                <Typography
                  fontSize="13px"
                  color={parseFloat(stock.change) >= 0 ? colors.greenAccent[400] : colors.redAccent[400]}
                >
                  {parseFloat(stock.change) >= 0 ? '+' : ''}{stock.change}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UserDashboard;
/*import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
 */

/* import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import axios from "axios";

const stockList = ["RELIANCE.BO", "TCS.BO", "INFY.BO", "HDFCBANK.BO", "ICICIBANK.BO"];

export default function MarketDashboard() {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    try {
      const results = await Promise.all(
        stockList.map((symbol) =>
          axios.get(`http://localhost:{PORT}/api/stocks?symbols=ICICIBANK.BO`)

        )
      );
      const formatted = {};
      results.forEach((res, idx) => {
        const resultArr = res.data?.quoteResponse?.result;
        if (Array.isArray(resultArr) && resultArr.length > 0) {
          formatted[stockList[idx]] = resultArr[0];
        }
      });
      setData(formatted);
    } catch (err) {
      console.error("Error fetching stock data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <Box p={4} sx={{ backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Market Dashboard</Typography>

      <TextField
        variant="outlined"
        placeholder="Search stock (e.g. TCS)"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value.toUpperCase())}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <Grid container spacing={3}>
        {Object.keys(data).filter((key) => key.includes(query)).map((key) => {
          const stock = data[key];
          const change = stock?.regularMarketChangePercent?.toFixed(2);
          const isUp = parseFloat(change) >= 0;

          return (
            <Grid item xs={12} md={6} lg={4} key={stock.symbol}>
              <Card sx={{ borderRadius: 3, backgroundColor: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{stock.shortName}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">{stock.symbol}</Typography>
                  <Box mt={2} mb={2}>
                    <Typography variant="h4">
                      ₹{stock.regularMarketPrice?.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: isUp ? 'green' : 'red', display: 'flex', alignItems: 'center' }}
                    >
                      {isUp ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {change}%
                    </Typography>
                  </Box>
                  <Typography variant="body2">Day High: ₹{stock.regularMarketDayHigh}</Typography>
                  <Typography variant="body2">Day Low: ₹{stock.regularMarketDayLow}</Typography>
                  <Typography variant="body2">Volume: {stock.regularMarketVolume?.toLocaleString()}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
 */


/* import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const stockList = ["RELIANCE.BO", "TCS.BO", "INFY.BO", "HDFCBANK.BO", "ICICIBANK.BO"];

export default function MarketDashboard() {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    try {
      const symbols = stockList.join(",");
      const response = await fetch(`http://localhost:5000/api/stocks?symbols=${symbols}`);
      const result = await response.json();
      const resultArr = result?.quoteResponse?.result || [];

      const formatted = {};
      resultArr.forEach((stock) => {
        formatted[stock.symbol] = stock;
      });

      setData(formatted);
    } catch (err) {
      console.error("Error fetching stock data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <Box p={4} sx={{ backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Market Dashboard</Typography>

      <TextField
        variant="outlined"
        placeholder="Search stock (e.g. TCS)"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value.toUpperCase())}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <Grid container spacing={3}>
        {Object.keys(data).filter((key) => key.includes(query)).map((key) => {
          const stock = data[key];
          const change = stock?.regularMarketChangePercent?.toFixed(2);
          const isUp = parseFloat(change) >= 0;

          return (
            <Grid item xs={12} md={6} lg={4} key={stock.symbol}>
              <Card sx={{ borderRadius: 3, backgroundColor: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{stock.shortName}</Typography>
                  <Typography variant="subtitle2" color="text.secondary">{stock.symbol}</Typography>
                  <Box mt={2} mb={2}>
                    <Typography variant="h4">
                      ₹{stock.regularMarketPrice?.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: isUp ? 'green' : 'red', display: 'flex', alignItems: 'center' }}
                    >
                      {isUp ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {change}%
                    </Typography>
                  </Box>
                  <Typography variant="body2">Day High: ₹{stock.regularMarketDayHigh}</Typography>
                  <Typography variant="body2">Day Low: ₹{stock.regularMarketDayLow}</Typography>
                  <Typography variant="body2">Volume: {stock.regularMarketVolume?.toLocaleString()}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
 */


/* import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  InputAdornment
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const stockList = ["RELIANCE.BSE", "TCS.BSE", "HDFCBANK.BSE", "INFY.BSE", "ICICIBANK.BSE"];
const API_KEY = "d1j5ag9r01qhbuvtjc8gd1j5ag9r01qhbuvtjc90g"; // 🔑 Replace this with your real key

export default function Market() {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    try {
      const results = await Promise.all(
        stockList.map(symbol =>
          fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`)
            .then(res => res.json())
            .then(json => ({ symbol, ...json }))
        )
      );

      const formatted = {};
      results.forEach(stock => {
        formatted[stock.symbol] = stock;
      });

      setData(formatted);
    } catch (err) {
      console.error("Error fetching stock data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box p={4} sx={{ backgroundColor: '#f5f7fb', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>Market</Typography>

      <TextField
        variant="outlined"
        placeholder="Search stock (e.g. TCS)"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value.toUpperCase())}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />

      <Grid container spacing={3}>
        {Object.keys(data).filter(key => key.includes(query)).map(key => {
          const stock = data[key];
          const change = stock.d !== undefined ? ((stock.c - stock.pc) / stock.pc * 100).toFixed(2) : "N/A";
          const isUp = parseFloat(change) >= 0;

          return (
            <Grid item xs={12} md={6} lg={4} key={stock.symbol}>
              <Card sx={{ borderRadius: 3, backgroundColor: '#ffffff' }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{stock.symbol}</Typography>
                  <Box mt={2} mb={2}>
                    <Typography variant="h4">₹{stock.c?.toFixed(2)}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: isUp ? 'green' : 'red', display: 'flex', alignItems: 'center' }}
                    >
                      {isUp ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />} {change}%
                    </Typography>
                  </Box>
                  <Typography variant="body2">Open: ₹{stock.o}</Typography>
                  <Typography variant="body2">High: ₹{stock.h}</Typography>
                  <Typography variant="body2">Low: ₹{stock.l}</Typography>
                  <Typography variant="body2">Previous Close: ₹{stock.pc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
 */


// client/src/pages/Market.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  useTheme,
  CircularProgress
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

const symbols = [
  "RELIANCE.NS", "TCS.NS", "HDFCBANK.NS", "INFY.NS", "ICICIBANK.NS",
  "ITC.NS", "KOTAKBANK.NS", "HINDUNILVR.NS", "SBIN.NS", "LT.NS",
  "AXISBANK.NS", "BAJFINANCE.NS", "MARUTI.NS", "WIPRO.NS", "SUNPHARMA.NS"
];

const Market = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const results = await Promise.all(
        symbols.map(async (symbol) => {
          const response = await fetch(`http://localhost:3001/api/quote?symbol=${symbol}`);
          const json = await response.json();
          return { symbol, ...json };
        })
      );

      const formatted = {};
      results.forEach((stock) => {
        formatted[stock.symbol] = stock;
      });

      setData(formatted);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching stock data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box m="20px">
      <Header title="MARKET" subtitle="Live NSE Stock Tracker via Yahoo Finance" />

      <Box mb="20px">
        <TextField
          fullWidth
          placeholder="Search stock (e.g. TCS)"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value.toUpperCase())}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <CircularProgress sx={{ color: colors.greenAccent[400] }} />
      ) : (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap="20px">
          {Object.keys(data)
            .filter((key) => key.includes(query))
            .map((key) => {
              const stock = data[key];
              const price = stock.regularMarketPrice || 0;
              const prev = stock.regularMarketPreviousClose || 0;
              const change = prev !== 0 ? (((price - prev) / prev) * 100).toFixed(2) : "0.00";
              const isUp = parseFloat(change) >= 0;

              return (
                <Box
                  key={stock.symbol}
                  gridColumn="span 4"
                  backgroundColor={colors.primary[400]}
                  borderRadius="8px"
                  p="20px"
                >
                  <Typography variant="h6" fontWeight="600" color={colors.greenAccent[400]}>
                    {stock.symbol}
                  </Typography>

                  <Box mt="10px" mb="10px">
                    <Typography variant="h4" fontWeight="bold" color={colors.grey[100]}>
                      ₹{price.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isUp ? colors.greenAccent[500] : colors.redAccent[500],
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {isUp ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
                      {change}%
                    </Typography>
                  </Box>

                  <Typography variant="body2" color={colors.grey[300]}>
                    Open: ₹{stock.regularMarketOpen || "-"}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[300]}>
                    High: ₹{stock.regularMarketDayHigh || "-"}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[300]}>
                    Low: ₹{stock.regularMarketDayLow || "-"}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[300]}>
                    Prev Close: ₹{stock.regularMarketPreviousClose || "-"}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[500]} mt="4px">
                    Last Updated: {stock.regularMarketTime
                      ? new Date(stock.regularMarketTime * 1000).toLocaleTimeString()
                      : "N/A"}
                  </Typography>
                </Box>
              );
            })}
        </Box>
      )}
    </Box>
  );
};

export default Market;


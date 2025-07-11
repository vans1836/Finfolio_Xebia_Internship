import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchStockDetails } from "../../api/yahoofinance";

const tradeSymbols = ["TCS.NS", "INFY.NS", "SBIN.NS"];

export default function Profile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [trades, setTrades] = useState([]);
  const [filter, setFilter] = useState("All");

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setName(storedUser.name || "");
      setUsername(storedUser.email || "");
    }

    const load = async () => {
      const results = await Promise.all(tradeSymbols.map(fetchStockDetails));
      console.log('results :>> ', results);
      const withMeta = results.map((s, i) => ({
        ...s,
        type: i % 2 === 0 ? "Buy" : "Sell",
        qty: 10 + i * 5,
        date: new Date().toLocaleDateString(),
      }));
      setTrades(withMeta);
    };
    load();
  }, []);

  const handleSave = () => {
    const updatedUser = { name, email: username };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  };

  const filteredTrades =
    filter === "All" ? trades : trades.filter((t) => t.type === filter);

    console.log('trades :>> ', trades);

  return (
    <Box m="20px">
      <Header title="PROFILE" subtitle="User Portfolio Summary" />

      {/* User Info */}
      <Card sx={{ backgroundColor: colors.primary[400] }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ width: 64, height: 64 }} />
            <Box>
              {isEditing ? (
                <>
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <Typography variant="h5" fontWeight={600}>
                    {name}
                  </Typography>
                  <Typography variant="body2" color={colors.grey[300]}>
                    {username}
                  </Typography>
                  <Typography fontSize="12px" color={colors.grey[500]}>
                    Joined Jan 2023
                  </Typography>
                </>
              )}
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
          >
            {isEditing ? "Save" : "Edit Profile"}
          </Button>
        </CardContent>
      </Card>

      {/* Portfolio Snapshot */}
      <Card sx={{ backgroundColor: colors.primary[400], mt: 2 }}>
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 2,
          }}
        >
          {[
            { label: "Total Portfolio Value", value: "₹12,48,000" },
            { label: "Today’s P&L", value: "+₹8,320 (↑0.67%)", color: "green" },
            {
              label: "Overall P&L",
              value: "+₹1,45,600 (↑13.2%)",
              color: "green",
            },
            { label: "Cash Balance", value: "₹1,20,000" },
            { label: "Invested Amount", value: "₹11,28,000" },
          ].map((item, i) => (
            <Box key={i}>
              <Typography
                variant="body2"
                fontSize="13px"
                color={colors.grey[300]}
              >
                {item.label}
              </Typography>
              <Typography
                fontWeight={600}
                fontSize="15px"
                color={item.color || colors.grey[100]}
              >
                {item.value}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Recent Trades */}
      <Card sx={{ backgroundColor: colors.primary[400], mt: 2 }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight={600}>
              Recent Trades
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Filter</InputLabel>
              <Select
                value={filter}
                label="Filter"
                onChange={(e) => setFilter(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Buy">Buy</MenuItem>
                <MenuItem value="Sell">Sell</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box component="table" width="100%" fontSize="14px">
            <thead>
              <tr style={{ color: colors.grey[300], textAlign: "left" }}>
                <th>Date</th>
                <th>Ticker</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Market Status</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((t, i) => (
                <tr key={i}>
                  <td>{t.date}</td>
                  <td>{t.symbol?.replace(".NS", "") || "N/A"}</td>

                  <td>{t.type}</td>
                  <td>{t.qty}</td>
                  <td>₹{t.priceToBook ? t.priceToBook.toFixed(2) : "N/A"}</td>
                  <td>{t.marketState}</td>
                  <td>Completed</td>
                </tr>
              ))}
            </tbody>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

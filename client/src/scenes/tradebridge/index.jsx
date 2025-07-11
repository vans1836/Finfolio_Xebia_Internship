/* import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";

const Invoices = () => {
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
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="INVOICES" subtitle="List of Invoice Balances" />
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
        <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} />
      </Box>
    </Box>
  );
};

export default Invoices;
 */

/* import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  InputAdornment,
  MenuItem,
  IconButton
} from "@mui/material";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const stockOptions = [
  { label: "TCS", value: "TCS" },
  { label: "INFY", value: "INFY" },
  { label: "RELIANCE", value: "RELIANCE" }
];

export default function TradeBridge() {
  const [selectedStock, setSelectedStock] = useState("TCS");
  const [inrAmount, setInrAmount] = useState(0);
  const [estimatedShares, setEstimatedShares] = useState(0);
  const [mockPrice, setMockPrice] = useState(3500); // assume ₹ per share

  const handleInrChange = (e) => {
    const value = Number(e.target.value);
    setInrAmount(value);
    setEstimatedShares((value / mockPrice).toFixed(4));
  };

  const handleSwap = () => {
    alert(`Swapping ₹${inrAmount} for ${estimatedShares} shares of ${selectedStock}`);
  };

  return (
    <Box p={4} style={{ background: '#1a1a2e', minHeight: '100vh', color: '#fff' }}>
      <Card sx={{ backgroundColor: '#222244', borderRadius: 4, boxShadow: 10 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom fontWeight="bold">Stock Swap</Typography>

          <TextField
            select
            fullWidth
            label="Choose Stock"
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            sx={{ mt: 2, mb: 4, input: { color: '#fff' }, label: { color: '#ccc' }, '& .MuiSelect-icon': { color: '#fff' } }}
          >
            {stockOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </TextField>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="From INR"
                value={inrAmount}
                onChange={handleInrChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                sx={{ input: { color: '#fff' }, label: { color: '#ccc' } }}
              />
            </Grid>

            <Grid item xs={2} textAlign="center">
              <SwapHorizIcon fontSize="large" sx={{ color: '#9c27b0' }} />
            </Grid>

            <Grid item xs={5}>
              <TextField
                fullWidth
                label={`To ${selectedStock} (Shares)`}
                value={estimatedShares}
                InputProps={{
                  endAdornment: <InputAdornment position="end">Shares</InputAdornment>,
                  readOnly: true
                }}
                sx={{ input: { color: '#fff' }, label: { color: '#ccc' } }}
              />
            </Grid>
          </Grid>

          <Box mt={4}>
            <Typography variant="body2" color="gray">
              Estimated Price: ₹{mockPrice} per share
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, py: 1.5, backgroundColor: '#4cceac', fontWeight: 'bold', fontSize: '1rem' }}
              onClick={handleSwap}
            >
              Swap Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
 */

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  useTheme,
} from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const stockOptions = [
  { label: "TCS", value: "TCS" },
  { label: "INFY", value: "INFY" },
  { label: "RELIANCE", value: "RELIANCE" },
];

const TradeBridge = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [selectedStock, setSelectedStock] = useState("TCS");
  const [inrAmount, setInrAmount] = useState(0);
  const [estimatedShares, setEstimatedShares] = useState(0);
  const [mockPrice, setMockPrice] = useState(3500); // mock ₹ per share

  const handleInrChange = (e) => {
    const value = Number(e.target.value);
    setInrAmount(value);
    setEstimatedShares((value / mockPrice).toFixed(4));
  };

  const handleSwap = () => {
    alert(`Swapping ₹${inrAmount} for ${estimatedShares} shares of ${selectedStock}`);
  };

  return (
    <Box m="20px">
      <Header title="TRADE BRIDGE" subtitle="Swap INR for Equity Instantly" />

      <Card sx={{ backgroundColor: colors.primary[400], borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="600"
            gutterBottom
            color={colors.greenAccent[400]}
          >
            Stock Swap
          </Typography>

          <TextField
            select
            fullWidth
            label="Choose Stock"
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            sx={{
              mt: 2,
              mb: 4,
              "& .MuiInputBase-input": { color: colors.grey[100] },
              "& .MuiInputLabel-root": { color: colors.grey[300] },
              "& .MuiSvgIcon-root": { color: colors.grey[100] },
            }}
          >
            {stockOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={5}>
              <TextField
                fullWidth
                label="From INR"
                value={inrAmount}
                onChange={handleInrChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
                sx={{
                  "& input": { color: colors.grey[100] },
                  "& label": { color: colors.grey[300] },
                }}
              />
            </Grid>

            <Grid item xs={2} textAlign="center">
              <SwapHorizIcon fontSize="large" sx={{ color: colors.greenAccent[500] }} />
            </Grid>

            <Grid item xs={5}>
              <TextField
                fullWidth
                label={`To ${selectedStock} (Shares)`}
                value={estimatedShares}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Shares</InputAdornment>
                  ),
                  readOnly: true,
                }}
                sx={{
                  "& input": { color: colors.grey[100] },
                  "& label": { color: colors.grey[300] },
                }}
              />
            </Grid>
          </Grid>

          <Box mt={4}>
            <Typography variant="body2" color={colors.grey[300]}>
              Estimated Price: ₹{mockPrice} per share
            </Typography>

            <Button
              fullWidth
              variant="contained"
              onClick={handleSwap}
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: colors.greenAccent[600],
                fontWeight: "bold",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: colors.greenAccent[700],
                },
              }}
            >
              Swap Now
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TradeBridge;

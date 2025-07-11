// src/pages/Home.jsx
import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Snackbar,
  Alert,
  Button,
  useTheme
} from "@mui/material";
import { ColorModeContext, tokens } from "../theme";

export default function Home() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubscribe = () => {
    setOpen(true);
    setEmail("");
  };

  const paperBackground = theme.palette.mode === "light" ? colors.grey[100] : colors.primary[600];
  const paperText = theme.palette.mode === "light" ? colors.grey[900] : colors.grey[100];

  return (
    <Box sx={{ bgcolor: colors.primary[900], color: colors.grey[100], minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Hero Section */}
      <Box sx={{ py: 12, background: colors.primary[800] }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" fontWeight="bold" gutterBottom>
                Your Portfolio, One Dashboard
              </Typography>
              <Typography variant="h6" sx={{ mb: 4 }}>
                Track, analyze, and optimize your investments with live stock insights and AI-powered analytics.
              </Typography>
              <Button variant="contained" size="large" sx={{ px: 4, py: 1.5, bgcolor: colors.greenAccent[600], color: colors.grey[900], fontWeight: 600 }} href="/signup">Get Started</Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="trade analytics.jpeg"
                alt="Dashboard Overview"
                sx={{ width: "100%", height: "80%", borderRadius: 4, boxShadow: 3 }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Key Features */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Empower Your Financial Future
        </Typography>
        <Typography align="center" sx={{ mb: 6, fontSize: '1.1rem', color: colors.grey[300] }}>
          Explore FinFolio's smart tools to manage your wealth.
        </Typography>
        <Grid container spacing={4}>
          {["Live Stock Tracker","Portfolio Overview","Risk Analyzer","Auto Alerts","Watchlist Creator","Performance Insights"].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} sx={{ p: 4, backgroundColor: paperBackground, color: paperText, borderRadius: 4, height: '100%', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>{feature}</Typography>
                <Typography variant="body2">
                  Discover how this feature helps enhance your stock strategy and grow your portfolio.
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Newsletter */}
      <Container maxWidth="sm" sx={{ pb: 10 }}>
        <Paper elevation={2} sx={{ p: 4, backgroundColor: paperBackground, color: paperText, borderRadius: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>Stay Informed</Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>Get curated insights, weekly market recaps, and fintech news directly in your inbox.</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ style: { color: paperText } }}
              sx={{ input: { color: paperText } }}
            />
            <Button variant="contained" sx={{ bgcolor: colors.greenAccent[500], color: colors.grey[900] }} onClick={handleSubscribe}>Subscribe</Button>
          </Box>
        </Paper>
        <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
          <Alert severity="success" sx={{ width: '100%' }}>You're subscribed!</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

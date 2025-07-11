// src/components/PublicFooter.jsx
import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

export default function PublicFooter() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ bgcolor: colors.greenAccent[600], textAlign: "center", py: 3 }}>
      <Typography variant="body2" color={theme.palette.mode === "light" ? colors.grey[900] : colors.grey[100]}>
        © {new Date().getFullYear()} FinFolio • Smart Tools for Smart Investors
      </Typography>
    </Box>
  );
}

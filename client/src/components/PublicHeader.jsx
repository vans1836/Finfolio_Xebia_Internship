// src/components/PublicHeader.jsx
import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../theme";

export default function PublicHeader() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ bgcolor: colors.greenAccent[600] }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Clickable logo */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          FinFolio
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <Button sx={{ color: theme.palette.mode === "light" ? colors.grey[900] : colors.grey[100] }} fontWeight="bold" onClick={() => navigate("/faq")}>FAQ</Button>
          <Button sx={{ color: theme.palette.mode === "light" ? colors.grey[900] : colors.grey[100] }} onClick={() => navigate("/news")}>News</Button>
          <Button sx={{ color: theme.palette.mode === "light" ? colors.grey[900] : colors.grey[100] }} onClick={() => navigate("/support")}>Support</Button>
          <Button sx={{ color: theme.palette.mode === "light" ? colors.grey[900] : colors.grey[100] }} onClick={() => navigate("/login")}>Login</Button>
          <Button variant="contained" sx={{ bgcolor: colors.greenAccent[700], color: colors.grey[900], fontWeight: 600 }} onClick={() => navigate("/signup")}>Sign Up</Button>
          <IconButton onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === "light" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

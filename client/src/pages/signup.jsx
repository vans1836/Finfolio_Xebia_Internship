/* import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  IconButton,
  useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../theme";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

export default function Signup() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(form));

    // No storage, just visual effect
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor={colors.primary[900]}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 360,
          backgroundColor: colors.primary[400],
          borderRadius: 3
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Sign Up
          </Typography>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <TextField
            label="Name"
            name="name"
            type="text"
            fullWidth
            margin="normal"
            required
            value={form.name}
            onChange={handleChange}
            sx={{ input: { color: colors.grey[100] } }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={form.email}
            onChange={handleChange}
            sx={{ input: { color: colors.grey[100] } }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={form.password}
            onChange={handleChange}
            sx={{ input: { color: colors.grey[100] } }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: colors.greenAccent[600],
              fontWeight: 600
            }}
          >
            Create Account
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
 */

import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  IconButton,
  useTheme,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../theme";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

export default function Signup() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSnack({ open: true, message: "✅ Signup successful!", severity: "success" });
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setSnack({ open: true, message: `❌ ${data.error}`, severity: "error" });
      }
    } catch (err) {
      setSnack({ open: true, message: "❌ Signup failed", severity: "error" });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor={colors.primary[900]}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 360,
          backgroundColor: colors.primary[400],
          borderRadius: 3
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Sign Up
          </Typography>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
          <TextField
            label="Name"
            name="name"
            type="text"
            fullWidth
            margin="normal"
            required
            value={form.name}
            onChange={handleChange}
            sx={{ input: { color: colors.grey[100] } }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={form.email}
            onChange={handleChange}
            sx={{ input: { color: colors.grey[100] } }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            required
            value={form.password}
            onChange={handleChange}
            sx={{ input: { color: colors.grey[100] } }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: colors.greenAccent[600],
              fontWeight: 600
            }}
          >
            Create Account
          </Button>
        </form>
      </Paper>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

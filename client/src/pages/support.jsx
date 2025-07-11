/* import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  useTheme
} from "@mui/material";
import { tokens } from "../theme";

export default function Support() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpen(true);
    setQuery("");
  };

  return (
    <Box sx={{ bgcolor: colors.primary[900], color: colors.grey[100], minHeight: "100vh", py: 6 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, backgroundColor: colors.primary[700], borderRadius: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Contact Support
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Have a question or need help? Drop us a message below.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Your Message"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mb: 2, backgroundColor: theme.palette.background.paper }}
          />
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: colors.greenAccent[600] }}>
            Send
          </Button>
        </Paper>
        <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Message sent successfully!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
 */

import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
  Divider,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import ChatBot from "../components/ChatBot"; // ✅ Floating assistant

export default function Support() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpen(true);
    setQuery("");
  };

  return (
    <Box
      sx={{
        bgcolor: colors.primary[900],
        color: colors.grey[100],
        minHeight: "100vh",
        py: 6,
        position: "relative",
      }}
    >
      <Container maxWidth="sm">
        {/* ✅ Support Form */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: colors.primary[700],
            borderRadius: 4,
            mb: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Contact Support
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Have a question or need help? Drop us a message below or chat with our assistant.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            label="Your Message"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mb: 2, backgroundColor: theme.palette.background.paper }}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ bgcolor: colors.greenAccent[600] }}
          >
            Send
          </Button>
        </Paper>

        {/* ✅ Contact Information Section */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: colors.primary[700],
            borderRadius: 4,
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            📞 Contact Information
          </Typography>
          <Divider sx={{ my: 2, borderColor: colors.grey[500] }} />
          <Typography variant="body1" gutterBottom>
            <strong>Email:</strong> support@finfolio.com
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Phone:</strong> +91 98765 43210
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Address:</strong> 2nd Floor, A-Block, FinTech Tower, New Delhi – 110001
          </Typography>
        </Paper>

        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={() => setOpen(false)}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Message sent successfully!
          </Alert>
        </Snackbar>
      </Container>

      {/* ✅ Floating Chatbot Assistant */}
      <ChatBot />
    </Box>
  );
}

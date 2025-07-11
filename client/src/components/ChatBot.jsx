/* import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Paper,
  Typography,
  Button
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "Test Key", text: "Hi! Need help with FinFolio?" }
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setOpen(!open);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
     const res = await fetch("http://localhost:3001/api/chatbot", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ message: input })
});



      const data = await res.json();

      const botMessage = {
        sender: "Test Key",
        text: data.reply || "No response from assistant."
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "Test Key", text: "Error contacting assistant." }
      ]);
    }
  };

  return (
    <Box position="fixed" bottom={20} right={20} zIndex={1000} color={"white"}>
      {!open && (
        <IconButton color="primary" onClick={toggleChat}>
          <ChatIcon fontSize="large" />
        </IconButton>
      )}

      {open && (
        <Paper
          sx={{
            width: 300,
            height: 400,
            p: 2,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box flex={1} overflow="auto" mb={1}>
            {messages.map((msg, idx) => (
              <Typography
                key={idx}
                align={msg.sender === "user" ? "right" : "left"}
                sx={{
                  my: 0.5,
                  color: msg.sender === "user" ? "#1e88e5" : "#43a047"
                }}
              >
                {msg.text}
              </Typography>
            ))}
          </Box>

          <Box display="flex" gap={1}>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <IconButton color="#ffffff" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </Box>

          <Button
            onClick={toggleChat}
            sx={{ mt: 1 }}
            color="error"
            size="small"
          >
            Close
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default ChatBot;
 */

import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Paper,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "Test Key", text: "Hi! Need help with FinFolio?" }
  ]);
  const [input, setInput] = useState("");
  const theme = useTheme();

  const toggleChat = () => setOpen(!open);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("http://localhost:3001/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      const botMessage = {
        sender: "Test Key",
        text: data.reply || "No response from assistant."
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "Test Key", text: "Error contacting assistant." }
      ]);
    }
  };

  return (
    <Box position="fixed" bottom={20} right={20} zIndex={1000}>
      {!open && (
        <IconButton
          color="primary"
          onClick={toggleChat}
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          <ChatIcon fontSize="large" />
        </IconButton>
      )}

      {open && (
        <Paper
          sx={{
            width: 320,
            height: 460,
            p: 2,
            display: "flex",
            flexDirection: "column",
            backgroundColor: theme.palette.background.default,
            border: `1px solid ${theme.palette.divider}`,
          }}
          elevation={6}
        >
          <Typography variant="h6" mb={1} color="primary">
            FinFolio Assistant
          </Typography>

          <Box flex={1} overflow="auto" mb={1}>
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                display="flex"
                justifyContent={msg.sender === "user" ? "flex-end" : "flex-start"}
                mb={0.5}
              >
                <Box
                  sx={{
                    maxWidth: "80%",
                    px: 1.5,
                    py: 1,
                    borderRadius: 2,
                    backgroundColor:
                      msg.sender === "user"
                        ? theme.palette.primary.light
                        : theme.palette.success.light,
                    color: theme.palette.getContrastText(
                      msg.sender === "user"
                        ? theme.palette.primary.light
                        : theme.palette.success.light
                    ),
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box display="flex" gap={1}>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <IconButton onClick={handleSend} color="primary">
              <SendIcon />
            </IconButton>
          </Box>

          <Button
            onClick={toggleChat}
            sx={{ mt: 1 }}
            color="error"
            size="small"
            variant="outlined"
          >
            Close
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default ChatBot;

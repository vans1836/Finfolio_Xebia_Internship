const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const yahooFinance = require("yahoo-finance2").default;
const authRouter = require("./routes/auth");
const chatbotRouter = require("./routes/Chatbot");

const app = express(); // ✅ Define `app` first
app.use(cors());
app.use(express.json());

// 🔧 Now mount routes
app.use("/api/auth", authRouter);
app.use("/api/chatbot", chatbotRouter);



//  MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));


//  Auth Routes
app.use("/api/auth", authRouter); // Now /api/auth/signup and /login will work

//  Health check
app.get("/", (req, res) => {
  res.send("Yahoo Finance Proxy is running");
});

//  Single quote route
app.get("/api/quote", async (req, res) => {
  const symbol = req.query.symbol;
  if (!symbol) return res.status(400).json({ error: "Missing symbol" });

  try {
    const result = await yahooFinance.quote(symbol);
    const patched = {
      ...result,
      regularMarketTime: result.regularMarketTime || Math.floor(Date.now() / 1000),
    };
    res.json(patched);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Yahoo Finance quote failed" });
  }
});

//  Multiple quotes route
app.get("/api/quotes", async (req, res) => {
  const symbols = req.query.symbols?.split(",") || [];
  if (!symbols.length) {
    return res.status(400).json({ error: "Missing symbols query" });
  }

  try {
    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const result = await yahooFinance.quote(symbol);
        return {
          symbol,
          ...result,
          regularMarketTime: result.regularMarketTime || Math.floor(Date.now() / 1000),
        };
      })
    );
    res.json(results);
  } catch (err) {
    console.error("Bulk quote fetch failed:", err.message);
    res.status(500).json({ error: "Yahoo Finance bulk fetch failed" });
  }
});

// Backend check route
app.get("/check", (req, res) => {
  res.send("Correct backend is running");
});

const { OpenAI } = require("openai");
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1" // Groq's endpoint
});

app.post("/api/chatbot", async (req, res) => {
  const { message } = req.body;

  try {
    const chatResponse = await groq.chat.completions.create({
      model: "llama3-8b-8192", // or "llama3-70b-8192"
      messages: [
        {
          role: "system",
          content: "You are a friendly and helpful assistant for FinFolio users. Keep answers short, clear, and supportive."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    const botReply = chatResponse.choices[0].message.content;
    res.json({ reply: botReply });

  } catch (error) {
    console.error("Groq API error:", error.message);
    res.status(500).json({ reply: "Sorry, the assistant is having trouble responding right now." });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Proxy running at http://localhost:${PORT}`);
});

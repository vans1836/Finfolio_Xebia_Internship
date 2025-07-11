/* const express = require("express");
const { OpenAI } = require("openai");
require("dotenv").config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful support assistant for a stock dashboard called FinFolio.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = chatResponse.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ error: "OpenAI failed to respond" });
  }
});

module.exports = router;
 */

/* const express = require("express");
const { OpenAI } = require("openai");
require("dotenv").config();

const router = express.Router();

if (!process.env.OPENAI_API_KEY) {
  console.warn("OPENAI_API_KEY is missing from .env file");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/chatbot
router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Valid message is required" });
  }

  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful support assistant for a stock dashboard called FinFolio.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = chatResponse.choices?.[0]?.message?.content;
    if (!reply) {
      throw new Error("No reply from OpenAI");
    }

    res.status(200).json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err.response?.data || err.message || err);
    res.status(500).json({ error: "OpenAI failed to respond" });
  }
});

module.exports = router;
 */

// routes/chatbot.js (for Groq + LLaMA 3)
const express = require("express");
const router = express.Router();
/* const fetch = require("node-fetch"); */
require("dotenv").config();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Valid message is required" });
  }

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          { role: "system", content: "You are a helpful assistant for a stock app called FinFolio." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await groqResponse.json();
    const reply = data.choices?.[0]?.message?.content;

    console.log("LLaMA 3 (Groq) reply:", reply);
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Groq API Error:", err);
    res.status(500).json({ error: "Groq failed to respond" });
  }
});

module.exports = router;

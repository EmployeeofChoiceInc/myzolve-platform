const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
require("dotenv").config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/ai/ask
router.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a compassionate, honest workplace advisor who provides employee-centered guidance on career and HR issues including retaliation, harassment, documentation, and professional next steps.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: "No reply generated." });
    }

    res.status(200).json({ reply });
  } catch (error) {
    console.error("OpenAI API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch AI response." });
  }
});

module.exports = router;

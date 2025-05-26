// server/index.js

const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Environment variables first

const app = express(); // MUST be before any app.use()

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const aiRoutes = require("./routes/ai");
const checkoutRoutes = require("./routes/checkout");

app.use("/api/ai", aiRoutes);
app.use("/api/checkout", checkoutRoutes);

// Root health route
app.get("/", (req, res) => res.send("MyZolve API is up."));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

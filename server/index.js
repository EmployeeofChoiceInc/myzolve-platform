const express = require("express");
const cors = require("cors");

app.use(
  cors({
    origin: "https://myzolve-platform.vercel.app", // <-- This is critical
    methods: ["GET", "POST"],
    credentials: true,
  })
);
const app = express();
const PORT = process.env.PORT || 10000;

require("dotenv").config();
const aiRoutes = require("./routes/ai");
const checkoutRoutes = require("./routes/checkout");

const corsOptions = {
  origin: "https://myzolve-platform.vercel.app", // 👈 your Vercel domain
  methods: ["GET", "POST"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/checkout", checkoutRoutes);

app.get("/", (req, res) => res.send("MyZolve API"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // ← this is the fixconst checkoutRoutes = require("./routes/checkout");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const aiRoutes = require("./routes/ai");
app.use("/api/ai", aiRoutes);
app.use("/api/checkout", checkoutRoutes);

// Root route
app.get("/", (req, res) => res.send("MyZolve API is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
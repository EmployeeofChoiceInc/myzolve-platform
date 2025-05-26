const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 10000;

require("dotenv").config();
const aiRoutes = require("./routes/ai");
const checkoutRoutes = require("./routes/checkout");

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/checkout", checkoutRoutes);

app.get("/", (req, res) => res.send("MyZolve API"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const complaintRoutes =
require("./routes/complaintRoutes");
const feedbackRoutes =
require("./routes/feedbackRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Running");
});

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
const adminRoutes =
require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

app.use("/api/complaints", complaintRoutes);
app.use("/api/feedback", feedbackRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
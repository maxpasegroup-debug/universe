const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// CRITICAL: Railway health check
app.get("/", (req, res) => {
  res.status(200).send("Backend LIVE 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

// SIMPLE AUTH (for now)
app.post("/api/auth/register", (req, res) => {
  res.json({ success: true });
});

app.post("/api/auth/login", (req, res) => {
  res.json({ success: true });
});

// IMPORTANT: use Railway port
const PORT = process.env.PORT || 8080;

// CRITICAL: bind correctly
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
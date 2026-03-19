const express = require("express");

const app = express();

// Root check
app.get("/", (req, res) => {
  res.send("Backend LIVE 🚀");
});

// API test
app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

// IMPORTANT for Railway
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
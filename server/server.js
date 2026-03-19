const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Backend is LIVE ??");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});

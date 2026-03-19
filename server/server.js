const express = require("express");
const cors = require("cors");
require("dotenv").config();

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

const path = require("path");
const authRoutes = require("./routes/authRoutes");
const { router: apiRouter } = require("./routes");
const { errorHandler } = require("./middleware/errorHandlers");

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

app.post("/api/debug", (req, res) => {
  return res.json({
    success: true,
    body: req.body,
  });
});

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

app.get("/health", (req, res) => res.status(200).json({ ok: true }));

const uploadsDir = process.env.UPLOADS_DIR || path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsDir));

// app.use("/api/auth", authRoutes);
// app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log("Server running on port " + PORT);
});

module.exports = app;

const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { router: apiRouter } = require("./routes");
const { errorHandler } = require("./middleware/errorHandlers");

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(express.json({ limit: "2mb" }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/health", (req, res) => res.status(200).json({ ok: true }));

// Static file serving for admin uploads.
const uploadsDir = process.env.UPLOADS_DIR || path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsDir));

app.get("/", (req, res) => {
  res.send("7Universe Backend is Running 🚀");
});

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

module.exports = app;


const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const { requireAuth } = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/requireAdmin");

const {
  listAdminContent,
  createAdminContent,
  updateAdminContent,
  deleteAdminContent,
} = require("../controllers/contentController");
const { getAdminAnalyticsSummary } = require("../controllers/analyticsController");
const { upsertInstructions } = require("../controllers/earnController");

const router = express.Router();

const uploadsDir = process.env.UPLOADS_DIR || path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname || "") || "";
    const safeExt = ext.replace(/[^a-zA-Z0-9.]/g, "");
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

router.get("/analytics/summary", requireAuth, requireAdmin, getAdminAnalyticsSummary);

router.get("/content", requireAuth, requireAdmin, listAdminContent);
router.post("/content", requireAuth, requireAdmin, upload.single("file"), createAdminContent);
router.put("/content/:id", requireAuth, requireAdmin, upload.single("file"), updateAdminContent);
router.delete("/content/:id", requireAuth, requireAdmin, deleteAdminContent);

router.put("/earn/instructions", requireAuth, requireAdmin, upsertInstructions);

module.exports = router;


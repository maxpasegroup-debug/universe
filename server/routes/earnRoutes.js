const express = require("express");
const { getInstructions, upsertInstructions } = require("../controllers/earnController");
const { requireAuth } = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/requireAdmin");

const router = express.Router();

router.get("/instructions", getInstructions);
router.put("/instructions", requireAuth, requireAdmin, upsertInstructions);

module.exports = router;


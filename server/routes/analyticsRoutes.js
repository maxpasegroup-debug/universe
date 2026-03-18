const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const { logAction } = require("../controllers/analyticsController");

const router = express.Router();

router.post("/log", requireAuth, logAction);

module.exports = router;


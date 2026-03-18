const express = require("express");
const { requireAuth } = require("../middleware/authMiddleware");
const { listPublicContent } = require("../controllers/contentController");
const { me } = require("../controllers/authController");

const authRoutes = require("./authRoutes");
const learnRoutes = require("./learnRoutes");
const earnRoutes = require("./earnRoutes");
const analyticsRoutes = require("./analyticsRoutes");
const adminRoutes = require("./adminRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/learn", learnRoutes);
router.use("/earn", earnRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/admin", adminRoutes);

// Protected aliases used by the dashboard frontend.
router.get("/content", requireAuth, listPublicContent);
router.get("/user", requireAuth, me);

module.exports = {
  router,
};


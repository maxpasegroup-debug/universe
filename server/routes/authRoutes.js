const express = require("express");
const { register, login, me } = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");
const { loginLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/register", loginLimiter, register);
router.post("/login", loginLimiter, login);
router.get("/me", requireAuth, me);

module.exports = router;


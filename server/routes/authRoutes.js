const express = require("express");
const { me } = require("../controllers/authController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // TEMP: Skip DB to test API stability
    return res.status(200).json({
      message: "User registered successfully (test mode)",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    return res.status(200).json({
      message: "Login success (test mode)",
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});
router.get("/me", requireAuth, me);

module.exports = router;


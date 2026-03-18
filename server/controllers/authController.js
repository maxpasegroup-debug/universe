const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function signToken(user) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  if (!secret) throw new Error("JWT_SECRET is not configured");

  return jwt.sign(
    {
      userId: user._id.toString(),
      mobile: user.mobile,
      role: user.role,
    },
    secret,
    { expiresIn }
  );
}

function normalizeMobile(mobile) {
  return String(mobile || "").trim();
}

async function register(req, res, next) {
  try {
    const mobile = normalizeMobile(req.body.mobile);
    const password = String(req.body.password || "");

    if (!mobile || mobile.length < 8) {
      return res.status(400).json({ message: "Invalid mobile number" });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ mobile });
    if (existing) {
      return res.status(409).json({ message: "Mobile number already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      mobile,
      password: hashed,
      role: "user",
    });

    const token = signToken(user);
    return res.status(201).json({ token, user: { id: user._id, mobile: user.mobile, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}

async function login(req, res, next) {
  try {
    const mobile = normalizeMobile(req.body.mobile);
    const password = String(req.body.password || "");

    if (!mobile || !password) {
      return res.status(400).json({ message: "Mobile and password are required" });
    }

    const user = await User.findOne({ mobile });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = signToken(user);
    return res.status(200).json({ token, user: { id: user._id, mobile: user.mobile, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}

async function me(req, res, next) {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const user = await User.findById(userId).select("_id mobile role");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user: { id: user._id, mobile: user.mobile, role: user.role } });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  register,
  login,
  me,
};


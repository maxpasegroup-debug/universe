const bcrypt = require("bcrypt");
const User = require("./models/User");

async function seedAdminUser() {
  const adminMobile = process.env.ADMIN_MOBILE || "917591929909";
  const adminPassword = process.env.ADMIN_PASSWORD || "7universe";

  const existing = await User.findOne({ mobile: adminMobile });
  if (existing) {
    if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
    }
    return;
  }

  const hashed = await bcrypt.hash(adminPassword, 10);
  await User.create({
    mobile: adminMobile,
    password: hashed,
    role: "admin",
  });
}

module.exports = {
  seedAdminUser,
};


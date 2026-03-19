const mongoose = require("mongoose");
const { seedAdminUser } = require("./seedAdmin");

require("dotenv").config();

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "change-me";
}

require("./server");

const { MONGO_URI, MONGODB_URI } = process.env;
const resolvedMongo =
  MONGO_URI || MONGODB_URI || "mongodb://localhost:27017/7universe";

async function initDatabase() {
  try {
    await mongoose.connect(resolvedMongo, {
      autoIndex: true,
      serverSelectionTimeoutMS: 10000,
    });
    await seedAdminUser();
    // eslint-disable-next-line no-console
    console.log("MongoDB connected");
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("MongoDB init failed:", err?.message || err);
  }
}

initDatabase();

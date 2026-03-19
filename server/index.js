const mongoose = require("mongoose");
const { seedAdminUser } = require("./seedAdmin");

require("dotenv").config();

const { MONGO_URI, MONGODB_URI } = process.env;

const resolvedMongo =
  MONGO_URI || MONGODB_URI || "mongodb://localhost:27017/7universe";

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "change-me";
}

async function start() {
  await mongoose.connect(resolvedMongo, {
    autoIndex: true,
  });

  await seedAdminUser();

  require("./server");
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", err);
  process.exit(1);
});

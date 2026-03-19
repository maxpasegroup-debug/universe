const mongoose = require("mongoose");
const app = require("./server");
const { seedAdminUser } = require("./seedAdmin");

require("dotenv").config();

const { MONGO_URI, MONGODB_URI } = process.env;

const resolvedMongo =
  MONGO_URI || MONGODB_URI || "mongodb://localhost:27017/7universe";
const resolvedJwtSecret =
  process.env.JWT_SECRET || "change-me";
process.env.JWT_SECRET = resolvedJwtSecret;

async function start() {
  await mongoose.connect(resolvedMongo, {
    autoIndex: true,
  });

  await seedAdminUser();

  app.startServer();
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", err);
  process.exit(1);
});

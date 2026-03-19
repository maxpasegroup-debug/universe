// Temporarily disabled — ensure server starts on Railway first
// const mongoose = require("mongoose");
// const { seedAdminUser } = require("./seedAdmin");
//
// const { MONGO_URI, MONGODB_URI } = process.env;
//
// const resolvedMongo =
//   MONGO_URI || MONGODB_URI || "mongodb://localhost:27017/7universe";
// const resolvedJwtSecret =
//   process.env.JWT_SECRET || "change-me";
// process.env.JWT_SECRET = resolvedJwtSecret;
//
// async function start() {
//   await mongoose.connect(resolvedMongo, {
//     autoIndex: true,
//   });
//
//   await seedAdminUser();
// }
//
// start().catch((err) => {
//   // eslint-disable-next-line no-console
//   console.error("Failed to start server:", err);
//   process.exit(1);
// });

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "change-me";
}

require("./server");

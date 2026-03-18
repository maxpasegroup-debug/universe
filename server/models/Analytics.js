const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    action: { type: String, required: true, index: true },
  },
  { timestamps: { createdAt: "timestamp", updatedAt: false } }
);

module.exports = mongoose.model("Analytics", analyticsSchema);


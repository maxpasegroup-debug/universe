const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["video", "audio", "document"],
      index: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    url: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

module.exports = mongoose.model("Content", contentSchema);


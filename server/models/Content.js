const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    category: String,
    type: String,
    language: String,
    link: String,
    file: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", contentSchema);

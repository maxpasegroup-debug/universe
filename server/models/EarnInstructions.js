const mongoose = require("mongoose");

const earnInstructionsSchema = new mongoose.Schema(
  {
    step1VideoUrl: { type: String, default: "" },
    step2Text: { type: String, default: "" },
    step3ReferralUrl: { type: String, default: "" },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

// Ensure we have at most one document for the Earn page.
earnInstructionsSchema.index({ step3ReferralUrl: 1 });

module.exports = mongoose.model("EarnInstructions", earnInstructionsSchema);


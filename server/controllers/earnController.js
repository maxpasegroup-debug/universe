const EarnInstructions = require("../models/EarnInstructions");

function getDefaultInstructions() {
  return {
    step1VideoUrl: "",
    step2Text:
      "1) Watch the intro video.\n2) Follow the steps carefully.\n3) Use your referral link to start earning.",
    step3ReferralUrl: process.env.REFERRAL_LINK || "https://businesslink.com/referral/ownerlink",
  };
}

async function getInstructions(req, res, next) {
  try {
    const doc = await EarnInstructions.findOne({});
    if (!doc) {
      const defaults = getDefaultInstructions();
      return res.status(200).json({ instructions: defaults });
    }
    return res.status(200).json({ instructions: doc });
  } catch (err) {
    return next(err);
  }
}

async function upsertInstructions(req, res, next) {
  try {
    const { step1VideoUrl, step2Text, step3ReferralUrl } = req.body;

    const filter = {};
    const update = {
      step1VideoUrl: step1VideoUrl ?? "",
      step2Text: step2Text ?? "",
      step3ReferralUrl:
        step3ReferralUrl ?? (process.env.REFERRAL_LINK || "https://businesslink.com/referral/ownerlink"),
    };

    const existing = await EarnInstructions.findOne(filter);
    if (!existing) {
      const created = await EarnInstructions.create(update);
      return res.status(201).json({ instructions: created });
    }

    const updated = await EarnInstructions.findByIdAndUpdate(existing._id, update, { new: true });
    return res.status(200).json({ instructions: updated });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getInstructions,
  upsertInstructions,
};


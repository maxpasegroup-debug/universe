const express = require("express");
const router = express.Router();
const Content = require("../models/Content");

router.get("/", async (req, res) => {
  try {
    const { language } = req.query;

    const data = await Content.find({ language }).sort({ createdAt: 1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/upload", async (req, res) => {
  try {
    const { category, type, language, link, file } = req.body;

    const content = new Content({
      category,
      type,
      language,
      link,
      file,
    });

    await content.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

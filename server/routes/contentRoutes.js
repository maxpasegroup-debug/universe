const express = require("express");
const router = express.Router();
const Content = require("../models/Content");

router.get("/", async (req, res) => {
  try {
    const { language, type } = req.query;
    const filter = {};
    if (language) filter.language = language;
    if (type) filter.type = type;

    const data = await Content.find(filter).sort({ createdAt: 1 });
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

const express = require("express");
const router = express.Router();
const Content = require("../models/Content");
const upload = require("../middleware/upload");

router.get("/", async (req, res) => {
  try {
    const { language } = req.query;

    const data = await Content.find({ language }).sort({ createdAt: 1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { category, type, language, link } = req.body;

    const file = req.file ? req.file.path : null;

    const content = new Content({
      category,
      type,
      language,
      link,
      file,
    });

    await content.save();

    res.json({ success: true, file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

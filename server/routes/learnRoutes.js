const express = require("express");
const { listPublicContent } = require("../controllers/contentController");

const router = express.Router();

router.get("/content", listPublicContent);

module.exports = router;


const path = require("path");
const fs = require("fs");
const Content = require("../models/Content");

function getPublicBaseUrl(req) {
  // Used for generating file URLs after upload.
  if (process.env.PUBLIC_BASE_URL) return process.env.PUBLIC_BASE_URL;
  return `${req.protocol}://${req.get("host")}`;
}

async function listPublicContent(req, res, next) {
  try {
    const type = req.query.type;
    const filter = type ? { type } : {};
    const items = await Content.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ content: items });
  } catch (err) {
    return next(err);
  }
}

async function listAdminContent(req, res, next) {
  try {
    const type = req.query.type;
    const filter = type ? { type } : {};
    const items = await Content.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ content: items });
  } catch (err) {
    return next(err);
  }
}

async function createAdminContent(req, res, next) {
  try {
    const { type, title, description, url } = req.body;
    if (!type || !title) return res.status(400).json({ message: "Missing required fields" });

    let finalUrl = url;
    if (req.file) {
      const publicBaseUrl = getPublicBaseUrl(req);
      finalUrl = `${publicBaseUrl}/uploads/${req.file.filename}`;
    }

    if (!finalUrl) return res.status(400).json({ message: "Provide either url or upload a file" });

    const item = await Content.create({
      type,
      title: String(title),
      description: description ? String(description) : "",
      url: String(finalUrl),
    });

    return res.status(201).json({ content: item });
  } catch (err) {
    return next(err);
  }
}

async function updateAdminContent(req, res, next) {
  try {
    const id = req.params.id;
    const { type, title, description, url } = req.body;

    const existing = await Content.findById(id);
    if (!existing) return res.status(404).json({ message: "Content not found" });

    let finalUrl = url;
    if (req.file) {
      const publicBaseUrl = getPublicBaseUrl(req);
      finalUrl = `${publicBaseUrl}/uploads/${req.file.filename}`;
    }

    const update = {};
    if (type) update.type = type;
    if (title) update.title = String(title);
    if (description !== undefined) update.description = String(description || "");
    if (finalUrl) update.url = String(finalUrl);

    const item = await Content.findByIdAndUpdate(id, update, { new: true });
    return res.status(200).json({ content: item });
  } catch (err) {
    return next(err);
  }
}

async function deleteAdminContent(req, res, next) {
  try {
    const id = req.params.id;
    const existing = await Content.findById(id);
    if (!existing) return res.status(404).json({ message: "Content not found" });

    // Best-effort file cleanup for local uploads (no-op if url is remote).
    if (existing.url && existing.url.includes("/uploads/")) {
      const filename = existing.url.split("/uploads/")[1];
      const uploadsDir = process.env.UPLOADS_DIR || path.join(__dirname, "..", "uploads");
      const filePath = path.join(uploadsDir, filename);
      fs.unlink(filePath, () => {});
    }

    await Content.findByIdAndDelete(id);
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  listPublicContent,
  listAdminContent,
  createAdminContent,
  updateAdminContent,
  deleteAdminContent,
};


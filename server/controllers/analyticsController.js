const Analytics = require("../models/Analytics");
const User = require("../models/User");

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

async function logAction(req, res, next) {
  try {
    const action = String(req.body.action || "").trim();
    if (!action) return res.status(400).json({ message: "Missing action" });
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    await Analytics.create({ userId, action });
    return res.status(201).json({ ok: true });
  } catch (err) {
    return next(err);
  }
}

async function getAdminAnalyticsSummary(req, res, next) {
  try {
    const totalUsers = await User.countDocuments({});
    const totalActions = await Analytics.countDocuments({});

    const days = Number(process.env.ANALYTICS_DAYS || 7);
    const now = new Date();
    const start = new Date(now);
    start.setUTCDate(start.getUTCDate() - (days - 1));
    start.setUTCHours(0, 0, 0, 0);

    const grouped = await User.aggregate([
      { $match: { createdAt: { $gte: start } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const byDate = new Map(grouped.map((g) => [g._id, g.count]));
    const dailyRegistrations = [];
    for (let i = 0; i < days; i++) {
      const d = new Date(start);
      d.setUTCDate(start.getUTCDate() + i);
      const date = toISODate(d);
      dailyRegistrations.push({ date, count: byDate.get(date) || 0 });
    }

    return res.status(200).json({
      totalUsers,
      totalActions,
      dailyRegistrations,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  logAction,
  getAdminAnalyticsSummary,
};


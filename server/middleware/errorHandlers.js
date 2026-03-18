function notFoundHandler(req, res) {
  res.status(404).json({ message: "Not found" });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);
  const status = err.statusCode || err.status || 500;
  res.status(status).json({
    message: err.message || "Server error",
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};


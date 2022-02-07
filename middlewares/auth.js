const apiKeys = Object.keys(process.env)
  .filter((e) => e.includes("API_KEY_"))
  .map((e) => process.env[e]);

module.exports = (req, res, next) => {
  if (!apiKeys.includes(req.headers["api_key"])) {
    res
      .status(403)
      .send({ status: "error", message: "Missing or invalid API_KEY" });
  } else next();
};

const _express = require("express");
const _router = _express.Router();

_router.get("/", (req, res) => {
  res.send("test");
});

module.exports = _router;

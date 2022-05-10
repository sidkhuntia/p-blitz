const express = require("express");
const app = express();


app.get("/", async (req, res) => {
  try {
    res.render("terms");
  } catch {
    res.redirect("/");
  }
});

module.exports = app;
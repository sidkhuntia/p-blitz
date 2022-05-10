const express = require("express");
const app = express();


app.get("/", async (req, res) => {
  try {
    res.render("faq");
  } catch {
    res.redirect("/");
  }
});

module.exports = app;

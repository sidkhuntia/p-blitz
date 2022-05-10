const express = require("express");
const app = express();


app.get("/", async (req, res) => {
  try {
    res.render("aboutus");
  } catch {
    res.redirect("/");
  }
});

module.exports = app;

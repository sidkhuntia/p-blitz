const express = require("express");
const app = express();
const Loan = require("../models/loan");

app.get("/", async (req, res) => {
  let searchOptions = {};
  try {
    const loans = await Loan.find(searchOptions);
    res.render("dashboard", {
      loans: loans,
    });
  } catch {
    res.redirect("/");
  }
});

module.exports = app;

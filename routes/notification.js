const express = require("express");
const app = express();
const Loan = require("../models/loan");
var googleUser = require("../server")


app.get("/", async (req, res) => {
  console.log(googleUser.user);
  let searchOptions = {};
  try {
    const loans = await Loan.find(searchOptions);
    res.render("notification", {
      loans: loans,
      acceptButton : "Accept",
    });
  } catch {
    res.redirect("/");
  }
});

module.exports = app;

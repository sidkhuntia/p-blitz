const express = require("express");
const app = express();
const Loan = require("../models/loan");
var googleUser = require("../server")


app.get("/", async (req, res) => {
  let searchOptions = {};
  console.log(googleUser.user);
  try {
    const loans = await Loan.find(searchOptions);
    res.render("dashboard", {
      loans: loans,
      acceptButton: "Approve/Delete",
      cancelButton: "Cancel",
    });
  } catch {
    res.redirect("/");
  }
});

module.exports = app;

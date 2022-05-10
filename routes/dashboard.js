const express = require("express");
const app = express();
const Loan = require("../models/loan");
var googleUser = require("../server");


const TimeAgo = require("javascript-time-ago");
const en = require("javascript-time-ago/locale/en");
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

app.get("/", async (req, res) => {
  let searchOptions = {};
  try {
    const loans = await Loan.find(searchOptions).sort({createdAt: 'desc'});
    res.render("dashboard", {
      loans: loans,
      showTime: timeAgo,
      acceptButton: "Accept",
      negotiateButton: "Negotiate",
      rejectButton: "Reject",
      userGoogleID: googleUser.user.id,
      googleUser: googleUser,
    });
  } catch {
    res.redirect("/");
  }
});

module.exports = app;

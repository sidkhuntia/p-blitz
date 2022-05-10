const express = require("express");
const app = express();
const Profile = require("../models/profile");
const Loan = require("../models/loan");
const NegotiateLoan = require("../models/negotiateLoans");
var googleUser = require("../server")


app.get("/", async (req, res) => {
  // console.log(googleUser.user);
  let searchOptions = {};
  try {
    const negotiateLoans = await NegotiateLoan.find(searchOptions).sort({createdAt: 'desc'});
    const profiles = await Profile.find();
    // console.log(negotiateLoans);
    res.render("notification", {
      negotiateLoans: negotiateLoans,
      profiles: profiles,
      acceptButton : "Accept",
      rejectButton : "Reject",
      userGoogleID : googleUser.user.id,
    });
  } catch {
    res.redirect("/");
  }
});

module.exports = app;

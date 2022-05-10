const express = require("express");
const app = express();
const Loan = require("../models/loan");
const Profile = require("../models/profile");
const NegotiateLoan = require("../models/negotiateLoans");
const user = require("../server.js");
var googleUser = require("../server");

const TimeAgo = require("javascript-time-ago");
const en = require("javascript-time-ago/locale/en");
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

//author home page
app.get("/", async (req, res) => {
  const creator = await Profile.findOne({
    userGoogleID: googleUser.user.id.toString(),
  });
  // console.log(googleUser.user)
  renderNewPage(res, new Loan());
});

app.post("/", async (req, res) => {
  const creator = await Profile.findOne({
    userGoogleID: googleUser.user.id.toString(),
  });
  const loan = new Loan({
    amount: req.body.amount,
    createdAt: Date.now(),
    creatorEmail: creator.userEmail,
    tenure: req.body.tenure,
    interestRate: req.body.interestRate,
    reason: req.body.reason,
    creatorGoogleID: googleUser.user.id.toString(),
    creatorPhoto : googleUser.user.photos[0].value.toString(),
    creatorCibilScore: creator.cibilScore,
    creatorName: creator.name,
  });
  try {
    const newLoan = await loan.save();
    res.redirect("/dashboard");
  } catch (error) {
    renderNewPage(res, loan, true);
    console.log(error);
  }
});

app.delete("/:id", async (req, res) => {
  let loan, loans, negotiateLoan;
  try {
    loan = await Loan.findById(req.params.id);
    loans = await Loan.find();
    await loan.remove();
    res.redirect("/dashboard");
  } catch (error) {
    if (loan != null) {
      console.log(error);
      res.render("dashboard", {
        loans: loans,
        errorMessage: "Error deleting loan",
        
      });
    } else {
      res.redirect("/dashboard");
    }
  }
});

async function renderNewPage(res, loan, errors = false) {
  renderPage(res, loan, "new", errors);
}

async function renderPage(res, loan, form, errors = false) {
  const creator = await Profile.findOne({
    userGoogleID: googleUser.user.id.toString(),
  });
  try {
    const params = {
      loan: loan,
      showTime: timeAgo,
      user: creator,
    };
    if (errors) {
      if (form === "edit") {
        params.errorMessage = "Error updating loanrequest";
      } else {
        params.errorMessage = "Error creating loanrequest";
      }
    }
    res.render(`loanrequest/${form}`, params);
  } catch {
    if (loan != null) {
      renderPage(res, loan, "edit", true);
    } else {
      res.redirect("/dashbboard");
    }
  }
}

// console.log(calculateCreditScore(10000));

module.exports = app;

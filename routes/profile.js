const express = require("express");
const app = express();
const Profile = require("../models/profile");
var googleUser = require("../server");
console.log(googleUser.user);

function calculateCreditScore(income) {
  let maxLoan = 0.15 * income * 12 * 5;
  let creditScore = 300 + Math.floor((1 / 4500) * maxLoan);

  if (maxLoan > 100000) {
    let x = Math.ceil(maxLoan / 25000);
    maxLoan = 25000 * x;
  } else {
    maxLoan = 100000;
  }

  if (creditScore > 700) creditScore = 700;
  if (maxLoan > 10000000) maxLoan = 10000000;

  let result = {
    creditScore: creditScore,
    maxLoan: 0,
  };
  if (creditScore >= 320) {
    result.maxLoan = maxLoan;
  }
  return result;
}

app.get("/", async (req, res) => {
  // console.log(googleUser.user);
  let searchOptions = {};
  try {
    const profiles = await Profile.find(searchOptions);
    res.render("profile/new", {
      profile: profiles,
    });
  } catch {
    res.redirect("/");
  }
});

app.post("/", async (req, res) => {
  const profile = new Profile({
    name: req.body.name,
    userGoogleID: googleUser.user.id,
    mobileNumber: req.body.mobileNumber,
    age: req.body.age,
    gender: req.body.gender,
    bankName: req.body.bankName,
    bankBranchName: req.body.bankBranchName,
    bankBranchIFSC: req.body.bankBranchIFSC,
    bankAccountNumber: req.body.bankAccountNumber,
    bankAccountholderName: req.body.bankAccountholderName,
    aadharNumber: req.body.aadharNumber,
    panCardNumber: req.body.panCardNumber,
    CTC: req.body.CTC,
    monthlySalary: req.body.monthlySalary,
    cibilScore: calculateCreditScore(req.body.monthlySalary).creditScore,
  });
  try {
    const newProfile = await profile.save();
    res.redirect("/dashboard");
  } catch (error) {
    res.render("profile/new.ejs", {
      errorMessage: "Error creating Profile",
    });
  }
});

module.exports = app;

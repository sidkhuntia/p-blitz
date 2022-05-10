const express = require("express");
const app = express();
const Profile = require("../models/profile");
var googleUser = require("../server");
// console.log(googleUser.user);

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
  // console.log(googleUser.user.id);
  const profile = await Profile.findOne({
    userGoogleID: googleUser.user.id.toString(),
  });
  // console.log(profile);
  if(profile!==null) {
    renderPage(res,profile,"show");
  } else {
    renderNewPage(res, new Profile());
  }

});

app.post("/", async (req, res) => {
  const profile = new Profile({
    name: req.body.name,
    userGoogleID: googleUser.user.id,
    mobileNumber: req.body.mobileNumber,
    age: req.body.age,
    userEmail: req.body.userEmail,
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
    res.redirect("/profile");
  } catch (error) {
    renderNewPage(res, profile, true);
    console.log(error);
  }
});

app.get("/:id/edit", async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    // console.log(loan._id.toString());
    renderPage(res, profile, "edit");
  } catch {
    res.redirect("/dashboard");
  }
});

app.put("/:id", async (req, res) => {
  const negotiator = await Profile.findOne({
    userGoogleID: googleUser.user.id.toString(),
  });
  let profile;
  try {
  profile = await Profile.findById(req.params.id);
  (profile.name= req.body.name),
  (profile.userGoogleID= googleUser.user.id),
  (profile.mobileNumber= req.body.mobileNumber),
  (profile.age= req.body.age),
  (profile.userEmail= req.body.userEmail),
  (profile.gender= req.body.gender),
  (profile.bankName= req.body.bankName),
  (profile.bankBranchName= req.body.bankBranchName),
  (profile.bankBranchIFSC= req.body.bankBranchIFSC),
  (profile.bankAccountNumber= req.body.bankAccountNumber),
  (profile.bankAccountholderName= req.body.bankAccountholderName),
  (profile.aadharNumber= req.body.aadharNumber),
  (profile.panCardNumber= req.body.panCardNumber),
  (profile.CTC= req.body.CTC),
  (profile.monthlySalary= req.body.monthlySalary),
  (profile.cibilScore= calculateCreditScore(req.body.monthlySalary).creditScore),  
  await profile.save();
  res.redirect("/profile");
  } catch {
    if (profile != null) {
      renderPage(res, profile, "edit", true);
    } else {
      
      res.redirect("/dashboard");
    }
  }
});


async function renderNewPage(res, profile, errors = false) {
  renderPage(res, profile, "new", errors);
}

async function renderPage(res, profile, form, errors = false) {
  try {
    const params = {
      profile: profile,
      googleUser: googleUser,
    };
    if (errors) {
      if (form === "edit") {
        params.errorMessage = "Error updating loanrequest";
      } else {
        params.errorMessage = "Error creating loanrequest";
      }
    }
    res.render(`profile/${form}`, params);
  } catch {
    if (loan != null) {
      renderPage(res, loan, "new", true);
    } else {
      res.redirect("/loanrequest");
    }
  }
}


module.exports = app;

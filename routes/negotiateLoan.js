const express = require("express");
const app = express();
const Loan = require("../models/loan");
const Profile = require("../models/profile");
const NegotiateLoan = require("../models/negotiateLoans");
const user = require("../server.js");
var googleUser = require("../server");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user: "p.blitz2022@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
});

const TimeAgo = require("javascript-time-ago");
const en = require("javascript-time-ago/locale/en");
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

app.delete("/:id", async (req, res) => {
  let loan, loans, negotiateLoan;
  try {
    // loan = await Loan.findById(req.params.id);
    negotiateLoan = await NegotiateLoan.findById(req.params.id);
    loans = await Loan.find();
    // await loan.remove();
    await negotiateLoan.remove();
    res.redirect("/notification");
  } catch (error) {
    console.log(error);
    if (loan != null) {
      res.render("dashboard", {
        loans: loans,
        errorMessage: "Error deleting loan",
      });
    } else {
      res.redirect("/dashboard");
    }
  }
});

app.get("/:id/edit", async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    console.log(loan._id.toString());
    renderPage(res, loan, "edit");
  } catch {
    res.redirect("/dashboard");
  }
});

app.put("/:id", async (req, res) => {
  const negotiator = await Profile.findOne({
    userGoogleID: googleUser.user.id.toString(),
  });
  const loan = await Loan.findById(req.params.id);
  const negotiateLoans = new NegotiateLoan({
    loanID: loan._id.toString(),
    amount: loan.amount,
    createdAt: Date.now(),
    tenure: req.body.tenure,
    interestRate: req.body.interestRate,
    reason: req.body.reason,
    creatorGoogleID: loan.creatorGoogleID,
    creatorCibilScore: loan.creatorCibilScore,
    creatorName: loan.creatorName,
    creatorEmail: loan.creatorEmail,
    negotiatorEmail: negotiator.userEmail,
    negotiatorGoogleID: googleUser.user.id.toString(),
    negotiatorPhoto: googleUser.user.photos[0].value.toString(),
    negotiator: negotiator.name,
    modifiedAt: Date.now(),
  });
  try {
    await negotiateLoans.save();
    console.log(loan.creatorEmail)

    const mailData = {
      from: "p.blitz2002@gmail.com", // sender address
      to:  loan.creatorEmail, // list of receivers
      subject: "You have an offer from " + negotiator.name, // Subject line
      html: '<b>Hey there! </b><br> You got an notification. <a href="p-blitz.herokuapp.com">Click Here</a><br/>'
    };

    transporter.sendMail(mailData, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
    res.redirect("/dashboard");
  } catch {
    if (negotiateLoans != null) {
      renderPage(res, negotiateLoans, "edit", true);
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

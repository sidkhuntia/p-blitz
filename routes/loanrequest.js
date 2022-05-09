const express = require("express");
const app = express();
const Loan = require("../models/loan");
const user = require("../server.js");

//author home page
app.get("/", async (req, res) => {
  renderNewPage(res, new Loan());
});

//function to calculate the creditscore
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

app.post("/", async (req, res) => {
  const loan = new Loan({
    amount: req.body.amount,
    tenure: req.body.tenure,
    interestRate: req.body.interestRate,
    reason: req.body.reason,
  });
  try {
    const newLoan = await loan.save();
    res.redirect("/dashboard");
  } catch (error) {
    res.render("loanrequest/new.ejs", {
      errorMessage: "Error creating Loan",
    });
  }
});

app.delete("/:id", async (req, res) => {
  let loan, loans;
  try {
    loan = await Loan.findById(req.params.id);
    loans = await Loan.find();
    await loan.remove();
    res.redirect("/dashboard");
  } catch (error) {
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
    renderPage(res, loan, "edit");
  } catch {
    res.redirect("/dashboard");
  }
});

app.put("/:id", async (req, res) => {
  let loan;
  try {
    loan = await Loan.findById(req.params.id);
    (loan.amount = req.body.amount),
      (loan.tenure = req.body.tenure),
      (loan.interestRate = req.body.interestRate),
      (loan.reason = req.body.reason),
    await loan.save();
    res.redirect("/dashboard");
  } catch {
    if (loan != null) {
      renderPage(res, loan, "edit", true);
    } else {
      res.redirect("/dashboard");
    }
  }
});

async function renderNewPage(res, loan, errors = false) {
  renderPage(res, loan, "new", errors);
}

async function renderPage(res, loan, form, errors = false) {
  try {
    const params = {
      loan: loan,
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

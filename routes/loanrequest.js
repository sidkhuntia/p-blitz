const express = require("express");
const app = express();
const Loan = require("../models/loan");

//author home page
app.get("/", async (req, res) => {
  try {
    res.render("loanrequest/new.ejs");
  } catch {
    res.redirect("/");
  }
});

//function to calculate the creditscore
function calculateCreditScore(income){
  let maxLoan = 0.15*income*12*5
  let creditScore = 300 + Math.floor(1/4500 * maxLoan)
  
  if(maxLoan > 100000){
      let x = Math.ceil(maxLoan/25000)
      maxLoan = 25000*x
  }else{
      maxLoan = 100000
  }
  
  if(creditScore > 700) creditScore = 700
  if(maxLoan > 10000000) maxLoan = 10000000
  
  let result = {
      creditScore: creditScore,
      maxLoan: 0
  }
  if(creditScore >= 320){
      result.maxLoan = maxLoan
  }
  return result
}

app.post("/", async (req, res) => {
  const loan = new Loan({
    name: req.body.name,
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
  let loan,loans;
  try {
    loan = await Loan.findById(req.params.id);
    loans = await Loan.find();
    await loan.remove();
    res.redirect("/dashboard");
  } catch (error) {
    if (loan != null) {
      res.render("dashboard", {
        loans:loans,
        errorMessage: "Error deleting loan",
      });
    } else {
      res.redirect("/dashboard");
    }
  }
});

// console.log(calculateCreditScore(10000));

module.exports = app;

const express = require("express");
const app = express();
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
  console.log(googleUser.user);
  res.render("profile/new");
});

module.exports = app;

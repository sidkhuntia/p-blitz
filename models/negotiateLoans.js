const mongoose = require("mongoose");

const negotiateLoanSchema = new mongoose.Schema({
  loanID: {
    type: String,
    
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  tenure: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
  },
  creatorGoogleID: {
    type: String,
  },
  creatorCibilScore: {
    type: Number,
  },
  creatorName: {
    type: String,
  },
  creatorEmail: {
    type: String,
  },
  negotiatorEmail: {
    type: String,
  },
  
  negotiatorGoogleID: {
    type: String,
  },
  negotiatorPhoto: {
    type: String,
  },
  negotiator: {
    type: String,
  },
  modifiedAt: {
    type: Number,
    default: Date.now(),
  },
});
//create a delete method for the model

module.exports = mongoose.model("Negotiate", negotiateLoanSchema);

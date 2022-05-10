const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
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
  creatorPhoto: {
    type: String,
  },
  creatorCibilScore: {
    type: Number,
    default: 500,
  },
  creatorName: {
    type: String,
  },
  creatorEmail: {
    type: String,
  },
});
//create a delete method for the model

module.exports = mongoose.model("loans", loanSchema);

const mongoose = require("mongoose");

const negotiateLoanSchema = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  tenure: {
    type: Number,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  reason: {
    type: String,
  },
  creatorGoogleID: {
    type: String,
  },
  neogotiator: {
    type: mongoose.Schema.Types.ObjectId,
  },
});
//create a delete method for the model

module.exports = mongoose.model("loans", loanSchema);

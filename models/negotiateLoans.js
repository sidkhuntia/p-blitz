const mongoose = require("mongoose");

const negotiateLoanSchema = new mongoose.Schema({
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
  negotiatorGoogleID: {
    type: String,
  },
  negotiator: {
    type: mongoose.Schema.Types.ObjectId,
  },
  modifiedAt: {
    type: Number,
    default: Date.now(),
  },
});
//create a delete method for the model

module.exports = mongoose.model("Negotiate", negotiateLoanSchema);

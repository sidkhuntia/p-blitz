const mongoose = require("mongoose");
const Loan = require("./loan");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userGoogleID:{
    type: String,
  },
  userEmail: {
    type: String,
  },
  mobileNumber: {
    type: Number,
    required: true,
    // unique: true,
    min: 0,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  gender: {
    type: String,
  },
  cibilScore: {
    type: Number,
    min: 300,
    max: 700,
  },
  bankName: {
    type: String,
    required: true,
  },
  bankBranchName: {
    type: String,
    required: true,
  },
  bankAccountholderName: {
    type: String,
    required: true,
  },
  bankBranchIFSC: {
    type: String,
    required: true,
  },
  bankAccountNumber: {
    type: Number,
    required: true,
    min: 0,
  },
  aadharNumber: {
    type: Number,
    required: true,
    min: 0,
    // unique: true,
  },
  panCardNumber: {
    type: String,
    required: true,
    // unique: true,
    min: 0,
  },
  CTC: {
    type: Number,
    min: 0,
  },
  monthlySalary: {
    type: Number,
    required: true,
    min: 0,
  },
});

module.exports = mongoose.model("User", userSchema);

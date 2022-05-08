const mongoose = require("mongoose");

// const loanSchema = new mongoose.Schema({
//   createDate: {
//     type: Date,
//     default: Date.now,
//     required: true,
//   },
//   interestRate: {
//     type: Number,
//     required: true,
//     min: 0,
//   },
//   tenure: {
//     type: Number,
//     required: true,
//     min : 0,
//   },
//   createdBy : {
//     type: mongoose.Schema.Types.ObjectId,
//     // ref: "Author",
//     required: true,
//   },
//   loanAmount: {
//     type: Number,
//     required: true,
//     min: 0,
//   },
//   creatorCibilScore:{
//     type: Number,
//     min:300,
//     max:700,
//   }
// });

const loanSchema = new mongoose.Schema({
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
    required: true,
  },
});
//create a delete method for the model

module.exports = mongoose.model("loans", loanSchema);

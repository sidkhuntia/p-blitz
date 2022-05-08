const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
  createDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  interestRate: {
    type: Number,
    required: true,
    min: 0,
  },
  tenure: {
    type: Number,
    required: true,
    min : 0,
  },
  createdBy : {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "Author",
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
    min: 0,
  },
});

//create a delete method for the model


module.exports = mongoose.model("loans", bookSchema);

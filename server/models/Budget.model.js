const { Schema, model } = require("mongoose");

// Schema for budget

const budgetSchema = new Schema({
  userOfBudget: { type: Schema.Types.ObjectId, ref: "User" },  
//   budget: { type: Number, required: true },
  item: { type: String,required: true },
  price:{ type: Number,required: true },
  
});

const Budget = model("Budget", budgetSchema);
module.exports = Budget;
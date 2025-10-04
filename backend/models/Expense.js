const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true, min: 1 },
  date: { type: String, required: true }, // YYYY-MM-DD
  note: { type: String, trim: true },
  category: { type: String, default: "Uncategorized" },
});

module.exports = mongoose.model("Expense", ExpenseSchema);

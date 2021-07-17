// import mongoose library
const mongoose = require("mongoose");

// a variable for schema
const Schema = mongoose.Schema;

// Create expenses schema
const ExpenseSchema = new Schema({
  purchased_at: { type: Date, default: Date.now },
  purchased_by: mongoose.ObjectId,
  category: { type: String, required: true },
  item: [
    {
      name: { type: String, required: true },
      number: { type: Number, default: 0 },
      description: String,
      unit_price: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
  ],
  grand_total: { type: Number, default: 0 },
  invoice: String,
});

// Access the collection 'expenses'
const Expenses = mongoose.model('expenses', ExpenseSchema);
// Export it for use
module.exports = Expenses;
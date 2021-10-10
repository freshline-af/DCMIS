// Import expense SCHEMA
const Expenses = require("./models/expenses/Expense");

// Delete an expense based on a specific ID
const expRequest = async (req, res) => {
  await Expenses.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) {
      res.end("an error occured: " + err);
    } else {
      res.end("Expense removed!");
    }
  });
}
// Export it anywhere to be used.
module.exports = expRequest;
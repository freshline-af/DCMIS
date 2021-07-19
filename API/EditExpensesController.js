// Import expense SCHEMA
const Expenses = require("./models/expenses/Expense");

const expRequest = async (req, res) => {
  await Expenses.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    (err, result) => {
      if (err) {
        res.end("an error occured: " + err);
      } else {
        res.end("Expense updated!");
      }
    }
  );
}
// Export it anywhere to be used.
module.exports = expRequest;
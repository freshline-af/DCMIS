// Import expense SCHEMA
const Expenses = require('./models/expenses/Expense');

// Request for expenses
const expRequest = async (req, res) => {
    // Retrieve expenses
    const expenses = await Expenses.find().sort('-purchased_at');
    // Send the response where it is called.
    res.send(expenses);
}
// Export it 
module.exports = expRequest;

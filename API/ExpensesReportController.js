// import expense module
const Expense = require("./models/expenses/Expense");

// Request
const expRequest = async (req, res) => {
  // Fetch number of days
  let days = req.body.numOfDays;
  // calculate the date
  let d = new Date();
  // frequency can be daily, weekly, monthly and annually
  var rptFrequency = d.setDate(d.getDate() - parseInt(days));
  // return report data based on a specific frequency
  const reportData = await Expense.aggregate([
    { $match: { purchased_at: { $gt: new Date(rptFrequency) } } },
  ]);
  if (reportData.length > 0 ) {
    res.json(reportData);
  } else {
    res.json('No data found for this report.');
  }
};
module.exports = expRequest;

// Import expense module
const Expense = require('../API/models/expenses/Expense');
const path = require('path');

const expenseRequest = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.end("No invoice chosen.");
  } else {
    let invoice = req.files.expInvoice;
    let imgTypes = path.extname(invoice.name).toLowerCase();
     if (
       imgTypes !== ".jpg" &&
       imgTypes !== ".jpeg" &&
       imgTypes !== ".png"
     ) {
       res.end("Please choose an invoice of type .jpg, .jpeg or .png.");
     } else {
       invoice.mv(
         path.resolve(__dirname, "../public/uploads/docs/invoice/", invoice.name),
         async (err) => {
           if (err) {
             throw err;
           } else {
               await Expense.updateOne(
               { _id: req.params.id },
               {
                 $set: { invoice: invoice.name },
               }
             );
             res.end("Invoice uploaded.");
           }
         }
       );
     }
  }
};

// export it to be used anywhere
module.exports = expenseRequest;

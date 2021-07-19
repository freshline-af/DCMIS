// Import expense SCHEMA
const Expenses = require("./models/expenses/Expense");

// Request for expenses
const expRequest = async (req, res) => {
  // Fetch any field value
  var _purchasedDate = req.body.purchased_at;
  var _purchasedBy = req.body.purchased_by;
  var _category = req.body.category;
  let i = 0;
  var _itemName = '';
  var _numOfItem = 0;
  var _itemDesc = '';
  var _unitPrice = 0;
  var _totalPrice = 0;
  var _grandTotal = 0;
 
  var itemArrayOfObj = req.body.item;
  var newArray = [];
  

  for (i = 0; i < itemArrayOfObj.length; i++) {
    // Declare an empty object
     var itemObj = {};
    // Fetch any object property
      _itemName = itemArrayOfObj[i].name;
      _numOfItem = itemArrayOfObj[i].number;
      _itemDesc = itemArrayOfObj[i].description;
      _unitPrice = itemArrayOfObj[i].unit_price;
      _totalPrice = _unitPrice * _numOfItem;
      _grandTotal += _totalPrice;
    // Assign them into the object
      itemObj["name"] = _itemName;
      itemObj["number"] = _numOfItem;
      itemObj["description"] = _itemDesc;
      itemObj["unit_price"] = _unitPrice;
      itemObj["total"] = _totalPrice;
    // Add the object into the newly declared array
      newArray.push(itemObj);
    
  }
  
  // Insert the values in above
  await Expenses.create(
    {
      purchased_at: _purchasedDate,
      purchased_by: _purchasedBy,
      category: _category,
      grand_total: _grandTotal,
      item: newArray
    },
    (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json("Expense created!");
      }
    }
  );
};
// Export this file for using anywhere.
module.exports = expRequest;

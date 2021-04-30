const staffSchema = require('../API/models/Staff');
// View page staff
const newStaff = async (req, res) => {
   await staffSchema.create(req.body, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })
  // if (inserted) {
  //   res.json(staffSchema.find({})); 
  // } else {
  //   res.json("Staff not inserted!");
  // }

}

module.exports = newStaff;
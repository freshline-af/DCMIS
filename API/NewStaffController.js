const staffSchema = require('../API/models/Staff');
// View page staff
const newStaff = async (req, res) => {
   await staffSchema.create(req.body, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Staff added!");
    }
  })
}
// Export this file for using anywhere.
module.exports = newStaff;
const staffSchema = require('../API/models/staff/Staff');
// View page staff
const staffRequest = async (req, res) => {
   await staffSchema.create(req.body, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Staff added!");
    }
  })
}
// Export this file for using anywhere.
module.exports = staffRequest;
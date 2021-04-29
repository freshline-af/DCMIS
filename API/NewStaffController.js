<<<<<<< HEAD
// View page staff
const newStaff = (req, res) => {
  res.render("staff");
=======
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

>>>>>>> 5fb28ddbb769a63b0a87cfe7548b88bc43af508f
}

module.exports = newStaff;
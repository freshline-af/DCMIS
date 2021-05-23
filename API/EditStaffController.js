// import staff schema
const staffSchema = require('../API/models/Staff');
const editAStaff = async (req, res) => {
  await staffSchema.updateOne(
    { _id: req.params.id },
    {
      $set: req.body
    },
    (err, result) => {
      if (err) {
        res.end("an error occured: " + err);
      } else {
        res.end("Staff updated!");
      }
    }
  );
}
// Export it anywhere to be used.
module.exports = editAStaff;
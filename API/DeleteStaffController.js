// import staff schema
const staffSchema = require('./models/staff/Staff');
// Delete a staff based on a specific ID
const deleteStaff = async (req, res) => {
  await staffSchema.remove(
    { _id: req.params.id },
    (err, result) => {
      if (err) {
        res.end("an error occured: " + err);
      } else {
        res.end("Staff removed!");
      }
    }
  );
}
// Export it anywhere to be used.
module.exports = deleteStaff;
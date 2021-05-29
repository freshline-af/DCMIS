// import patient schema
const patientSchema = require('./models/Patient');
const editAPient = async (req, res) => {
  await patientSchema.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    (err, result) => {
      if (err) {
        res.end("an error occured: " + err);
      } else {
        res.end("Patient updated!");
      }
    }
  );
}
// Export it anywhere to be used.
module.exports = editAPient;
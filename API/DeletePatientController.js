// import patient schema
const patientSchema = require('./models/patients/TeethFillingModel');
// Delete a patient based on a specific ID
const deletePatient = async (req, res) => {
  await patientSchema.remove(
    { _id: req.params.id },
    (err, result) => {
      if (err) {
        res.end("an error occured: " + err);
      } else {
        res.end("Patient deleted!");
      }
    }
  );
}
// Export it anywhere to be used.
module.exports = deletePatient;
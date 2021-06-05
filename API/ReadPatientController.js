const Patient = require('../API/models/Patient');
const patientsController = async (req, res) => {
  const patients = await Patient.find({}).sort('-registered_at');
  // res.json(patients);
  res.send(patients);
}

module.exports = patientsController;



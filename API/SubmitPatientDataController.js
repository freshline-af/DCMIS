/* ------------------------- Submit Patient Form Data ------------------- */

// import patient model
const Patient = require('../API/models/Patient');

// Insert patient data and redirect back to home page
const patientFormData = async (req, res) => {
    await Patient.create(req.body);
    res.redirect('/');
}

module.exports = patientFormData;

// import patient model
const patientSchema = require('./models/Patient');

// Insert a patient
const insertPatient = async (req, res) => {
    await patientSchema.create(req.body, (err, result) => {
        if (err) {
            res.end('Some error occured: ' + err);
        } else {
            res.end('Patient added!');
        }
    });
}

module.exports = insertPatient;

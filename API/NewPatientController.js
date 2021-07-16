/* ------------------ 9 data models for patient services --------------------- */
const TeethFilling
/* ------------------/. 9 data models for patient services --------------------- */


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

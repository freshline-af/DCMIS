/* ------------------ 9 data models for patient services --------------------- */
const TeethFilling = require('./models/patients/TeethFillingModel');
const TeethRemove = require('./models/patients/TeethRemoveModel');
const TeethCover = require('./models/patients/TeethCoverModel');
const TeethProtice = require('./models/patients/TeethProticeModel');
const TeethBleaching = require('./models/patients/TeethBleachingModel');
const TeethScaling = require('./models/patients/TeethScalingModel');
const GumSurgery = require('./models/patients/GumSurgeryModel');
const RootSurgery = require('./models/patients/RootSurgeryModel');
const Orthodoncy = require('./models/patients/OrthodoncyModel');
/* ------------------/. 9 data models for patient services --------------------- */

const patientsController = async (req, res) => {
  const stag = 1;
  let patient = "";
  switch (stag) {
    case 2:
      patient = TeethCover;
      break;
    case 3:
      patient = Orthodoncy;
      break;
    case 4:
      patient = TeethRemove;
      break;
    case 5:
      patient = GumSurgery;
      break;
    case 6:
      patient = RootSurgery;
      break;
    case 7:
      patient = TeethProtice;
      break;
    case 8:
      patient = TeethBleaching;
      break;
    case 9:
      patient = TeethScaling;
      break;
    default:
      patient = TeethFilling;
      break;
  }

  const patients = await patient.find({ "appointment.stag": 8});
  // res.json(patients);
  res.send(patients);
}

module.exports = patientsController;



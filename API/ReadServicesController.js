/* ------------------ 9 data models for patient services --------------------- */
const TeethFilling = require("./models/patients/TeethFillingModel");
const TeethRemove = require("./models/patients/TeethRemoveModel");
const TeethCover = require("./models/patients/TeethCoverModel");
const TeethProtice = require("./models/patients/TeethProticeModel");
const TeethBleaching = require("./models/patients/TeethBleachingModel");
const TeethScaling = require("./models/patients/TeethScalingModel");
const GumSurgery = require("./models/patients/GumSurgeryModel");
const RootSurgery = require("./models/patients/RootSurgeryModel");
const Orthodoncy = require("./models/patients/OrthodoncyModel");
/* ------------------/. 9 data models for patient services --------------------- */

const patientsServices = async (req, res) => {
  const serviceTag = parseInt(req.params.stag);
  let service = "";
  if (serviceTag === 1) {
    service = TeethFilling;
  } else if (serviceTag === 2) {
    service = TeethCover;
  } else if (serviceTag === 3) {
    service = Orthodoncy;
  } else if (serviceTag === 4) {
    service = TeethRemove;
  } else if (serviceTag === 5) {
    service = GumSurgery;
  } else if (serviceTag === 6) {
    service = RootSurgery;
  } else if (serviceTag === 7) {
    service = TeethProtice;
  } else if (serviceTag === 8) {
    service = TeethBleaching;
  } else if (serviceTag === 9) {
    service = TeethScaling;
  } else {
    service = "Sorry, this service not existing.";
  }
  /* switch (serviceTag) {
    case 2:
      service = TeethCover;
      break;
    case 3:
      service = Orthodoncy;
      break;
    case 4:
      service = TeethRemove;
      break;
    case 5:
      service = GumSurgery;
      break;
    case 6:
      service = RootSurgery;
      break;
    case 7:
      service = TeethProtice;
      break;
    case 8:
      service = TeethBleaching;
      break;
    case 9:
      service = TeethScaling;
      break;
    default:
      service = TeethFilling;
      break;
  } */

  const patientService = await service.find({});
  // res.json(patients);
  res.send(patientService);
};

module.exports = patientsServices;

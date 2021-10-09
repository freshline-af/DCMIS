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
const MouthTesting = require("./models/patients/MouthTestingModel");
/* ------------------/. 9 data models for patient services --------------------- */

const serviceRequest = async (req, res) => {
  const specificService = parseInt(req.params.stag);
  let service = {};
  switch (specificService) {
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
    case 10:
      service = MouthTesting;
      break;
    default:
      service = TeethFilling;
      break;
  }

  const patients = await service
    .aggregate([
      {
        $match: {
          "appointment.stag": {
            $in: [specificService],
          },
        },
      },
    ])
    .sort("-registered_at");
  res.send(patients);
};

module.exports = serviceRequest;

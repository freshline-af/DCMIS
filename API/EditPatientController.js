/* ------------------ 10 data models for patient services --------------------- */
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
/* ------------------/. 10 data models for patient services --------------------- */

const editAPient = async (req, res) => {
  let apptArrayOfObj = req.body.appointment;
  let patient = "";
  for (let a = 0; a < apptArrayOfObj.length; a++) {
    const stag = apptArrayOfObj[a].stag;
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
      case 10:
        patient = MouthTesting;
        break;
      default:
        patient = TeethFilling;
        break;
    }
    // Update the patient
    await patient.updateMany(
      { _id: req.params.id },
      {
        $set: req.body
      },
      (err, result) => {
        if (err) {
          res.end("an error occured: " + err);
        } else if (result) {
          res.end("Patient updated!");
        } else {
          res.end("Sorry, the patient not updated.");
        }
      }
    );
  }
};
// Export it anywhere to be used.
module.exports = editAPient;

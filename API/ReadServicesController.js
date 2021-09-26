const patientsServices = async (req, res) => {
  // Firstly, fetch the service tag of a service through request.
  const serviceTag = parseInt(req.params.stag);
  // Declare a empty object to assign any service model.
  let pModel = {};
  if (serviceTag === 1) {
    pModel = require("./models/patients/TeethFillingModel");
  } else if (serviceTag === 2) {
    pModel = require("./models/patients/TeethCoverModel");
  } else if (serviceTag === 3) {
    pModel = require("./models/patients/OrthodoncyModel");
  } else if (serviceTag === 4) {
    pModel = require("./models/patients/TeethRemoveModel");
  } else if (serviceTag === 5) {
    pModel = require("./models/patients/GumSurgeryModel");
  } else if (serviceTag === 6) {
    pModel = require("./models/patients/RootSurgeryModel");
  } else if (serviceTag === 7) {
    pModel = require("./models/patients/TeethProticeModel");
  } else if (serviceTag === 8) {
    pModel = require("./models/patients/TeethBleachingModel");
  } else if (serviceTag === 9) {
    pModel = require("./models/patients/TeethScalingModel");
  } else {
    pModel = "Unavailable";
  }

  // Set a message if the service tag coming through request doesn't match
  if (pModel === "Unavailable") {
    res.end("Sorry, this service is not available.");
  } else {
    const patientService = await pModel.aggregate([
      {
        $match: {
          "appointment.stag": serviceTag,
        },
      },
    ]);
    // This service is included but currently has no data.
    if (patientService.length < 1) {
      res.end("No data found.");
    } else {
      // res.send(...) = res.json(...) in here.
      res.send(patientService);
    }
  }
};

module.exports = patientsServices;

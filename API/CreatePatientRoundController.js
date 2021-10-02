const pRoundRequest = async (req, res) => {
  // Firstly, fetch patient id of a service through request.
  const _patientId = req.params.pid;
  const serviceTag = parseInt(req.params.stag);
  // Declare an empty object to assign any service model.
  let pModel = {};
  let seeDrFor = "";
  
  // Declare the service based on the stag coming through request parameter.
  if (serviceTag === 1) {
    pModel = require("./models/patients/TeethFillingModel");
    seeDrFor = "teeth_filling";
  } else if (serviceTag === 2) {
    pModel = require("./models/patients/TeethCoverModel");
    seeDrFor = "teeth_cover";
  } else if (serviceTag === 3) {
    pModel = require("./models/patients/OrthodoncyModel");
    seeDrFor = "orthodoncy";
  } else if (serviceTag === 4) {
    pModel = require("./models/patients/TeethRemoveModel");
    seeDrFor = "teeth_remove";
  } else if (serviceTag === 5) {
    pModel = require("./models/patients/GumSurgeryModel");
    seeDrFor = "gum_surgery";
  } else if (serviceTag === 6) {
    pModel = require("./models/patients/RootSurgeryModel");
    seeDrFor = "root_surgery";
  } else if (serviceTag === 7) {
    pModel = require("./models/patients/TeethProticeModel");
    seeDrFor = "teeth_protice";
  } else if (serviceTag === 8) {
    pModel = require("./models/patients/TeethBleachingModel");
    seeDrFor = "teeth_bleaching";
  } else if (serviceTag === 9) {
    pModel = require("./models/patients/TeethScalingModel");
    seeDrFor = "scaling";
  } else {
    pModel = "Unavailable";
  }

  // Set a message if the service tag coming through request doesn't match
  if (pModel === "Unavailable") {
    res.end("Sorry, this service is not available.");
  } else {
    await pModel.updateOne(
      {
        _id: _patientId,
        "appointment.stag": serviceTag,
      },
      {
        $addToSet: {
          [`appointment.$.${seeDrFor}`]: req.body,
        },
      },
      (err, result) => {
        if (err) {
          res.end("Some error occured: " + err);
        } else if (result) {
          res.end("New round added.");
        } else {
          res.end("Sorry, cannot add the new round.");
        }
      }
    );
  }
};

module.exports = pRoundRequest;

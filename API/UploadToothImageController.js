// Import orthodoncy module
const Orthodoncy = require("./models/patients/OrthodoncyModel");
const path = require("path");

const orthodoncyRequest = async (req, res) => {
  let _patientId = req.params.pid;
  let _round = req.body.round;

  if (!req.files || Object.keys(req.files).length === 0) {
    res.end("No image selected.");
  } else {
    let toothImgObj = req.files.toothImage;
    let imgTypes = path.extname(toothImgObj.name).toLowerCase();
    if (imgTypes !== ".jpg" && imgTypes !== ".jpeg" && imgTypes !== ".png") {
      res.end("Please choose an image of type .jpg, .jpeg or .png.");
    } else {
      toothImgObj.mv(
        path.resolve(
          __dirname,
          "../public/uploads/docs/teeth/",
          toothImgObj.name
        ),
        async (err) => {
          if (err) {
            throw err;
          } else {
            await Orthodoncy.updateOne(
              {
                _id: _patientId,
                "appointment.stag": 3,
                "appointment.orthodoncy.round": _round
              },
              {
                $set: {
                  "appointment.$[].orthodoncy.$[].image": toothImgObj.name
                },
              },
              (err, result) => {
                if (err) {
                  res.end("Some error occured: " + err);
                } else if (result) {
                  res.end("Tooth image uploaded.");
                } else {
                  res.end("Sorry, cannot upload the tooth image.");
                }
              }
            );
          }
        }
      );
    }
  }
};

// export it to be used anywhere
module.exports = orthodoncyRequest;

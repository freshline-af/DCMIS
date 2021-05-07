// Import staff schema
const staffSchema = require("../API/models/Staff");
// Import multer module to upload files
const multer = require("multer");
// Import path
const path = require("path");
const fs = require('fs');

// Upload Image
/* ---------------------- CUSTOM Middleware ----------------------- */
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads/docs/photo");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

  var upload = multer({ storage: storage });
  upload.single("img"), (req, res, next) => {
    var obj = {
      _id: req.params.id,
      photo: {
        data: fs.readFileSync(
          path.join(__dirname + "../uploads/docs/photo" + req.file.filename)
        ),
        contentType: "multipart/form-data",
      },
    };
    staffSchema.updateOne({_id: req.params.id}, {photo: 'sss'}, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        // item.save();
        res.json("Uploaded");
      }
    });
  }
/* ----------------------/. CUSTOM Middleware ----------------------- */
// Export it to be used
module.exports = storage;

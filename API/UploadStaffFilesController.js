// Import staff schema
const staffSchema = require("./models/Staff");
// Import multer module to upload files
const multer = require("multer");
// Import path
const path = require("path");
const fs = require('fs');

const uploadedFile = (req, res) => {
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

    function(req, res) {
upload(req,res,function(err) {
    if(err) {
        return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
});
}

}





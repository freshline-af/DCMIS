const staffSchema = require("./models/staff/Staff");
const bcrypt = require("bcryptjs");

var staffId = "";
var staffPassword = "";

const UpdateStaffPwd = (req, res) => {
  staffId = req.params.id;
  staffPassword = req.body.password;
  // hash password
  bcrypt.genSalt(10, function(saltError, salt) {
    if (saltError) {
      throw saltError;
    } else {
      bcrypt.hash(req.body.password, salt, function(hashError, hash) {
        if (hashError) {
          throw hashError;
        } else {
          staffPassword = hash;
          // res.json({staffId, staffPassword})
          staffSchema.findOneAndUpdate(
           { _id: staffId },
           {password: staffPassword},
          function (err, s) {
            res.json(s);
          }
         );
        }
      });
    }
  });
};

module.exports = UpdateStaffPwd;

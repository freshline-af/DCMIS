// Import staff schema to be able query staff collection
const staffSchema = require("../API/models/Staff");
// Import this module to hash password
const bcrypt = require("bcryptjs");

// fetch username & password to very them into db.staff whether they are existing
const StaffCredentials = async (req, res) => {
  await staffSchema.findOne(
    {
      username: req.body.username,
    },
    function(err, staff) {
      if (err) throw err;
      if (staff) {
        bcrypt.compare(req.body.password, staff.password, function(
          err,
          result
        ) {
          if (err) {
            throw err;
          } else {
            if (result) {
              res.json("Success");
            } else {
              res.json("Fail");
            }
          }
        });
      } else {
        res.json("Please first sign up into the system and then try again.");
      }
    }
  );
};

// export it to be able to use
module.exports = StaffCredentials;

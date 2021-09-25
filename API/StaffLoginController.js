// Import staff schema to be able query staff collection
const staffSchema = require("../API/models/staff/Staff");
// Import this module to hash password
const bcrypt = require("bcryptjs");

// fetch username & password to varify them into db.staff whether they are existing
const StaffCredentials = async (req, res) => {
  let resultSet = await staffSchema.findOne(
    {
      username: req.body.username,
    },
    // Do not quer username & password (password query is disabled into the model by "select: false")
    {
      username: 0
    },
    function(err, staff) {
      if (err) throw err;
      if (staff) {
        bcrypt.compare(req.body.password.toString(), staff.password, function(
          err,
          result
        ) {
          if (err) {
            throw err;
          } else {
            if (result) {
              res.json(resultSet);
            } else {
              res.json("Fail");
            }
          }
        });
      } else {
        res.json("Please first sign up into the system and then try again.");
      }
    }
    // .select('+password') is to not bring password in retrieve but first "select: false" should be added into the model
  ).select('+password');
};

// export it to be able to use
module.exports = StaffCredentials;

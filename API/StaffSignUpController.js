const staffSchema = require("./models/staff/Staff");
const bcrypt = require("bcryptjs");

// Declare variables for three paramaters.
var staffId = "";
var staffUName = "";
var staffPassword = "";

const signUpRequest = (req, res) => {
  staffId = req.params.id;
  staffUName = req.body.staffUname;

  // hash password
  bcrypt.genSalt(10, function(saltError, salt) {
    if (saltError) {
      throw saltError;
    } else {
      bcrypt.hash(req.body.staffPwd, salt, function(hashError, hash) {
        if (hashError) {
          throw hashError;
        } else {
          staffPassword = hash;
          // res.json({staffId, staffPassword})
          staffSchema.findOneAndUpdate(
            { _id: staffId },
            { username: staffUName, password: staffPassword },
            function(err, s) {
                if (err) {
                    throw err
                } else if (s) {
                    res.end('Sign up done!');
                } else {
                    res.end('Sign up failed.');
                }
            }
          );
        }
      });
    }
  });
};

module.exports = signUpRequest;

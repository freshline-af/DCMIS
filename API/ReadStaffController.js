/* ----------------------------- Retrieve Staff -------------------- */
// import model
<<<<<<< HEAD
const Staff = require('../API/models/Staff');
=======
const Staff = require('./models/Staff');
>>>>>>> 5fb28ddbb769a63b0a87cfe7548b88bc43af508f
const staffAll = async (req, res) => {
    const staff = await Staff.find();
    res.json(staff);
    // res.send(staff);
}
// Export staffRequest for global use
module.exports = staffAll;
/* -----------------------------/. Retrieve Staff -------------------- */
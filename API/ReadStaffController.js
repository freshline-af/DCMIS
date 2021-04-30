/* ----------------------------- Retrieve Staff -------------------- */
// import model
const Staff = require('./models/Staff');
const staffAll = async (req, res) => {
    const staff = await Staff.find();
    res.json(staff);
    // res.send(staff);
}
// Export staffRequest for global use
module.exports = staffAll;
/* -----------------------------/. Retrieve Staff -------------------- */
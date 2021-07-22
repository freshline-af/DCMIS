/* ----------------------------- Retrieve Staff -------------------- */
// import model
const Staff = require('./models/staff/Staff');
const staffAll = async (req, res) => {
    const staff = await Staff.find().sort('-hired_at');
    res.json(staff);
    // res.send(staff);
}
// Export staffRequest for global use
module.exports = staffAll;
/* -----------------------------/. Retrieve Staff -------------------- */
/* ---------------------------------- Get a specific by ID ----------------------- */
// import Staff module
const Staff = require('../API/models/Staff');
const SpecificStaff = async (req, res) => {
    const staff = await Staff.findById(req.params.id);
    res.render('staff', {
        staff
    });

}

module.exports = SpecificStaff;
/* ---------------------------------- Get a specific by ID ----------------------- */
// import Staff module
const Staff = require('../API/models/staff/Staff');
const SpecificStaff = async (req, res) => {
    const staff = await Staff.find({'cli_equip.name':'Chair'}, {'cli_equip.$':1});
    res.json(staff);

}

module.exports = SpecificStaff;
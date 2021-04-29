/* ---------------------------------- Get a specific by ID ----------------------- */
// import Staff module
const Staff = require('../API/models/Staff');
const SpecificStaff = async (req, res) => {
<<<<<<< HEAD
    const staff = await Staff.findById(req.params.id);
    res.render('staff', {
        staff
    });
=======
    const staff = await Staff.find({'cli_equip.name':'Chair'}, {'cli_equip.$':1});
    res.json(staff);
>>>>>>> 5fb28ddbb769a63b0a87cfe7548b88bc43af508f

}

module.exports = SpecificStaff;
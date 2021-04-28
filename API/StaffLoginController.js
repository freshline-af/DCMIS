const staffSchema = require('../API/models/Staff');

// fetch username & password to very them into db.staff whether they are existing
const StaffCredentials = async (req, res) => {
    const found = await staffSchema.findOne(req.body);
    if (found) {
        res.json(found)
    } else {
        res.json('Sorry, username or password wrong!');
    }
}
// export it to be able to use
module.exports = StaffCredentials;


const mongoose = require("mongoose");
// import moment-timezone
const momentTZ = require('moment-timezone');
// Set timezone for Kabul
const dateKabul = momentTZ.tz(Date.now(), "Asia/Kabul");
const Schema = mongoose.Schema;
const StaffSchema = new Schema(
  {
    username: String,
    password: { type: String, select: false},
    role: String,
    firstname: { type: String, required: true },
    lastname: String,
    fathername: { type: String, required: true },
    tazkira_id: { type: String, required: true, min: 15 },
    address: { type: String, required: true },
    edu_level: { type: String, required: true },
    edu_start_date: { type: Date, default: Date.now },
    edu_end_date: { type: Date, default: Date.now },
    edu_university: { type: String, required: true },
    edu_field: { type: String, required: true },
    position: { type: String, required: true },
    hired_at: { type: Date, default: Date.now },
    salary: Number,
    contract: String,
    edu_docs: String,
    tazkira_copy: String,
    photo: String,
    phone1: { type: String, required: true, min: 10, max: 12 },
    phone2: { type: String, required: false, min: 10, max: 12 }
    // the second parameter forces mongodb to not pluralize staff automatically
  },
  { collection: "staff" }
);
// access the database collection
const staff = mongoose.model("staff", StaffSchema);
// export it to be use later
module.exports = staff

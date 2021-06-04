const mongoose = require("mongoose");
// Import Timezone module
const momentTZ = require('moment-timezone');
// Set timezone for Kabul
const dateKabul = momentTZ.tz(Date.now(), "Asia/Kabul");

const Schema = mongoose.Schema;
const PatientSchema = new Schema({
  firstname: String,
  lastname: String,
  fathername: String,
  tazkira_id: String,
  occupation: String,
  age: Number,
  fee: Array,
  blood_group: String,
  marital_status: String,
  case_history: Array,
  disease: String,
  installments: String,
  registered_at: { type: Date, default: dateKabul},
  phone: String,
  appointment: {
    round: Number,
    meet_date: { type: Date, default: dateKabul},
    description: String
  },
  address: String,
  sex: String,
});
// access the database collection
const patient = mongoose.model('patient', PatientSchema);
// export it to be use later
module.exports = patient

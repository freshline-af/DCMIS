const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PatientSchema = new Schema({
  firstname: String,
  lastname: String,
  fathername: String,
  tazkira_id: Number,
  occupation: String,
  age: Number,
  fee: String,
  blood_group: String,
  marital_status: String,
  disease: String,
  registered_at: Date,
  phone: String,
  appointment: {
    round: Number,
    meet_date: Date,
  },
  address: String,
  sex: String,
});
// access the database collection
const patient = mongoose.model('patient', PatientSchema);
// export it to be use later
module.exports = patient

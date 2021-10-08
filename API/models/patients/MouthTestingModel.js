const mongoose = require("mongoose");
// Import Timezone module
const momentTZ = require("moment-timezone");
// Set timezone for Kabul
const dateKabul = momentTZ.tz(Date.now(), "Asia/Kabul");
// Declare a variable for schema
const Schema = mongoose.Schema;

// Appointment for teeth surgery
const pMouthTestingSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: String,
  fathername: { type: String, required: true },
  tazkira_id: { type: String, required: true, min: 15 },
  occupation: { type: String, required: true },
  age: { type: Number, required: true },
  blood_group: String,
  marital_status: { type: String, required: true },
  case_history: [{ _id: false, disease: String, result: Boolean }],
  registered_at: { type: Date, default: dateKabul },
  phone: { type: String, required: true },
  address: String,
  sex: { type: String, required: true },
  photo: String,
  appointment: [
    {
      _id: false,
      stag: Number,
      mouth_testing: [
        {
          _id: false,
          meet_at: {
            type: Date,
            default: Date.now,
          },
          round: {
            type: Number,
            min: 1,
            max: 5,
            default: 1,
          },
          description: String,
          fee: {
            installment: { type: Number, min: 1, max: 3 },
            amount_received: { type: Number, default: 0 },
            amount_due: { type: Number, default: 0 },
            dentist: mongoose.ObjectId,
          },
          grand_total: { type: Number, default: 0 },
        },
      ],
    },
  ],
});
// access the database collection
const pMouthTesting = mongoose.model("pMouthTesting", pMouthTestingSchema, "patients");
// export it to be use later
module.exports = pMouthTesting;

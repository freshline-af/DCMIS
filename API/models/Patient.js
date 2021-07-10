const mongoose = require("mongoose");
// Import Timezone module
const momentTZ = require('moment-timezone');
// Set timezone for Kabul
const dateKabul = momentTZ.tz(Date.now(), "Asia/Kabul");
// Declare a variable for schema
const Schema = mongoose.Schema;

/* --------------------- Services for patient ---------------------- */
var enumValue = 1;
var service = "";
switch (enumValue) {
  case 2:
    service = "teeth_cover";
    break;
  case 3:
    service = "orthdoncy";
    break;
  case 4:
    service = "teeth_remove";
    break;
  case 5:
    service = "gum_surgery";
    break;
  case 6:
    service = "root_surgery";
    break;
  case 7:
    service = "teeth_protice";
    break;
  case 8:
    service = "teeth_bleaching";
    break;
  default:
    service = "teeth_filling";
    break;
}

// Appointment schema
var aptObject = {
  enum: Number,
  [service]: [
    {
      meet_at: {
        type: Date,
        default: Date.now,
      },
      round: {
        type: Number,
        min: 1,
        max: 5,
      },
      initial_services: String,
      description: String,
      material: String,
      image: String,
      tooth: {
        gum: String,
        type: { type: String },
      },
      fee: {
        installment: { type: Number, min: 1, max: 3 },
        amount_received: Schema.Types.Decimal128,
        amount_due: Schema.Types.Decimal128,
        dentist: mongoose.ObjectId,
      },
      total_received: Schema.Types.Decimal128,
    },
  ],
};
// appointment SCHEMA
const appointmentSchema = new Schema(aptObject);
// Patient main schema
const patientMainSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: String,
  fathername: { type: String, required: true },
  tazkira_id: { type: String, required: true, min: 15 },
  occupation: { type: String, required: true },
  age: { type: Number, required: true },
  blood_group: String,
  marital_status: { type: String, required: true },
  case_history: [{ disease: String, result: Boolean }],
  registered_at: { type: Date, default: dateKabul },
  phone: { type: String, required: true },
  address: String,
  sex: { type: String, required: true },
  appointment: {
    type: appointmentSchema
  },
});
// access the database collection
const patient = mongoose.model("patient", patientMainSchema);
// export it to be use later
module.exports = patient

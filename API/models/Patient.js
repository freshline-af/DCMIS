const mongoose = require("mongoose");
// Import Timezone module
const momentTZ = require("moment-timezone");
// Set timezone for Kabul
const dateKabul = momentTZ.tz(Date.now(), "Asia/Kabul");
// Declare a variable for schema
const Schema = mongoose.Schema;
/* ----------------------- Sub-schemas of services for patients ---------------------- */

// 1. Teeth Filling
const teethFillingSchema = Schema({
  stag: Number,
  teeth_filling: [
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
});

// 2. Teeth Cover
const teethCoverSchema = Schema({
  stag: Number,
  teeth_cover: [
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
      material: String,
      description: String,
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
});

// 3. Orthodoncy
const orthodoncySchema = Schema({
  stag: Number,
  orthodoncy: [
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
      image: String,
      description: String,
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
});

// 4. Teeth Remove
const teethRemoveSchema = Schema({
  stag: Number,
  teeth_remove: [
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
      description: String,
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
});

// 5. Gum Surgery
const gumSurgerySchema = Schema({
  stag: Number,
  teeth_surgery: [
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
      description: String,
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
});

// 6. Root Surgery
const rootSurgerySchema = Schema({
  stag: Number,
  root_surgery: [
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
      description: String,
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
});

// 7. Teeth Protice
const teethProticeSchema = Schema({
  stag: Number,
  teeth_protice: [
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
      material: String,
      description: String,
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
});

// 8. Teeth Bleaching
const teethBleachingSchema = Schema({
  stag: Number,
  teeth_bleaching: [
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
      material: String,
      description: String,
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
});

// 9. Teeth Scaling
const teethScalingSchema = Schema({
  stag: Number,
  scaling: [
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
      description: String,
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
});

/* -----------------------/. Sub-schemas of services for patients ---------------------- */

/* --------------------- Services for patient ---------------------- */
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
  appointment: [
    teethFillingSchema,
    teethCoverSchema,
    orthodoncySchema,
    teethRemoveSchema,
    gumSurgerySchema,
    rootSurgerySchema,
    teethProticeSchema,
    teethBleachingSchema,
    teethScalingSchema
  ],
});
// access the database collection
const patient = mongoose.model("patient", patientMainSchema);
// export it to be use later
module.exports = patient;

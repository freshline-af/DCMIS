const mongoose = require("mongoose");
// import moment-timezone
const momentTZ = require('moment-timezone');
// Set timezone for Kabul
const dateKabul = momentTZ.tz(Date.now(), "Asia/Kabul");
const Schema = mongoose.Schema;
const StaffSchema = new Schema({
  username: String,
  password: String,
  role: String,
  firstname: String,
  lastname: String,
  fathername:String,
  tazkira_id: String,
  address: String,
  edu_level: String,
  edu_start_date:Date,
  edu_end_date: Date,
  edu_university:String,
  edu_field: String,
  position: String,
  hired_at: Date,
  salary: Number,
  contract: String,
  edu_docs: String,
  tazkira_copy: String,
  photo: String,
  phone1: String,
  phone2: String,
  cli_equip: [
    {
      _id: String,
      name: String,
      number: Number,
      unit_price: Number,
      purchased_at: Date,
      expire_at: Date,
      description: String,
      invoice: String,
    },
  ],
  services: [
    {
      _id: String,
      orthodoncy: {
        teeth_remove: [String],
        gum_surgery: [String],
      },
    },
    {
      _id: String,
      teeth_protice: [String],
    },
    {
      _id: String,
      negin_teeth: Boolean,
      teeth_implant: Boolean,
      oral_test: Boolean,
      root_canal: Boolean,
    },
    {
      _id: String,
      oral_disease: [String],
    },
    {
      _id: String,
      teeth_bleaching: [String],
    },
    {
      _id: String,
      teeth_filling: [String],
    },
    {
      _id: String,
      teeth_cover: [String],
    },
  ],
  fee: [
    {
      _id: String,
      amount_paid: Number,
      amount_recievable: { type: Number, default: 0 },
      paid_at: Date,
    },
  ],
  // the second parameter forces mongodb to not pluralize staff automatically
}, {collection: 'staff'});
// access the database collection
const staff = mongoose.model("staff", StaffSchema);
// export it to be use later
module.exports = staff

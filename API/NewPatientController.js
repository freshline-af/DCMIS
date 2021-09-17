/* ------------------ 9 data models for patient services --------------------- */
const TeethFilling = require("./models/patients/TeethFillingModel");
const TeethRemove = require("./models/patients/TeethRemoveModel");
const TeethCover = require("./models/patients/TeethCoverModel");
const TeethProtice = require("./models/patients/TeethProticeModel");
const TeethBleaching = require("./models/patients/TeethBleachingModel");
const TeethScaling = require("./models/patients/TeethScalingModel");
const GumSurgery = require("./models/patients/GumSurgeryModel");
const RootSurgery = require("./models/patients/RootSurgeryModel");
const Orthodoncy = require("./models/patients/OrthodoncyModel");
/* ------------------/. 9 data models for patient services --------------------- */

// Insert a patient
const insertPatient = async (req, res) => {
  // const stag = req.body.appointment.stag;

  /* ---------------- Personal Info ------------------- */
  let pid = req.body._id;
  let fname = req.body.firstname;
  let lname = req.body.lastname;
  let faname = req.body.fathername;
  let tazkira = req.body.tazkira_id;
  let occup = req.body.occupation;
  let pAge = req.body.age;
  let bgroup = req.body.blood_group;
  let mstatus = req.body.marital_status;
  let pphone = req.body.phone;
  let addr = req.body.address;
  let psex = req.body.sex;
  let pphoto = req.body.photo;
  /* ---------------/. Personal Info ------------------- */
  let patient = "";
  let seeDrFor = "";

  /* --------------------------- Appointment Array/Objects ------------------------ */
  // appointment is an array of objects
  let apptArrayOfObj = req.body.appointment;
  // Declare a new array for appoitment to use it later.
  let newApptArray = [];
  for (let a = 0; a < apptArrayOfObj.length; a++) {
    // Declare an object to assign object properties
    let apptObj = {};
    let sTag = apptArrayOfObj[a].stag;
    // let total = apptArrayOfObj[a].total_received;
    switch (sTag) {
      case 2:
        patient = TeethCover;
        seeDrFor = "teeth_cover";
        break;
      case 3:
        patient = Orthodoncy;
        seeDrFor = "orthodoncy";
        break;
      case 4:
        patient = TeethRemove;
        seeDrFor = "teeth_remove";
        break;
      case 5:
        patient = GumSurgery;
        seeDrFor = "gum_surgery";
        break;
      case 6:
        patient = RootSurgery;
        seeDrFor = "root_surgery";
        break;
      case 7:
        patient = TeethProtice;
        seeDrFor = "teeth_protice";
        break;
      case 8:
        patient = TeethBleaching;
        seeDrFor = "teeth_bleaching";
        break;
      case 9:
        patient = TeethScaling;
        seeDrFor = "teeth_scaling";
        break;
      default:
        patient = TeethFilling;
        seeDrFor = "teeth_filling";
        break;
    }
    var serviceArrayOfObj = apptArrayOfObj[a][seeDrFor];

    // Declare a new empty array for services to use in below.
    let newServiceArray = [];
    // This inner loop is for any service which is an array of objects
    for (let s = 0; s < serviceArrayOfObj.length; s++) {
      let serviceObj = {};
      let toothObj = {};
      let feeObj = {};
      let meetAt = serviceArrayOfObj[s].meet_date;
      let sRound = serviceArrayOfObj[s].round;
      let desc = serviceArrayOfObj[s].description;
      let _material = serviceArrayOfObj[s].material;
      let toothGum = serviceArrayOfObj[s].tooth.gum;
      let toothType = serviceArrayOfObj[s].tooth.type;
      let inst = serviceArrayOfObj[s].fee.installment;
      let amountReceived = serviceArrayOfObj[s].fee.amount_received;
      let amoutDue = serviceArrayOfObj[s].fee.amount_due;
      let _dentist = serviceArrayOfObj[s].fee.dentist;
      serviceObj["meet_at"] = meetAt;
      serviceObj["round"] = sRound;
      serviceObj["description"] = desc;
      serviceObj["material"] = _material;
      toothObj["gum"] = toothGum;
      toothObj["type"] = toothType;
      feeObj["installment"] = inst;
      feeObj["amount_received"] = amountReceived;
      feeObj["amount_due"] = amoutDue;
      feeObj["dentist"] = _dentist;
      serviceObj["tooth"] = toothObj;
      serviceObj["fee"] = feeObj;
      newServiceArray.push(serviceObj);
    }

    apptObj["stag"] = sTag;
    apptObj[seeDrFor] = newServiceArray;
    newApptArray.push(apptObj);
  }
  // res.json(newApptArray);

  /* ---------------------------/. Appointment Array/Objects ------------------------ */

  await patient.create(
    {
      firstname: fname,
      lastname: lname,
      fathername: faname,
      tazkira_id: tazkira,
      occupation: occup,
      age: pAge,
      marital_status: mstatus,
      blood_group: bgroup,
      phone: pphone,
      address: addr,
      sex: psex,
      appointment: newApptArray
    },
    (err, result) => {
      if (err) {
        res.end("Some error occured: " + err);
      } else if(result) {
        res.end("Patient added!");
      } else {
        res.end('Sorry, patient not added.');
      }
    }
  );
};

module.exports = insertPatient;

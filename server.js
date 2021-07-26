// import body-parser
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
var cors = require("cors");
app.use(cors({ origin: "http://localhost:8080" }));
/* -------------------- Express-Fileupload ------------------------- */
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    limits: {
      fileSize: 5000000,
    },
    abortOnLimit: true,
  })
);
/* --------------------/. Express-Fileupload ------------------------- */

app.use(express.json());
const staffSchema = require("./API/models/staff/Staff");
const patientSchema = require("./API/models/patients/TeethFillingModel");

// Import db connection
require("./API/models/conn");

/* --------------------------------- import Staff --------------------------- */
const newStaffController = require("./API/NewStaffController");
const staffAll = require("./API/ReadStaffController");
const hashStaffPwd = require("./API/UpdatePasswordController");
// staff login controller
const staffLogin = require("./API/StaffLoginController");
// Import to edit a staff
const editStaff = require("./API/EditStaffController");
// Import to delete a staff
const deletedStaff = require("./API/DeleteStaffController");
/* ---------------------------------/. import Staff --------------------------- */

/* --------------------------------- import Patients ---------------------------- */
// Retrieve patients
const readPatient = require("./API/ReadPatientController");
// Add a new patient
const addPatient = require("./API/NewPatientController");
// Edit a patient
const editPatient = require("./API/EditPatientController");
// Delete a patient
const deletePatient = require("./API/DeletePatientController");
/* --------------------------------- /. import Patients ------------------------- */

/* ------------------------------- Import Expenses ------------------------------ */
// 1. Retrieve expenses
const readExpense = require('./API/ReadExpensesController');
// 2. Create expenses 
const createExpense = require('./API/NewExpensesController');
// 3. Update expenses 
const editExpense = require('./API/EditExpensesController');
// 4. Delete expenses 
const deleteExpense = require('./API/DeleteExpensesController');
/* -------------------------------/. Import Expenses ------------------------------ */
// use public directory
app.use(express.static("public"));
// import EJS templating engine
const ejs = require("ejs");
// use it
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.render("index");
// });

// Staff page
app.post("/staff/add", newStaffController);
app.put("/staff/updatePassword/:id", hashStaffPwd);
// login route
app.post("/staff/login", staffLogin);
/* ------------------  Routes for Patients -------------------------- */
// Add a new patient
app.post("/patient/add", addPatient);
// Retrieve all patients
app.get("/patient/all", readPatient);
// Edit a patient
app.put("/patient/edit/:id", editPatient);
// Delete a patient
app.delete("/patient/delete/:id", deletePatient);

// upload patients' photos
app.put("/patient/photo/upload/:id", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.end("No photo chosen.");
  } else {
    let pPhoto = req.files.patientPhoto;
    let imgTypes = path.extname(pPhoto.name).toLowerCase();
    if (
      imgTypes !== ".jpg" &&
      imgTypes !== ".jpeg" &&
      imgTypes !== ".png" &&
      imgTypes !== ".gif"
    ) {
      res.end("Only images are allowed.");
    } else {
      pPhoto.mv(
        path.resolve(
          __dirname,
          "public/uploads/docs/patient-photo/",
          pPhoto.name
        ),
        async (error) => {
          await patientSchema.updateOne(
            { _id: req.params.id },
            {
              $set: { photo: pPhoto.name },
            }
          );
          res.end("Photo updated.");
        }
      );
    }
  }
});

/* ------------------ /. Routes for Patients -------------------------- */
/* ----------------------------- Routes for Staff ------------------------ */
// Retrieve all staff
app.get("/staff/all", staffAll);
app.post("/staff/add", newStaffController);
app.put("/staff/updatePassword/:id", hashStaffPwd);
// login route
app.post("/staff/login", staffLogin);
// A specific staff
app.get("/staff/:numOfEq", sStaff);
// Edit a staff
app.delete("/staff/delete/:id", deletedStaff);

// Upload Image
/* ---------------------- Upload Staff Photo ----------------------- */
app.put("/staff/photo/upload/:id", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.end("No photo chosen.");
  } else {
    let sPhoto = req.files.staffPhoto;
    let imgTypes = path.extname(sPhoto.name).toLowerCase();
    if (
      imgTypes !== ".jpg" &&
      imgTypes !== ".jpeg" &&
      imgTypes !== ".png" &&
      imgTypes !== ".gif"
    ) {
      res.end("Only images are allowed.");
    } else {
      sPhoto.mv(
        path.resolve(__dirname, "public/uploads/docs/photo/", sPhoto.name),
        async (error) => {
          await staffSchema.updateOne(
            { _id: req.params.id },
            {
              $set: { photo: sPhoto.name },
            }
          );
          res.end("Photo updated.");
        }
      );
    }
  }
});
/* ----------------------/. Upload Staff Photo ----------------------- */
/*---------------------- Upload Staff Contract -------------------------------*/
app.put("/staff/contract/upload/:id", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.end("No file chosen.");
  } else {
    let sContract = req.files.staffContract;
    let fileType = path.extname(sContract.name).toLowerCase();
    if (fileType !== ".zip" && fileType !== ".pdf") {
      res.end("Please select files with extension '.zip' or '.pdf'.");
    } else {
      sContract.mv(
        path.resolve(
          __dirname,
          "public/uploads/docs/contract/",
          sContract.name
        ),
        async (error) => {
          await staffSchema.updateOne(
            { _id: req.params.id },
            {
              $set: { contract: sContract.name },
            }
          );
          res.end("Contract file updated.");
        }
      );
    }
  }
});
/*----------------------/. Upload Staff Contract -------------------------------*/
/* -------------------- Upload staffs' education docs ----------------- */
app.put("/staff/education/upload/:id", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.end("No file chosen.");
  } else {
    let sEduDocs = req.files.staffEduDocs;
    let fileType = path.extname(sEduDocs.name).toLowerCase();
    if (fileType !== ".zip") {
      res.end("Please select files with extension '.zip'.");
    } else {
      sEduDocs.mv(
        path.resolve(
          __dirname,
          "public/uploads/docs/education/",
          sEduDocs.name
        ),
        async (error) => {
          await staffSchema.updateOne(
            { _id: req.params.id },
            {
              $set: { edu_docs: sEduDocs.name },
            }
          );
          res.end("Education docs updated.");
        }
      );
    }
  }
});
/* --------------------/. Upload staffs' education docs ----------------- */

/* --------------------- Upload staff's Tazkira Copy ---------------------- */
app.put("/staff/tazkira/upload/:id", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.end("No file chosen.");
  } else {
    let sTazkira = req.files.staffTazkira;
    let fileType = path.extname(sTazkira.name).toLowerCase();
    if (fileType !== ".zip") {
      res.end("Please select files with extension '.zip'.");
    } else {
      sTazkira.mv(
        path.resolve(__dirname, "public/uploads/docs/tazkira/", sTazkira.name),
        async (error) => {
          await staffSchema.updateOne(
            { _id: req.params.id },
            {
              $set: { tazkira_copy: sTazkira.name },
            }
          );
          res.end("Tazkira uploaded.");
        }
      );
    }
  }
});
/* ---------------------/. Upload staff's Tazkira Copy ---------------------- */

/* -----------------------------/. Routes for Staff ------------------------ */

/* -------------------------- Routes for Expenses -------------------------- */
// 1. Retrieve
app.get('/expenses/all', readExpense);
// 2. Create
app.post("/expenses/new", createExpense);
// 3. Update
app.put("/expenses/edit/:id", editExpense);
// 4. Delete
app.delete("/expenses/delete/:id", deleteExpense);
/* --------------------------/. Routes for Expenses -------------------------- */


// listen to port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

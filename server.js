// import body-parser
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const app = express();
var cors = require('cors');
app.use(cors({origin: "http://localhost:8080"}))

app.use(express.json());
const Staff = require("./API/models/Staff");

// Import db connection
require("./API/models/conn");

/* --------------------------------- import Staff --------------------------- */
const newStaffController = require('./API/NewStaffController');
const staffAll = require('./API/ReadStaffController');
// Get a specific staff
const sStaff = require('./API/SpecificStaff');
const hashStaffPwd = require('./API/UpdatePasswordController');
// staff login controller
const staffLogin = require('./API/StaffLoginController');
/* ---------------------------------/. import Staff --------------------------- */

/* --------------------------------- import Patients ---------------------------- */
const newPatientController = require('./API/NewPatientController');
const PatientsController = require('./API/ReadPatientController');
const patientFormData = require('./API/SubmitPatientDataController');
/* --------------------------------- /. import Patients ------------------------- */

/* ----------------------------- File Upload ----------------------------------- */
const fileUpload = require("express-fileupload");
app.use(fileUpload());
/* -----------------------------/. File Upload ----------------------------------- */
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
app.put("/staff/updatePassword/:id", hashStaffPwd) 
// login route
app.post("/staff/login", staffLogin);
// Add new patient
app.get("/patient/add", newPatientController);
/* ------------------  Routes for Patients -------------------------- */
// Insert into patients the form data
app.post("/patient/insert", patientFormData);

app.get("/patient/all", PatientsController);

/* ------------------ /. Routes for Patients -------------------------- */
/* ----------------------------- Routes for Staff ------------------------ */
// Retrieve all staff
app.get("/staff/all", staffAll);

// A specific staff
app.get('/staff/:numOfEq', sStaff);

// Upload Image
/* ---------------------- CUSTOM Middleware ----------------------- */
const customMW = (req, res, next) => {
  if (req.files == null) {
    res.redirect("/");
    console.log("Sorry, no image chosen!");
  } else {
    app.post("/staff/image", (req, res) => {
      let image = req.files.photo;
      image.mv(
        path.resolve(__dirname, "public/img", image.name),
        async (error) => {
          await Staff.create({ photo: "/img/" + image.name });
          res.redirect("/");
        }
      );
    });
  }
  next();
};
app.use(customMW);
/* ----------------------/. CUSTOM Middleware ----------------------- */

/* -----------------------------/. Routes for Staff ------------------------ */

// listen to port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
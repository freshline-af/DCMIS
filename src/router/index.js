import AccountManagment from "../views/account/accountManagmentPage.vue";
import EditPatient from "../views/patient/editPatient.vue";
import EditStaff from "../views/staff/EditStaff..vue"
import FinaceManag from "../views/finace/finaceManagPage.vue";
import Home from "../views/Home.vue";
import Login from "../views/account/loginView.vue";
import NProgress from "nprogress";
import NetworkIssue from "../views/NetworkIssue.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
import Patient from "../views/patient/patient.vue";
import PatientRegistar from "../views/patient/registarPatient.vue";
import Service from "../views/service/ServicePage.vue";
import ShowPatientDetails from "../views/patient/showPatientDetails.vue";
import ShowStaff from "../views/staff/showOneStaff.vue";
import Sitting from "../views/sitting/sittingPage.vue";
import Staff from "../views/staff/StaffPage.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Home",
    component: Home,
  },
  {
    path: "/service",
    name: "service",
    component: Service,
  },
  {
    path: "/patient",
    name: "patient",
    component: Patient,
  },
  {
    path: "/patient-registar",
    name: "PatientRegistar",
    component: PatientRegistar,
  },
  {
    path: "/show_patient_details",
    name: "PatienDetails",
    component: ShowPatientDetails,
    probs:true
  },
  {
    path: "/edit_patient",
    name: "editPatient",
    component: EditPatient,
    probs: true,
  },
  {
    path: "/staff",
    name: "staff",
    component: Staff,
  },
  {
    path: "/show_staff",
    name: "ShowStaff",
    component: ShowStaff,
    probs: true,
  },
  {
    path: "/edit_staff",
    name: "EditStaff",
    component: EditStaff,
    probs: true,
  },
  {
    path: "/account_managment",
    name: "accountManagment",
    component: AccountManagment,
  },
  {
    path: "/finace_manag",
    name: "finaceManag",
    component: FinaceManag,
  },
  {
    path: "/sitting",
    name: "sitting",
    component: Sitting,
  },
  {
    path: "/network_issue",
    name: "networkIssue",
    component: NetworkIssue,
  },
  {
    path: "/404",
    name: 404,
    component: NotFoundPage,
    props: true,
  },
  {
    path: "*",
    redirect: { name: "404", params: { resource: "صفحه" } },
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((routeTo, routeFrom, next) => {
  NProgress.start();
  if (!JSON.parse(localStorage.getItem("user")) && routeTo.path !== "/") {
    next({ name: "Login" });
  } else if (JSON.parse(localStorage.getItem("user")) && routeTo.path == "/") {
    next({ name: "Home" });
  } else {
    next();
  }
});
router.afterEach(() => {
  NProgress.done();
});

export default router;

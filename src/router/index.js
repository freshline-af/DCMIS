import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/account/loginView.vue";
import Service from "../views/service/ServicePage.vue";
import Staff from "../views/staff/StaffPage.vue";
import AccountManagment from "../views/account/accountManagmentPage.vue";
import FinaceManag from "../views/finace/finaceManagPage.vue";
import Sitting from "../views/sitting/sittingPage.vue";
import Patient from "../views/patient/patient.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login_view",
    name: "login",
    component: Login
  },
  {
    path: "/service",
    name: "service",
    component: Service
  },
  {
    path: "/patient",
    name: "patient",
    component: Patient
  },
  {
    path: "/staff",
    name: "staff",
    component: Staff
  },
  {
    path: "/account_managment",
    name: "accountManagment",
    component: AccountManagment
  },
  {
    path: "/finace_manag",
    name: "finaceManag",
    component: FinaceManag
  },
  {
    path: "/sitting",
    name: "sitting",
    component: Sitting
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

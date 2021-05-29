import AccountManagment from "../views/account/accountManagmentPage.vue";
import EditPatient from "../views/patient/editPatient.vue";
import FinaceManag from "../views/finace/finaceManagPage.vue";
import Home from "../views/Home.vue";
import Login from "../views/account/loginView.vue";
import NProgress from "nprogress";
import NetworkIssue from "../views/NetworkIssue.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
import Patient from "../views/patient/patient.vue";
import Service from "../views/service/ServicePage.vue";
import Sitting from "../views/sitting/sittingPage.vue";
import Staff from "../views/staff/StaffPage.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login_view",
    name: "login",
    component: Login,
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
    path: "/edit_patient",
    name: "editPatient",
    component: EditPatient,
    probs: true
  },
  {
    path: "/staff",
    name: "staff",
    component: Staff,
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
  next();
});
router.afterEach(() => {
  NProgress.done();
});

export default router;

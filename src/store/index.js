import Vue from "vue";
import Vuex from "vuex";
import * as services from "./modules/services";
import * as staff from "./modules/staff";
import * as patient from "./modules/patient";
import * as userInfo from "./modules/userLoginInfo";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: "true"
  },
  mutations: {},
  actions: {},
  modules: {
    services,
    staff,
    patient,
    userInfo
  }
});

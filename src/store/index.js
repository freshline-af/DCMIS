import * as notification from "./modules/notification"
import * as patient from "./modules/patient";
import * as services from "./modules/services";
import * as staff from "./modules/staff";
import * as userInfo from "./modules/userLoginInfo";

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {},
  actions: {},
  getters: {
    loggedIn (state) {
      return !!state.user
    }
  }, 
  modules: {
    services,
    staff,
    patient,
    userInfo,
    notification
  }
});

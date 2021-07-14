import * as finances from "./modules/finances";
import * as notification from "./modules/notification";
import * as patient from "./modules/patient";
import * as services from "./modules/services";
import * as staff from "./modules/staff";
import * as userInfo from "./modules/userLoginInfo";

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logined: false,
    user: {}
  },
  mutations: {
    ADD_USER(state, data) {
      state.user = data;
    },
  },
  actions: {
    add_user({ commit }, data) {
      commit("ADD_USER", data);
    },
    login_staff({ dispatch,commit }, data) {
      axios.post("http://localhost:3000/staff/login", data).then((response) => {
        if (response.data === "Fail") {
          const notification = {
            type: "error",
            message: ".لطفا پسورد و یا توزرنیم خود را چک نماید که درست باشد",
          };
          const user ={
            id:"60bb22439734f8238caa8405",
            username:"Basir",
            roll: "Admin",
            position: "position",
            photoUrl: "../assets/face.png"
          }
          commit("ADD_USER",user)
          localStorage.setItem("user", JSON.stringify(user))
          router.push({name: "Home"})
          window.location.reload();
          dispatch("notification/add", notification, { root: true });
          
        } else {
          const notification = {
            type: "sucess",
            message: "به سیستم خوش آمدید.",
          };
          dispatch("notification/add", notification, { root: true });
        }
      }).catch(error =>{
        const notification = {
          type: "error",
          message: error
        };
        dispatch("notification/add", notification, { root: true });
      
      });
    },
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
  },
  modules: {
    services,
    staff,
    patient,
    userInfo,
    notification,
    finances,
  },
});

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
    user: {},
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
    login_staff({ dispatch, commit }, data) {
      console.log(data);
      axios
        .post("http://localhost:3000/staff/login", data)
        .then((response) => {
          //   if (response.data === "Fail") {
          //     const notification = {
          //       type: "error",
          //       message:response.data //".لطفا پسورد و یا توزرنیم خود را چک نماید که درست باشد",
          //     };
          //     dispatch("notification/add", notification, { root: true });

          // } else {}
          const notification = {
            type: "success",
            message: response.data, //"به سیستم خوش آمدید.",
          };
          const user = {
            username: "Basir",
            roll: "Admin",
            photo: "face.png",
            _id: "60ffd64beef96b4a38c9a11a",
            role: "common_staff",
            firstname: "محمد علی",
            lastname: "علی زاده",
            fathername: "عوض علی",
            tazkira_id: "345678",
            phone1: "0748953964",
            address: "کابل افغانستان",
            edu_level: "دوازده پاس",
            edu_field: "طب دندان",
            edu_university: "پوهنتون طبی کابل",
            position: "کار آموز",
            salary: 5000,
            edu_start_date: "2021-07-27T09:47:55.717Z",
            edu_end_date: "2021-07-27T09:47:55.717Z",
            hired_at: "2021-07-27T09:47:55.717Z",
          };
          commit("ADD_USER", user);
          localStorage.setItem("user", JSON.stringify(user));
          router.push({ name: "Home" });
          window.location.reload();
          dispatch("notification/add", notification, { root: true });
        })
        .catch((error) => {
          const notification = {
            type: "error",
            message: error,
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

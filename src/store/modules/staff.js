import axios from 'axios';
export const namespaced = true;
export const state = {
  items: [
    { id: "1", name: "لست کارمندان " },
    { id: "2", name: "راجستر کردن کارمند جدید" },
    { id: "3", name: "کارمندان حاضر" }
  ],
  employes: [
    {
      id: "234567",
      name: "غلی",
      fName: "رسول",
      job: "کارآموز",
      tazkarahNum: "12123",
      eduDegree: "لیسانس",
      phone: "0748953964"
    },
    {
      id: "234568",
      name: "غلی",
      fName: "رسول",
      job: "کارآموز",
      tazkarahNum: "12123",
      eduDegree: "لیسانس",
      phone: "0748953964"
    },
    {
      id: "234562",
      name: "غلی",
      fName: "رسول",
      job: "کارآموز",
      tazkarahNum: "12123",
      eduDegree: "لیسانس",
      phone: "0748953964"
    }
  ],

  staff: []
};
export const mutations = {
  SET_EMPLOYE(state, employe) {
    state.employes.push(employe);
  },
  SET_TEST(state, staff) {
    state.staff = staff
  }
};
export const actions = {
  set_employe({ commit }, employe) {
    commit("SET_EMPLOYE", employe);
  },
 async setStaff({commit}) {
   await axios.get('http://localhost:3000/staff/all')
      .then(response => {
        commit("SET_TEST",  response.data);
      })
      .catch(error => {
        console.log(error);
    })
  }
};

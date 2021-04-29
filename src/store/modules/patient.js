<<<<<<< HEAD
import axios from "axios"

export const namespaced = true;
export const state = {
  test: [
=======
export const namespaced = true;
export const state = {
  patients: [
>>>>>>> 5fb28ddbb769a63b0a87cfe7548b88bc43af508f
    {
      id: "12",
      name: "غلام",
      lName: "جمال",
      fName: "رسول",
      phone: "0788450560",
      age: "12",
      address: "کابل",
      occupation: "آراد",
      bloodGroup: "A",
      photoUrl: ""
    },
    {
      id: "13",
      name: "باقر",
      lName: "امینی",
      fName: "رضا",
      phone: "0788450560",
      age: "44",
      address: "کابل",
      occupation: "آراد",
      bloodGroup: "A",
      photoUrl: ""
    }
<<<<<<< HEAD
  ],
  patients:[]
};
export const mutations = {
  ADD_PATIENT(state, patient) {
    state.patients= patient;
=======
  ]
};
export const mutations = {
  ADD_PATIENT(state, patient) {
    state.patients.push(patient);
>>>>>>> 5fb28ddbb769a63b0a87cfe7548b88bc43af508f
  }
};
export const actions = {
  add_patient({ commit }, patient) {
    commit("ADD_PATIENT", patient);
<<<<<<< HEAD
  },
  async getListOfPatient({commit}){
    await axios.get("http://localhost:3000/patient/all").then(response =>{
      commit("ADD_PATIENT",response.data);
    })
=======
>>>>>>> 5fb28ddbb769a63b0a87cfe7548b88bc43af508f
  }
};

import axios from "axios"

export const namespaced = true;
export const state = {
  // Array for store list of patients
  patients:[]
};
export const mutations = {
  // A mutation for set data to patients state
  ADD_PATIENT(state, patient) {
    state.patients= patient;
  }
};

export const actions = {
  // a method to set dinamicaly data to add_patient mutation
  add_patient({ commit }, patient) {
    commit("ADD_PATIENT", patient);
  },
  // a method to get list of patients from API
  async getListOfPatient({dispatch,commit}){
    await axios.get("http://localhost:3000/patient/all").then(response =>{
      commit("ADD_PATIENT",response.data);
    }).catch(error =>{
      const notification = {
        type: 'error',
        message: 'There was a problem creating your event: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
      throw error
    })
  }
};
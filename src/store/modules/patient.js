import axios from "axios"

export const namespaced = true;
export const state = {
  patients:[]
};
export const mutations = {
  ADD_PATIENT(state, patient) {
    state.patients= patient;
  }
};
export const actions = {
  add_patient({ commit }, patient) {
    commit("ADD_PATIENT", patient);
  },
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
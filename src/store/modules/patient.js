export const namespaced = true;
export const state = {
  patients: [
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
  ]
};
export const mutations = {
  ADD_PATIENT(state, patient) {
    state.patients.push(patient);
  }
};
export const actions = {
  add_patient({ commit }, patient) {
    commit("ADD_PATIENT", patient);
  }
};

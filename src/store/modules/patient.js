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
        type: 'red',
        message: 'There was a problem creating your event: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
      throw error
    })
  },
  async addPatient({dispatch},patient){
    axios.post("http://localhost:3000/patient/add",patient).then( (response =>{
      if(response.status== 200 && response.data == "Patient added!"){
        const notification = {
        type: 'success',
        message: "مریض مورد نظر موفقانه در سیستم اضافه گردید."
      }
      dispatch('notification/add', notification, { root: true })
      }else{
        const notification = {
          type: 'red',
          message: "در قسمت راجستر کردن مریض مشکل وجود دارد." + response.data
        }
        dispatch('notification/add', notification, { root: true })
      }
    })).catch(error =>{
      const notification = {
        type: 'red',
        message: 'There was a problem creating your event: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
      throw error
    })
  },
  async editPatient({dispatch} ,patient){
    axios.put("http://localhost:3000/patient/edit/"+patient._id, patient).then( response =>{
      if(response.status == 200){
        const notification = {
          type: 'success',
          message: 'معلومات بیمار مورد نظر موفقانه تغیر داده شد.'
        }
        dispatch('notification/add', notification, { root: true })
      }
    }).catch(error =>{
      const notification = {
        type: 'warning',
        message: 'There was a problem editing your event: ' + error.message
      }
      dispatch('notification/add', notification, { root: true })
      throw error
    })
  },
  async deletePatient({dispatch}, id){
    axios.delete("http://localhost:3000/patient/delete/"+id).then(response =>{
      if(response.status == 200){
        const notification ={
          type:'success',
          message: 'معلومات بیمار مورد نظر موفقانه از سیستم هذف کردید.' 
        };
        dispatch('notification/add', notification, {root: true});
        dispatch("getListOfPatient");
      }
      
    }).catch(error =>{
      const notification ={
        type:'warning',
        message: 'در قسمت پاک کردن معلومات بیمار مورد نظر مشکل روخ داده است' + error.message
      };
      dispatch('notification/add', notification, {root: true});
      throw error;
    });
  }
};
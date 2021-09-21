import FormData from 'form-data'
import axios from 'axios';

export const namespaced = true;
export const state = {
  // Array to store list of item which is show on tap in staff page
  items: [
    { id: "1", name: "لست کارمندان " },
    { id: "2", name: "راجستر کردن کارمند جدید" },
    { id: "3", name: "کارمندان حاضر" ,show:true}
  ],
  // Array to store list of staff
  staff: []
};
export const mutations = {
  SET_STAFF(state, staff) {
    state.staff = staff
  }
};
export const actions = {
  // to set data into SET_STAFF mutations
  set_staff({ commit }, staff) {
    commit("SET_STAFF", staff);
  },
  // to get list of all staff from API
 async getStaff({commit,dispatch}) {
   await axios.get('http://localhost:3000/staff/all')
      .then(response => {
        commit("SET_STAFF",  response.data);
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
    })
  },
  async addEmploye({dispatch},employe){
  await axios.post("http://localhost:3000/staff/add",employe).then( response =>{
      if(response.status == 200){
        let notification ={
          type: "success",
          message: response.data
        };
        dispatch("getStaff")
        dispatch("notification/add", notification, {root: true});
      }
    }).catch( error => {
      let notification = {
        type: "warning",
        message: "در قستمت ثبت کردن کارمند جدید مشکل وجود دارد" +error.message
      };
      dispatch("notification/add", notification, {root: true});
      throw error;
    })
  },
  editStaff({dispatch},staff){
    axios.put("http://localhost:3000/staff/edit/"+staff._id,staff).then(response =>{
      if(response.status == 200 ){
        let notification ={
          type: "success",
          message: "معلومات کارمند مورد نظر موفقانه تغیر داده شد."
        };
        dispatch("notification/add",notification, {root: true});
        dispatch("getStaff");
        
        
        
      }
    }).catch(error =>{
      let notification = {
        type: "warning",
        messate: error.message
      };
      dispatch("notification/add",notification,{root: true});
    })
  },
async  deleteStaff({dispatch}, staff){
  await  axios.delete("http://localhost:3000/staff/delete/"+staff._id).then(response =>{
       if(response.status == 200 && response.data == "Staff removed!"){
         let notification = {
           type: "success",
           message: "کارمند مورد نظر موفقانه از سیستم حذف کردید."
         };
          dispatch("notification/add",notification,{root: true});
       }
    }).catch(error =>{
      let notification = {
        type: "warning",
        message: error.message
      };
      dispatch("notification/add", notification, {root: true});
    })
  },
async  uploadeEduDoc({dispatch}, eduDoc){
  let data = new FormData();
  
  data.append('staffEduDocs',eduDoc.staffEduDocs);
 await  axios.put("http://localhost:3000/staff/education/upload/"+eduDoc.id, data, {
  headers: {
    'accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.8',
    'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
  }
}).then( response =>{
      if(response.status == 200 ){
        let notification = {
          type: "success",
          message:"اسناد پوهنتون مفقانه در سیستم اپلود شد."
        };
        dispatch("notification/add", notification, {root: true})
      }
  
    }).catch(error =>{
      let notification = {
        type: "warning",
        message: error.message
      };
      dispatch("notification/add", notification, {root:true});
    });
  },
  async signUpuser({dispatch},userData){
    axios.post("http://localhost:3000/staff/signup/"+userData.id,userData).then(response =>{
      if(response.status ==200 && response.data =="Sign up done!"){
        let notification = {
          type: "success",
          message: "حساب کاربری مفقانه اضافه شد."
        }
        dispatch("notification/add", notification,{root:true})
      }
    }).catch(error =>{
      let notification={
        type: "warning",
        message: error.message
      };
      dispatch("notification/add", notification,{root:true})
    })

  },
  async uploadStaffPhoto({dispatch},photo){
    let data = new FormData();
    data.append('staffPhoto',photo.staffPhoto);
    await axios.put("http://localhost:3000/staff/photo/upload/"+photo.id, data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
    }).then(response =>{
      if(response.status == 200)
      {
        let notification = {
          type: "success",
          message: "عکس موفقانه اضافه شد."
        };
        dispatch("notification/add", notification, {root: true});
      }
    }).catch(error =>{
      let notification = {
        type: "error",
        message: error.message
      };
      dispatch("notification/add", notification, {root: true});
    })
  },
  async uploadStaffTazkira({dispatch},tazkira){
    let data = new FormData();
    data.append('staffTazkira',tazkira.staffTazkira);
    await axios.put("http://localhost:3000/staff/tazkira/upload/"+tazkira.id, data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
    }).then(response =>{
      if(response.status == 200)
      {
        let notification = {
          type: "success",
          message: "تذکره مفقانه آپلود شد."
        };
        dispatch("notification/add", notification, {root: true});
      }
    }).catch(error =>{
      let notification = {
        type: "error",
        message: error.message
      };
      dispatch("notification/add", notification, {root: true});
    })
  },
  async uploadStaffContract({dispatch},contract){
    let data = new FormData();
    data.append('staffContract',contract.staffContract);
    await axios.put("http://localhost:3000/staff/contract/upload/"+contract.id, data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      }
    }).then(response =>{
      if(response.status == 200)
      {
        let notification = {
          type: "success",
          message: "قرار داد کاری موفقانه در سیستم آپلود شد."
        };
        dispatch("notification/add", notification, {root: true});
      }
    }).catch(error =>{
      let notification = {
        type: "error",
        message: error.message
      };
      dispatch("notification/add", notification, {root: true});
    })
  }
};

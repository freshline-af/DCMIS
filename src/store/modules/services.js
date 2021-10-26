import axios from "axios";

export const namespaced = true;
export const state = {
  services: {
    one: { name: "معاینه دهن", stag:10, icon: "mdi-tooth-outline" },
    two: { name: "کشیدن دندان", stag:4, icon: "mdi-tooth-outline" },
    three: { name: "پوش کردن دندان", stag:2, icon: "mdi-tooth-outline" },
    four: { name: "پر کردن دندان", stag:1, icon: "mdi-tooth-outline" },
    five: { name: "ارتودانسی", stag:3, icon: "mdi-tooth-outline" },
    six: { name: "جراحی لثه دندان", stag:5, icon: "mdi-tooth-outline" },
    seven: { name: "جراحی ریشه دندان",stag:6, icon: "mdi-tooth-outline" },
    eight: { name: "سفید کردن دندان", stag:8, icon: "mdi-tooth-outline" },
    ten: { name: "پروتیز دندان", stag:7, icon:"mdi-tooth-outline" },
    nine: { name: "جرم گیری دندان", stag:9, icon: "mdi-tooth-outline" },
    
  },
  services_form_item: {
    page_title: "ثبت کردن مریض",
    name: "اسم",
    lastName: "تخلص",
    fName: "اسم پدر",
    tazkrahNum: "شماره تذکره",
    age: "سن",
    bloodGroup: "گروپ خون",
    phone: "شماره تماس",
    address: "آدرس",
    occupation: "شغل",
    photo: "عکس"
  },
  caseHistory:{
    heart: "آیا مرض قلبی دارد ؟",
    dieabet:"آیا قند خون دارد؟",
    blood:"آیا  فشار خون بلند دارد؟"

  },
  finace: {
    total_amount: "مبلغ قابل برداخت",
    received: "مبلغ برداخت شده",
    receiveable_amount: "مبلغ باقی مانده"
  },
  selectedServices:[]
};

export const mutations = {
  SET_SELECTED_SERVICES(state,data){
    state.selectedServices = data;
  }
};

export const actions = {
async  getSelectService({commit,dispatch},services){
 await axios.post("http://localhost:3000/patient/service/"+services.stag).then((response)=>{
    if(response.data === "Sorry, this service is not available."){
      commit("SET_SELECTED_SERVICES",[]);
       let notification = {
        type: "warning",
        message: "معذرت میخواهیم،این سرویس فعلا موجود نمی باشد."
      };
      dispatch("notification/add",notification,{root: true});
    
    }else if(response.data === "No data found."){
      commit("SET_SELECTED_SERVICES",[]);
      let notification = {
       type: "warning",
       message: "معذرت میخواهیم،این سرویس فعلا موجود نمی باشد."
     };
     dispatch("notification/add",notification,{root: true});
    }
    else if(response.status == 200){
      commit("SET_SELECTED_SERVICES",response.data);
    }
    
  }).catch((error)=>{
     let notification={
       type: "warning",
       message:error
     };
     dispatch("notification/add",notification,{root: true});
  });
  },
async addNewRound({dispatch},data){
   await axios.put("http://localhost:3000/patient/service/round/"+data._id+"/"+data.stag,data).then((response)=>{
      if(response.status == 200 && response.data ==="New round added."){
        let notification ={
          type:"success",
          message: "جلسه جدید موفقانه اضافه گردید."
        };
        dispatch("notification/add",notification,{root:true})
      }else {
        let notification ={
          type:"warning",
          message: "در قسمت ایجاد کردن جلسه جدید مشکل وجود دارد."
        };
        dispatch("notification/add",notification,{root:true})
      }
    }).catch((error)=>{
      let notification ={
        type:"warning",
        message: error
      };
      dispatch("notification/add",notification,{root:true})
    });
  }
};

export const getters = {};

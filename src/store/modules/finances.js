export const namespaced = true;

import axios  from "axios";

export const state ={
    dailyReport:[],
    equipment:[]
};
export const mutations = {
    ADD_DAILYREPORT(state,data){
        state.dailyReport= data;
    }
};
export const actions = {
    async  add_daily_report({dispatch},data){
    
     await axios.post("http://localhost:3000/expenses/new",data).then( response =>{
          
     if(response.status === 200){
                let notifacation={
                    type:"success",
                    message:response.data
                };
                dispatch("notification/add",notifacation,{root:true});
            }else{
                let notifacation={
                    type:"warning",
                    message:"وارد کردن بل جدید سیستم به مشکل مواجه شده است لطفا دوباره امتحان کنید."
                };
                dispatch("notification/add",notifacation,{root:true});
            }
        }).catch(error =>{
            let notifacation={
                type:"warning",
                message:error
            };
            dispatch("notification/add",notifacation,{root:true});
            throw error;
        })
       
    },
    async get_daily_report({commit,dispatch}){
        axios.get("http://localhost:3000/expenses/all").then(response =>{
            commit("ADD_DAILYREPORT", response.data);
        }).catch(error =>{
            let notification = {
                "type": "warning",
                "message":error
            }
            dispatch("notification/add",notification,{root:true});
            throw error;
        })
    }
};

export const namespaced = true;

import axios  from "axios";

export const state ={
    dailyReport:[]
};
export const mutations = {
    ADD_DAILYREPORT(state,data){
        state.dailyReport.push(data);
    }
};
export const actions = {
    async  add_daily_report({commit,dispatch},data){
        commit("ADD_DAILYREPORT",data);
     await axios.post("http://localhost:3000/expenses/new",data).then( response =>{
            if(response.status === 200){
                let notifacation={
                    type:"success",
                    message:"بل جدید موفقانه ثبت شد."
                };
                dispatch("notification/add",notifacation,{root:true});
            }
        }).catch(error =>{
            let notifacation={
                type:"warning",
                message:error.message
            };
            dispatch("notification/add",notifacation,{root:true});
        })
       
    }
};

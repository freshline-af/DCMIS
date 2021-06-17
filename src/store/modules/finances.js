export const namespaced = true;
export const state ={
    dailyReport:[]
};
export const mutations = {
    ADD_DAILYREPORT(state,data){
        state.dailyReport.push(data);
    }
};
export const actions = {
    add_daily_report({commit,dispatch},data){
        commit("ADD_DAILYREPORT",data);
        let notifacation={
            type:"success",
            message:"بل جدید موفقانه ثبت شد."
        };
        dispatch("notification/add",notifacation,{root:true});
    }
};

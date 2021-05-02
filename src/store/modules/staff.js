import axios from 'axios';

export const namespaced = true;
export const state = {
  // Array to store list of item which is show on tap in staff page
  items: [
    { id: "1", name: "لست کارمندان " },
    { id: "2", name: "راجستر کردن کارمند جدید" },
    { id: "3", name: "کارمندان حاضر" }
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
  }
};

import '@mdi/font/css/materialdesignicons.css'
import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    light: {},
  },
  icons:{
    iconfont: 'mdi'
  },
  rtl: true
});

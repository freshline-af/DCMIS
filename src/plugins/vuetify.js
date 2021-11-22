import '@mdi/font/css/materialdesignicons.css'

import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import config from '@/config'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
   themes:{
    light: config.light,
   
   } 
  },
  icons:{
    iconfont: 'mdi'
  },
  rtl: true
});

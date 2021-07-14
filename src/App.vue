<template>
  <v-app>
    <Appbar v-if="logedin"></Appbar>
    <v-main>
      <v-container>
        <Notification></Notification>
        <router-view :key="$route.fullPath"> </router-view>
      </v-container>
    </v-main>
    <Footar v-if="logedin"></Footar>
  </v-app>
</template>

<script>
import Appbar from "./views/master-layout/app-bar/appBar";
import Footar from "./views/master-layout/footer/footer.vue";
import Notification from "./components/NotificationContainer";
export default {
  name: "App",
  computed:{
   logedin() {
     if(JSON.parse(localStorage.getItem('user'))){
      return true;
     } else{
       return false
     }
   
  },
  },
  components: {
    Appbar,
    Footar,
    Notification
  }
  
}
</script>
<style>

</style>

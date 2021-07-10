<template>
  <v-app>
    <appbar v-if="!!login"></appbar>
    <v-main>
      <v-container>
        <notificationContainer/>
        <router-view :key="$route.fullPath"> </router-view>
      </v-container>
    </v-main>
    <footar v-if="!!login"></footar>
  </v-app>
</template>

<script>
import appbar from "./views/master-layout/app-bar/appBar";
import footar from "./views/master-layout/footer/footer.vue";
import notificationContainer from "./components/NotificationContainer"
import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {

    };
  },
  mounted() {
    this.login = mapState["logined"];
  },
  computed:{
   logedin() {
     return this.$store.getters.logedin
   }
  },
  components: {
    appbar,
    footar,
    notificationContainer
  }
};
</script>
<style>

</style>

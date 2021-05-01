<template>
  <v-app>
    <appbar v-if="logedin"></appbar>
    <v-main>
      <v-container>
        <router-view :key="$route.fullPath"> </router-view>
      </v-container>
    </v-main>
    <footar v-if="!login"></footar>
  </v-app>
</template>

<script>
import appbar from "./views/master-layout/app-bar/appBar";
import footar from "./views/master-layout/footer/footer.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {

    };
  },
  mounted() {
    this.login = mapState["login"];
  },
  computed:{
   logedin() {
     return this.$store.getters.logedin
   }
  },
  components: {
    appbar,
    footar
  }
};
</script>

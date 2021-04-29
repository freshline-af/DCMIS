<template>
  <v-app>
    <appbar v-if="!login"></appbar>
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
      login: ""
    };
  },
  mounted() {
    this.login = mapState["login"];
  },
  components: {
    appbar,
    footar
  }
};
</script>

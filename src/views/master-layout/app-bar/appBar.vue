<template>
  <div>
    <navegation :drawer="drawer"></navegation>
    <leftDrawer :leftDrawer="leftDrawer"></leftDrawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title> سیستم مدریت کلینک دندان</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-col cols="4" v-if="search">
        <v-text-field
          max-width="80"
          prepend-icon="mdi-magnify"
          outlined
          @click:prepend="searching = !searching"
          @keyup.enter="searching = !searching"
          rounded
          height="40"
          class="mt-6 ml-8 pa-3"
          single-line
          type="text"
          clearable
          :loading="searching"
          placeholder="لطفاً کلمه جستجو خود را وارد کنید"
          dense
        >
        </v-text-field>
      </v-col>
      <v-btn icon class="ml-1" @click="search = !search">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-avatar>
        <v-img src="../../../assets/face.png"> </v-img>
      </v-avatar>
      <v-btn icon @click.stop="leftDrawer = !leftDrawer">
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import navegation from "../drawer/navigationDrawer";
import leftDrawer from "../drawer/liftDrawer";

export default {
  components: {
    navegation,
    leftDrawer
  },
  data() {
    return {
      search: true,
      searching: false,
      drawer: false,
      leftDrawer: false
    };
  }
};
</script>

<style lang="scss" scoped></style>

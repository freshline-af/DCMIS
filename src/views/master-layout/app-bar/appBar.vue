<template>
  <div>
    <navegation :drawer="drawer"></navegation>
    <leftDrawer :leftDrawer="leftDrawer"></leftDrawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-card-title> سیستم مدیریت کلینک دندان</v-card-title>
      <v-spacer></v-spacer>
      <v-col cols="4" v-if="search">
        <v-text-field
          max-width="80"
          prepend-icon="mdi-magnify"
          outlined
          append-icon="mdi-close"
          @click:append="search = !search"
          @click:prepend="dosearch"
          @keyup.enter="keyEnterSearch"
          :loading="searching"
          rounded
          height="40"
          class="mt-6 ml-8 pa-3"
          single-line
          type="text"
          placeholder="لطفاً کلمه جستجو خود را وارد کنید"
          dense
        >
        </v-text-field>
      </v-col>
      <v-btn v-if="!search" icon class="ml-1" @click="showsearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-avatar>
        <v-icon v-if="!staff.photo">mdi-account</v-icon>
        <v-img v-else :src="'http://localhost:3000/uploads/docs/photo/'+staff.photo"> </v-img>
      </v-avatar>
      <v-btn icon @click.stop="leftDrawer = !leftDrawer">
        <v-icon>mdi-calendar-outline</v-icon>
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
      search: false,
      searching: false,
      drawer: false,
      leftDrawer: false,
      staff:{}
    };
  },
  mounted(){
this.staff = JSON.parse(localStorage.getItem("user"));
  },
  methods:{
    showsearch(){
      this.search = !this.search

    },
    dosearch(){
      this.searching = !this.searching
    },
    keyEnterSearch(){
      this.searching = !this.searching
      
    }
  }
};
</script>

<style lang="scss" scoped></style>

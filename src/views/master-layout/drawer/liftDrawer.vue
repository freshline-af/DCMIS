<template>
  <v-navigation-drawer temporary v-model="drawer" app>
    <v-date-picker
      year-icon="mdi-calendar-blank"
      full-width
      locale="fa-IR"
      first-day-of-week="6"
      rtl
      readonly
      show-current=""
    ></v-date-picker>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    leftDrawer: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      drawer: this.leftDrawer
    }
  },
  watch: {
    leftDrawer() {
      this.drawer = true;
    }
  },
};
</script>

<style lang="scss" scoped></style>

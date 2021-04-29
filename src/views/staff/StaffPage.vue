<template>
  <v-container>
    <v-tabs align-with-title v-model="tab" grow>
      <v-tab v-for="item in staff.items" :key="item.id">
        {{ item.name }}
      </v-tab>
    </v-tabs>
    <v-tabs-items continuous v-model="tab">
      <v-tab-item><AllStaff></AllStaff> </v-tab-item>
      <v-tab-item><Registar></Registar> </v-tab-item>
      <v-tab-item> <Present></Present> </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import staffRegistar from "./staffRegistar";
import AllStaff from "./listAllStaff";
import PresentStaff from "./PresentSatff";
import { mapState } from "vuex";
export default {
  components: {
    Registar: staffRegistar,
    AllStaff: AllStaff,
    Present: PresentStaff
  },
  data() {
    return {
      tab: null
    };
  },
  computed: {
    ...mapState(["staff"])
  }
};
</script>

<style lung="sass" scoped>
.v-tabs {
  width: 100%;
}
</style>

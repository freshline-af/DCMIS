<template>
  <div>
    <v-row class="mt-3">
      <v-col cols="12" md="3" lg="3" sm="6">
        <v-sheet v-ripple="{ center: true }" height="200" elevation="3">
          <v-card-title><h3 >تعداد کارمند</h3></v-card-title>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="3" lg="3" sm="6">
        <v-sheet v-ripple="{ center: true }" height="200" elevation="3">
          <v-card-title><h3>تعداد بیماران</h3></v-card-title>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="3" lg="3" sm="6">
        <v-sheet v-ripple="{ center: true }" height="200" elevation="3">
          <v-card-title><h3>تعداد تجهیزات</h3></v-card-title>
        </v-sheet>
      </v-col>
      <v-col cols="12" md="3" lg="3" sm="6">
        <v-sheet v-ripple="{ center: true }" height="200" elevation="3">
          <v-card-title><h3></h3></v-card-title>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {}
};
</script>

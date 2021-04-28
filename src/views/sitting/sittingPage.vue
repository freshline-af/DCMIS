<template>
  <v-card flat>
    <v-card-title class="mt-4">
      <h3>تظیمات برنامه</h3>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="mt-4">
      <v-row>
        <v-col>
          <v-switch
            v-model="$vuetify.theme.dark"
            hint="با فعال کردن این مود تمام صفحات به رنگ تاریک نشان داده میشود و باعث اذیت کردن چشم  نمی شود"
            inset
            label="فعال کردن نایت مود"
            persistent-hint
          ></v-switch>
        </v-col>
      </v-row>
      <v-row class="mt-8">
        <v-col cols="12" md="12" sm="12" lg="12">
          <h4><span>تغیر دادن زبان سیستم</span></h4>
        </v-col>
        <v-col cols="12" md="4" sm="12" lg="4">
          <v-select :items="items" label="انتخاب زبان" solo></v-select>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      items: ["فارسی", "پشتو", "انگلیسی"]
    };
  }
};
</script>

<style lang="scss" scoped></style>

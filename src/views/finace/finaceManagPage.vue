<template>
  <div>
    <v-tabs fixed-tabs v-model="tab">
      <v-tab>
        بل جدید
      </v-tab>
      <v-tab>
        راپور روزانه
      </v-tab>
      <v-tab>
        باقیات
      </v-tab>
      <v-tab>
        تجهیزات
      </v-tab>
      <v-tab>
        راپور مالی
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <CreateInvoce></CreateInvoce>
      </v-tab-item>
      <v-tab-item>
        <DayliReport></DayliReport>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import DayliReport from "./daylyReport";
import CreateInvoce from "./CreateInvoice.vue"
export default {
  data() {
    return {
      tab: ""
    };
  },
  components: {
    DayliReport,
    CreateInvoce
  }
};
</script>

<style lang="scss" scoped></style>

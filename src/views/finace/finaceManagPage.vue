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
        <DailyReport></DailyReport>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import CreateInvoce from "./CreateInvoice.vue"
import DailyReport from "./DailyReport.vue"
export default {
  data() {
    return {
      tab: ""
    };
  },
  components: {
    CreateInvoce,
    DailyReport
  }
};
</script>

<style lang="scss" scoped></style>

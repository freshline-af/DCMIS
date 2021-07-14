<template>
  <v-row class="mt-7">
    <v-col cols="12" md="4" lg="4" sm="8">
       <v-select
      :items="reportType"
      rounded
      outlined
      label="انتخاب کردن عنوان راپور"
      v-model="search"
      >
      </v-select>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="reportheader"
            :items="reportItems"
            :search="search"
            class="elevation-2"
          >
          <template v-slot:no-data>
            <span> هیچ رقم تا فعلا وارد نشده است</span>
          </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import Store from "../../store/index";
export default {
  data() {
    return {
      search:"مواد غذایی",
    reportheader: [
        {
          text: "اسم",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "توضیحات",
          align: "start",
          sortable: true,
          value: "description",
        },
        {
          text: "تعداد",
          align: "start",
          sortable: true,
          value: "total_number",
        },
        {
          text: "قیمت فی واحد",
          align: "start",
          sortable: true,
          value: "perunit_price",
        },
        {
          text: " مجموعی",
          align: "start",
          sortable: true,
          value: "total_price",
        },
        {
          text: " نوعیت",
          align: "start",
          sortable: true,
          value: "type",
        },
      ],
      reportType:[
         "مواد غذایی",
         "تجهیزات جدید",
          "داروهای جدید",
      ],
      reportItems:[]
    };
  },
  mounted(){
  this.initialize();
  },
  updated(){
    this.initialize();
  },
  methods:{
    initialize(){
      this.reportItems= Store.state.finances.dailyReport
      console.log(this.reportItems)
    }
  }
};
</script>

<style lang="scss" scoped></style>

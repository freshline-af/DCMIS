<template>
  <v-row class="mt-7">
    <v-col cols="12" md="4" lg="4" sm="8">
       <v-select
      :items="reportType"
      rounded
      outlined
      item-value="value"
      item-text="text"
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
      search:"food",
    reportheader: [
        {
          text: "آدی",
          align: "start",
          sortable: true,
          value: "_id",
        },
        {
          text: "تاریخ",
          align: "start",
          sortable: true,
          value: "purchased_at",
        },
        {
          text: "تعداد اقلام",
          align: "start",
          sortable: true,
          value: "total_item",
        },
        
        {
          text: " مچموع",
          align: "start",
          sortable: true,
          value: "grand_total",
        },
        {
          text: " نوعیت",
          align: "start",
          sortable: true,
          value: "category",
        },
      ],
      reportType: [
                    {text:"مواد غذایی",value:"food"},
                    {text:"تجهیزات جدید",value:"equipment"},
                   { text:"داروهای جدید",value:"medicines"},

                ],
      reportItems:[]
    };
  },
  mounted(){
  this.initialize();
  },
 
  methods:{
    initialize(){
      console.log(Store.state.finances.dailyReport.length)
      this.reportItems= Store.state.finances.dailyReport
    }
  },
};
</script>

<style lang="scss" scoped></style>

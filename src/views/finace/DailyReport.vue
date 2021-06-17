<template>
  <v-row>
    <!-- Daily food report -->
    <v-col cols="12">
        <strong>راپور مواد خوراکی </strong>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="foodheader"
            :items="foodItems"
            class="elevation-1"
          >
          </v-data-table>
        </v-col>
      </v-row>
    </v-col>
    <!-- Midison Daily Report -->
    <v-col cols="12" class="mt-5">
        <strong>راپور داروها</strong>
      <v-row>
        <v-col cols="12">
          <v-data-table
          :headers="medicineheader"
          :items="medicineItems"
          class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-col>
    <!-- Equepment Daily Report -->
    <v-col cols="12" class="mt-5">
        <strong>راپور تجهیزات</strong>
      <v-row>
        <v-col cols="12">
          <v-data-table
          :headers="equipmentheaders"
          :items="equipmentItem"
          class="elevation-3"
          ></v-data-table>
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
      dailyR :[],
      foodheader: [
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
      ],
      medicineheader:[
          {
              text: "اسم دارو",
              align:"start",
              sortable: true,
              value:"medicin_name"
          },
           {
              text: "توضیحات",
              align:"start",
              sortable: true,
              value:"medicin_description"
          },
           {
              text: "تعداد",
              align:"start",
              sortable: true,
              value:"medicin_total_number"
          },
           {
              text: "قیمت فی واحد",
              align:"start",
              sortable: true,
              value:"medicin_uniper_price"
          },
           {
              text: " مجموعی",
              align:"start",
              sortable: true,
              value:"medicin_total_price"
          }
      ],
      medicineItems:[],
      foodItems: [],
      equipmentheaders:[
        {
          text: "اسم تجهیز",
          sortable:true,
          align: "start",
          value: "equi_name"
        },
        {
          text: "توضیحات",
          sortable: true,
          align: "start",
          value:"equi_description",
        },
        {
          text: "تعداد",
          sortable: true,
          align: "start",
          value:"equi_total_number",
        },
        {
          text: "قیمت فی واحد",
          sortable: true,
          align: "start",
          value:"equi_perunit_price",
        },
        {
          text: "مجموعه ",
          sortable: true,
          align: "start",
          value:"equi_total_price",
        }
      ],
      equipmentItem:[]
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
      //var data = [];
      this.dailyR= Store.state.finances.dailyReport
      this.foodItems = this.dailyR;
      console.log(this.foodItems);

    }
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col class="mr-3 text-center" align-self="center" cols="2">
          <span>
            لیست بیماران
          </span>
        </v-col>
        <v-divider inset class=" my-8 mr-n8" vertical></v-divider>
        <v-col class="mr-2" cols="4">
          <v-text-field
            class="mt-6"
            prepend-icon="mdi-magnify"
            label="جستجو کردن"
            v-model="search"
            outlined
            rounded
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :search="search"
        :items="patients"
        :headers="patientsHeader"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn icon @click="showDeatils(item)"
            ><v-icon color="primary">mdi-text</v-icon></v-btn
          >
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import Store from "../../store/index"
export default {
 mounted() {
  
  },
 async beforeRouteEnter(routeTo,routeFrom,next){
     let data ={
      stag:localStorage.getItem("selectedServices")
    }
  await Store.dispatch("services/getSelectService",data);
    next();
  },
  data() {
    return {
      search: "",
      patients:Store.state.services.selectedServices,
      patientsHeader: [
        {
          text: "اسم",
          value: "firstname",
          sortable: true,
          clase: "font-weight-bold",
          align: "start",
        },
        {
          text: "اسم پدر",
          value: "fathername",
          sortable: true,
          align: "start",
        },
        {
          text: "جنسیت",
          value: "sex",
          sortable: false,
          align: "start",
        },
        {
          text: "حالت مدنی",
          value: "marital_status",
          sortable: false,
          align: "start",
        },
        {
          text: "شغل",
          value: "occupation",
          sortable: true,
          align: "start",
        },
        {
          text: "سن",
          value: "age",
          sortable: true,
          align: "start",
        },
        {
          text: "گروپ خون",
          value: "blood_group",
          sortable: false,
          align: "start",
        },
        {
          text: "نمبر تذکره",
          value: "tazkira_id",
          sortable: true,
          align: "start",
        },
        {
          text: "شماره تماس",
          value: "phone",
          sortable: true,
          align: "start",
        },
        {
          text: "عملیه",
          value: "actions",
          sortable: false,
          align: "start",
        },
      ],
    };
  },
  methods: {

    showDeatils(data) {
      this.$router.push({
        name: "selectedPatientService",
        params: { selectPatient: data },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

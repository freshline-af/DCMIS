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
export default {
  mounted() {
    let selectService = this.$route.params.selectedServices;
    console.log(selectService);
  },
  data() {
    return {
      search: "",
      patients: [
        {
          _id: "6163a284d16f2f1108faeb1b",
          registered_at: "2021-10-11T01:54:48.443Z",
          firstname: "یونس",
          lastname: "ابراهیمی",
          fathername: "ابراهیم",
          tazkira_id: "0773-4343-65454",
          occupation: "آزاد",
          age: 45,
          marital_status: "مجرد",
          blood_group: "O+",
          phone: "045-454-5454",
          sex: "مذکر",
          case_history: [
            {
              disease: "آیا مرض قلبی دارد ؟",
              result: true,
            },
            {
              disease: "آیا  فشار خون بلند دارد؟",
              result: false,
            },
            {
              disease: "آیا قند خون دارد؟",
              result: true,
            },
          ],
          appointment: [
            {
              stag: 10,
              mouth_testing: [
                {
                  fee: {
                    amount_received: 300,
                    amount_due: 300,
                    installment: 2,
                    dentist: "61498e40f46f5d25b893fb0b",
                  },
                  round: 1,
                  grand_total: 600,
                  meet_at: "2021-10-11T02:33:40.226Z",
                  description:
                    "این یک دیتا امتحانی در بخش معاینه دهن می باشد. این دیتا برای تست کردن می باشد.",
                },
              ],
            },
          ],
          __v: 0,
          address: "کابل، افغانستان",
        },
      ],
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

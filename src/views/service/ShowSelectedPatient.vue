<template>
  <v-row>
    <v-col cols="12" sm="2">
      <v-sheet rounded="lg" min-height="268">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <strong>معلومات شخصی</strong>
              </v-col>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="اسم"
                      v-model="selectPatient.firstname"
                      :value="selectPatient.firstname"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="تخلص"
                      v-model="selectPatient.lastname"
                      :value="selectPatient.lastname"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="mt-n5">
                <v-text-field
                  label="اسم پدر"
                  v-model="selectPatient.fathername"
                  :value="selectPatient.fathername"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n5">
                <v-text-field
                  label="شماره تماس"
                  v-model="selectPatient.phone"
                  :value="selectPatient.phone"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n5">
                <v-text-field
                  label="نمبر تذکره"
                  v-model="selectPatient.tazkira_id"
                  :value="selectPatient.tazkira_id"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col class="mt-n5" cols="12">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="جنسیت"
                      v-model="selectPatient.sex"
                      :value="selectPatient.age"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="سن"
                      v-model="selectPatient.age"
                      :value="selectPatient.age"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="mt-n5">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="گروپ خون"
                      v-model="selectPatient.blood_group"
                      :value="selectPatient.blood_group"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="حالت مدنی"
                      v-model="selectPatient.marital_status"
                      :value="selectPatient.marital_status"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>

    <v-col cols="12" sm="7">
      <v-sheet min-height="70vh" rounded="lg">
        <v-card>
          <v-card-title>
            <v-row>
              <v-col class=" text-center" align-self="center" cols="3">
                <span>
                  دفعات مراجعه
                </span>
              </v-col>
              <v-divider inset class=" my-8 mr-n6" vertical></v-divider>
              <v-col class="mr-2" cols="5">
                <v-text-field
                  class="mt-6"
                  prepend-icon="mdi-magnify"
                  label="جستجو کردن"
                  v-model="search"
                  outlined
                  rounded
                ></v-text-field>
              </v-col>
              <v-col cols="4" class=" text-center">
                <v-btn
                  large
                  outlined
                  rounded
                  elevation="2"
                  color="primary"
                  class=" mt-8"
                  >اضافه کردن جلسه</v-btn
                >
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table
            :items="SelectServices"
            :headers="selectPatientServiceHeader"
            :search="search"
          >
           <template v-slot:item.actions="{item}">
            <v-btn @click="showAppointment(item)" icon><v-icon color="primary">mdi-eye</v-icon></v-btn>
          </template>
          <template v-slot:item.meet_at ="{item}">
              {{getRealDate(item.meet_at)}}
          </template>
          </v-data-table>
        </v-card>
      </v-sheet>
    </v-col>

    <v-col cols="12" sm="3">
      <v-sheet rounded="lg" min-height="249">
        <v-card>
          <v-card-text>
            <template>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <strong>تاریخجه بیمار</strong>
                    <tr>
                      <th class="text-right">
                        نوعیت بیماری
                      </th>
                      <th>
                        نتیجه
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in selectPatient.case_history"
                      :key="item.name"
                    >
                      <td>{{ item.disease }}</td>
                      <td>
                        <v-chip
                          :color="item.result === true ? 'red' : 'primary'"
                          >{{ item.result === true ? "بلی" : "نخیر" }}</v-chip
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  mounted() {
    this.selectPatient = this.$route.params.selectPatient;
  },
  data: () => ({
    search: "",
    selectPatient: {},
    SelectServices: [
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
    selectPatientServiceHeader: [
      {
        text: "تاریخ مراجعه",
        value: "meet_at",
        sortable: true,
        align: "start",
      },
      {
        text: "جلسه",
        value: "round",
        sortable: true,
        align: "start",
      },
      {
        text: "مجموعه پول",
        value: "grand_total",
        sortable: true,
        align: "start",
      },
      {
        text: "محموعه دریافت شده",
        value: "fee.amount_received",
        sortable: true,
        align: "start",
      },
      {
        text: "محموعه باقی مانده",
        value: "fee.amount_due",
        sortable: true,
        align: "start",
      },
      {
        text: "عملیه",
        value: "actions",
        sortable: true,
        align: "start",
      },
    ],
  }),
  methods: {
      showAppointment(data) {
          console.log(data)
      },
       getRealDate(date) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var real_date = new Date(date);
      var month = real_date.getMonth();
      var year = real_date.getFullYear();
      var day = real_date.getDate() + " ";
      let newDate = day + " " + months[month] + " " + year;
      return newDate;
    },
  },
};
</script>

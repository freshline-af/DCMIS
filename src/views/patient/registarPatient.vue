<template>
  <div>
    <v-form ref="regis_patient" @submit.prevent="AddPatient" lazy-validation>
      <v-row class="mt-3">
        <v-col cols="6" md="6" sm="12" xs="12">
          <v-row>
            <v-col cols="12" md="12" sm="12" xs="12">
              <h3>معلومات شخصی</h3>
            </v-col>
            <v-col cols="12" md="6" sm="12" xs="12">
              <BaseEdittext
                :label="patient_label.name"
                type="text"
                hint="وارد کردن اسم الزامی می باشد"
                placeholder="لطفاً خود را وارد کنید"
                v-model="new_patient.name"
                picon="mdi-text"
              />
            </v-col>
            <v-col cols="12" md="6" sm="12" xs="12">
              <BaseEdittext
                :label="patient_label.lastName"
                hint="وارد کردن تخلص اختیاری می باشد"
                placeholder="لطفاً تخلص خود را وارد کنید"
                type="text"
                v-model="new_patient.lName"
                picon="mdi-text"
              />
            </v-col>
            <v-col cols="12" md="6" sm="12" xs="12">
              <BaseEdittext
                :label="patient_label.fName"
                hint="وراد کردن اسم پدر اختیاری می باشد"
                placeholder="لطفا اسم پدر خود را وارد کنید"
                type="text"
                v-model="new_patient.fName"
                picon="mdi-text-short"
              />
            </v-col>
            <v-col cols="12" md="6" sm="12" xs="12">
              <BaseEdittext
                :label="patient_label.age"
                hint="وارد کردن سن الزامی می باشد"
                placeholder="لطفا سن خود را وارد کنید"
                type="number"
                v-model="new_patient.phone"
                picon="mdi-numeric-0"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                :label="patient_label.phone"
                hint="وارد کردن شماره تماس الزامی می باشد"
                placeholder="لطفا شماره تماس خود را وارد کنید"
                type="number"
                v-model="new_patient.phone"
                picon="mdi-phone"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                :label="patient_label.address"
                hint="وارد کردن آدرس الزامی میباشد"
                placeholder="لطفا آدرس خود را وارد کنید"
                type="text"
                v-model="new_patient.address"
                picon="mdi-map-marker-outline"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                :label="patient_label.occupation"
                hint="وارد کردن شغل اختیاری میباشد"
                placeholder="لطفاشغل خود را وارد کنید"
                type="text"
                v-model="new_patient.job"
                picon="mdi-text-short"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                :label="patient_label.bloodGroup"
                hint="وارد کردن گروپ خون الزامی می باشد میباشد"
                placeholder="لطفاشغل خود را وارد کنید"
                type="text"
                v-model="new_patient.bloodGroup"
                picon="mdi-blood-bag"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-file-input
                :label="patient_label.photo"
                hint="وارد کردن عکس اختیاری می باشد میباشد"
                placeholder="لطفاعکس خود را وارد کنید"
                type="file"
                outlined
                rounded
                v-model="new_patient.photo"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" md="6" sm="12" xs="12">
          <v-row class="mr-md-5">
            <v-col cols="12">
              <h3>تاریخچه مریض</h3>
            </v-col>
            <v-col cols="12">
              <v-switch
                :label="patient_caseHistory.blood_pressure"
                v-model="new_patient.blood_pressure"
                messages="در صورت داشتن فشار خون سویج را آن کنید"
              ></v-switch>
            </v-col>
            <v-col cols="12">
              <v-switch
                :label="patient_caseHistory.heart_problem"
                v-model="new_patient.heart_problem"
                messages="در صورت داشتن مشکل فلبی سویج را آن کنید"
              ></v-switch>
            </v-col>
            <v-col cols="12">
              <v-switch
                :label="patient_caseHistory.diabetes"
                v-model="new_patient.diabetes"
                messages="در صورت داشتن دیابیت سویج را آن کنید"
              ></v-switch>
            </v-col>
            <v-col class="text-center mt-4">
              <v-btn rounded outlined elevation="2" @click="skipCaseHistory">
                صرف نظر کردن از تاریخچه مریض
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider class="mt-3"></v-divider>
      <v-row class="mt-3">
        <v-col class="text-left">
          <v-btn type="submit" outlined rounded>
            ثبت کردن
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  props: {
    patients: {
      type: Object
    }
  },
  data() {
    return {
      new_patient: {},
      patient_label: {},
      patient_caseHistory: {}
    };
  },
  mounted() {
    this.patient_label = this.$store.state.services.services_form_item;
    this.patient_caseHistory = this.$store.state.services.caseHistory;
    this.new_patient = this.patients;
    console.log(this.new_patient);
  },
  methods: {
    AddPatient() {
      this.$store.dispatch("patient/add_patient", this.new_patient);
    },
    skipCaseHistory() {
      (this.new_patient.blood_pressure = false),
        (this.new_patient.heart_problem = false),
        (this.new_patient.diabetes = false);
    }
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <v-form ref="regis_patient" @submit.prevent="AddPatient" lazy-validation>
      <v-row class="mt-3">
        <v-col cols="6" md="6" sm="12" xs="12">
          <v-row>
            <v-col cols="12" md="12" sm="12" xs="12">
              <h3>معلومات شخصی</h3>
            </v-col>
            <v-col cols="12">
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12" md="6" sm="12" xs="12">
              <BaseEdittext
                label="اسم"
                type="text"
                hint="وارد کردن اسم الزامی می باشد"
                placeholder="لطفاً خود را وارد کنید"
                v-model="new_patient.name"
                picon="mdi-text"
              />
            </v-col>
            <v-col cols="12" md="6" sm="12" xs="12">
              <BaseEdittext
                label="تخلص"
                hint="وارد کردن تخلص اختیاری می باشد"
                placeholder="لطفاً تخلص خود را وارد کنید"
                type="text"
                v-model="new_patient.lName"
                picon="mdi-text"
              />
            </v-col>
            <v-col cols="12" md="6" sm="12" xs="12">
              <BaseEdittext
                label="نام پدر"
                hint="وراد کردن اسم پدر اختیاری می باشد"
                placeholder="لطفا اسم پدر خود را وارد کنید"
                type="text"
                v-model="new_patient.fName"
                picon="mdi-text-short"
              />
            </v-col>
            <v-col cols="12" md="6" sm="12" xs="12">
              <BaseEdittext
                label="سن"
                hint="وارد کردن سن الزامی می باشد"
                placeholder="لطفا سن خود را وارد کنید"
                type="number"
                v-model="new_patient.phone"
                picon="mdi-numeric-0"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                label="نمبر تماس"
                hint="وارد کردن شماره تماس الزامی می باشد"
                placeholder="لطفا شماره تماس خود را وارد کنید"
                type="number"
                v-model="new_patient.phone"
                picon="mdi-phone"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                label="آدرس"
                hint="وارد کردن آدرس الزامی میباشد"
                placeholder="لطفا آدرس خود را وارد کنید"
                type="text"
                v-model="new_patient.address"
                picon="mdi-map-marker-outline"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                label="شغل"
                hint="وارد کردن شغل اختیاری میباشد"
                placeholder="لطفاشغل خود را وارد کنید"
                type="text"
                v-model="new_patient.job"
                picon="mdi-text-short"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                label="گروپ خون"
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
            <v-col>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="12" md="4" sm="12">
                  <h3>{{ patient_caseHistory.heart }}</h3>
                </v-col>
                <v-radio-group v-model="heart" mandatory>
               <v-row>
                  <v-col><v-radio label="بلی" value="yes"></v-radio></v-col>
                <v-col><v-radio label="نخیر" value="no"></v-radio></v-col>
               </v-row>
              </v-radio-group>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="12" md="4" sm="12">
                  <h3 class="mt-2">{{ patient_caseHistory.dieabet }}</h3>
                </v-col>
                  <v-radio-group v-model="dieabet" mandatory>
                    <v-row>
                      <v-col><v-radio label="بلی" value="بلی"></v-radio></v-col>
                      <v-col
                        ><v-radio label="نخیر" value="نخیر"></v-radio
                      ></v-col>
                    </v-row>
                  </v-radio-group>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <h3>{{ patient_caseHistory.blood }}</h3>
                </v-col>
              <v-radio-group v-model="blood" mandatory>
                <v-row>
                  <v-col>
                    <v-radio label="بلی" value="بلی"></v-radio>
                  </v-col>
                  <v-col>
                    <v-radio label="نخیر" value="نخیر"></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
              </v-row>
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
      type: Object,
    },
  },
  data() {
    return {
      heart: "نخیر",
      dieabet:"نخیر",
      blood:"نخیر",
      new_patient: {},
      patient_label: {},
      patient_caseHistory: [],
      
    };
  },
  mounted() {
    //this.patient_label = this.$store.state.services.services_form_item;
    this.patient_caseHistory = this.$store.state.services.caseHistory;
    this.new_patient = this.patients;
  },
  methods: {
    AddPatient() {
     let case_history =[
        {
          disease: this.patient_caseHistory.heart,
          result: this.heart
        },
        {
          disease: this.patient_caseHistory.blood,
          result: this.blood
        },
        {
          disease: this.patient_caseHistory.dieabet,
          result: this.dieabet
        }

      ]
      //this.$store.dispatch("patient/add_patient", this.new_patient);
      console.log(case_history)
    },
    skipCaseHistory() {
      (this.dieabet = "نخیر"),
        (this.blood = "نخیر"),
        (this.heart = "نخیر");
    },
  },
};
</script>

<style lang="scss" scoped></style>

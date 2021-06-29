<template>
  <div>
    <v-form
      v-model="registarForm"
      ref="regis_patient"
      @submit.prevent="AddPatient"
      lazy-validation
    >
      <v-row class="mt-3" justify="center">
        <v-col align="center" cols="12" md="12" sm="12" xs="12">
          <h1>معلومات شخصی</h1>
        </v-col>
        <v-col cols="12" align="center">
          <v-row justify="center">
            <v-col cols="12" md="6" lg="6" xl="6" sm="6">
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-3">
          <v-row justify="center">
            <v-col cols="12" md="6" sm="12" xs="12">
              <BaseEdittext
                label="اسم"
                type="text"
                hint="وارد کردن اسم الزامی می باشد"
                placeholder="لطفاً خود را وارد کنید"
                v-model="new_patient.firstname"
                picon="mdi-account"
                :rules="rule.rules.required_text"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-n2">
          <v-row justify="center">
            <v-col cols="12" md="6" sm="12" xs="12">
              <BaseEdittext
                label="تخلص"
                hint="وارد کردن تخلص اختیاری می باشد"
                placeholder="لطفاً تخلص خود را وارد کنید"
                :rules="rule.rules.text"
                type="text"
                v-model="new_patient.lastname"
                picon="mdi-account"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-n2">
          <v-row justify="center">
            <v-col cols="12" md="6" sm="12" xs="12">
              <BaseEdittext
                label="نام پدر"
                hint="وراد کردن اسم پدر اختیاری می باشد"
                placeholder="لطفا اسم پدر خود را وارد کنید"
                type="text"
                :rules="rule.rules.required_text"
                v-model="new_patient.fathername"
                picon="mdi-account"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-n2">
          <v-row justify="center">
            <v-col cols="12" md="6" sm="12" xs="12">
              <BaseEdittext
                label="سن"
                hint="وارد کردن سن الزامی می باشد"
                placeholder="لطفا سن خود را وارد کنید"
                type="number"
                :rules="rule.rules.required_number"
                v-model="new_patient.age"
                picon="mdi-numeric-0"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-n2">
          <v-row justify="center">
            <v-col cols="12" md="6" xl="6" lg="6" sm="12" xs="12">
              <BaseEdittext
                label="نمبر تماس"
                hint="وارد کردن شماره تماس الزامی می باشد"
                placeholder="لطفا شماره تماس خود را وارد کنید"
                type="number"
                :rules="rule.rules.phone"
                v-model="new_patient.phone"
                picon="mdi-phone"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-n2">
          <v-row justify="center">
            <v-col cols="12" md="6" lg="6" xl="6" sm="12" xs="12">
              <BaseEdittext
                label="آدرس"
                hint="وارد کردن آدرس الزامی میباشد"
                placeholder="لطفا آدرس خود را وارد کنید"
                type="text"
                :rules="rule.rules.text"
                v-model="new_patient.address"
                picon="mdi-map-marker-outline"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-n2">
          <v-row justify="center">
            <v-col cols="6" md="6" sm="12" xs="12">
              <BaseEdittext
                label="شغل"
                hint="وارد کردن شغل اختیاری میباشد"
                placeholder="لطفاشغل خود را وارد کنید"
                type="text"
                :rules="rule.rules.text"
                v-model="new_patient.occupation"
                picon="mdi-text-short"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-n2">
          <v-row justify="center">
            <v-col cols="6" md="6" sm="12" xs="12">
              <v-select
                label="جنسیت"
                :items="sex"
                outlined
                :rules="rule.rules.select"
                rounded
                required
                v-model="new_patient.sex"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-n2">
          <v-row justify="center">
            <v-col cols="6" md="6" sm="12" xs="12">
              <v-select
                label="گروپ خون"
                hint="وارد کردن گروپ خون الزامی می باشد میباشد"
                v-model="new_patient.blood_group"
                outlined
                rounded
                :rules="rule.rules.select"
                :items="blood_gropu"
                prepend-icon="mdi-blood-bag"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-n2">
          <v-row justify="center">
            <v-col cols="6" md="6" sm="12" xs="12">
              <v-select
                label="نوعیت مریضی"
                :items="services"
                v-model="new_patient.disease"
                :rules="rule.rules.select"
                outlined
                rounded
                required
              >
              </v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-n2">
          <v-row justify="center">
            <v-col cols="6" md="6" sm="12" xs="12">
              <v-select
                label="حالت مدنی"
                v-model="new_patient.marital_status"
                outlined
                rounded
                required
                :rules="rule.rules.select"
                :items="marital_status"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-n2">
          <v-row justify="center">
            <v-col cols="6" md="6" sm="12" xs="12">
              <BaseEdittext
                label="نمبر تذکره"
                v-model="new_patient.tazkira_id"
                placeholder="نمبر تذکره خود را وارد کنید"
                type="number"
                picon="mdi-number"
                :rules="rule.rules.number"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="mt-n2">
          <v-row justify="center">
            <v-col cols="12" md="6" xl="6" lg="6" sm="12" xs="12">
              <v-file-input
                :label="patient_label.photo"
                hint="وارد کردن عکس اختیاری می باشد میباشد"
                placeholder="لطفاعکس خود را وارد کنید"
                type="file"
                :rules="rule.rules.file"
                outlined
                rounded
                v-model="new_patient.photo"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-col>
            <v-col cols="12" >
             <v-row justify="center">
               <v-col align="center" cols="12" md="6" sm="12" lg="6">
                  <h1>هزینه</h1>
               </v-col>
             </v-row>
            </v-col>
            <v-col cols="12">
              <v-row justify="center">
                <v-col cols="12" md="6" lg="6" sm="12">
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </v-col>
           <v-col cols="12">
             <v-row justify="center">
                <v-col cols="6" md="6" sm="12" xs="12">
              <BaseEdittext
                label="مصارف کل"
                v-model="fee.total_amount"
                :rules="rule.rules.required_number"
                type="number"
                hint="وارد کردن مصرف الزامی می باشد"
              />
            </v-col>
             </v-row>
           </v-col>
            <v-col cols="12" class="mt-n2">
              <v-row justify="center">
                <v-col cols="6" md="6" sm="12" xs="12">
              <v-select
                label="اقساط"
                v-model="fee.installments"
                :items="installments"
                :rules="rule.rules.select"
                outlined
                rounded
              >
              </v-select>
            </v-col>
              </v-row>
            </v-col>
          <v-col cols="12" class="mt-n2">
             <v-row justify="center" v-if="fee.installments != 'تکمیل'" >
            <v-col cols="12" md="6">
              <BaseEdittext
                label="مبلغ قابل پرداخت"
                v-model="fee.payiad"
                type="number"
                :rules="rule.rules.number"
                placeholder="مقدرا قابل پرداخت را وارد کنید"
              />
            </v-col>
          </v-row>
          </v-col>

            <v-col cols="12" align="center">
              <h1>تاریخچه مریض</h1>
            </v-col>
            <v-col cols="12">
             <v-row justify="center">
               <v-col cols="12" md="6" sm="12">
                  <v-divider></v-divider>
               </v-col>
             </v-row>
            </v-col>
            <v-col cols="12">
              <v-row justify="center">
                <v-col cols="12" md="4" sm="12">
                  <h3>{{ patient_caseHistory.heart }}</h3>
                </v-col>
                <v-radio-group v-model="heart" mandatory>
                  <v-row>
                    <v-col><v-radio label="بلی" value="بلی"></v-radio></v-col>
                    <v-col><v-radio label="نخیر" value="نخیر"></v-radio></v-col>
                  </v-row>
                </v-radio-group>
              </v-row>
            </v-col>
            <v-col cols="12" class="mt-n2">
              <v-row justify="center">
                <v-col cols="12" md="4" sm="12">
                  <h3 class="mt-2">{{ patient_caseHistory.dieabet }}</h3>
                </v-col>
                <v-radio-group v-model="dieabet" mandatory>
                  <v-row>
                    <v-col><v-radio label="بلی" value="بلی"></v-radio></v-col>
                    <v-col><v-radio label="نخیر" value="نخیر"></v-radio></v-col>
                  </v-row>
                </v-radio-group>
              </v-row>
            </v-col>
            <v-col cols="12" class="mt-n2">
              <v-row justify="center">
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

            <v-col class="text-center mt-2">
              <v-btn rounded outlined elevation="2" @click="skipCaseHistory">
                صرف نظر کردن از تاریخچه مریض
              </v-btn>
            </v-col>
          </v-row>
      <v-divider class="mt-3"></v-divider>
      <v-row class="mt-3">
        <v-col class="text-left">
          <v-btn :disabled="!registarForm" type="submit" outlined rounded>
            ثبت کردن
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import rules from "../../validation/validationRules.js";
export default {
  props: {
    patients: {
      type: Object,
    },
  },
  data() {
    return {
      rule: rules,
      registarForm: null,
      heart: "نخیر",
      dieabet: "نخیر",
      blood: "نخیر",
      fee: [
        {
          total_amount: "",
          payiad: "",
          installments: "",
          date: "",
        },
      ],
      new_patient: {},
      marital_status: ["مجرد", "متاهل"],
      sex: ["مذکر", "مونث"],
      blood_gropu: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
      services: [
        "پرکردن دندان",
        "عصب کشی دندان",
        "پوش کردن دندان",
        "سفید کردن دندان",
        "ارتودانسی",
        "جراحی دندان",
        "پروتیز دندان",
        "معاینه دندان",
        "نصب نگین ",
        "امپلیت دندان",
      ],
      installments: ["تکمیل", "دو قسط", "سه فسط"],

      patient_label: {},
      patient_caseHistory: [],
    };
  },
  mounted() {
    //this.patient_label = this.$store.state.services.services_form_item;
    this.patient_caseHistory = this.$store.state.services.caseHistory;
  },
  methods: {
    AddPatient() {
      if (this.$refs.regis_patient.validate()) {
        this.new_patient.case_history = [
          {
            disease: this.patient_caseHistory.heart,
            result: this.heart,
          },
          {
            disease: this.patient_caseHistory.blood,
            result: this.blood,
          },
          {
            disease: this.patient_caseHistory.dieabet,
            result: this.dieabet,
          },
        ];
        this.new_patient.fee = this.fee;
        this.$store.dispatch("patient/addPatient", this.new_patient);
        //this.$store.dispatch("patient/getListOfPatient")
        this.$refs.regis_patient.reset();
        //window.location.reload();
      }
    },
    skipCaseHistory() {
      (this.dieabet = "نخیر"), (this.blood = "نخیر"), (this.heart = "نخیر");
    },
  },
};
</script>

<style lang="scss" scoped></style>

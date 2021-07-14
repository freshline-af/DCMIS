<template>
  <v-row>
    <v-col cols="12" md="12" sm="12" lg="12" xl="12">
      <h2>راجستر کردن بیمار جدید</h2>
    </v-col>
    <v-col cols="12" xl="12" md="12" sm="12">
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="step > 1">
            معلومات شخصی
          </v-stepper-step>
          <v-stepper-step step="2" :complete="step > 2">
            تاریخجه مریضی
          </v-stepper-step>
          <v-stepper-step step="3" :complete="step > 3">
            نوعیت بیماری
          </v-stepper-step>
          <v-stepper-step step="4" :complete="step > 4">
            هزینه
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-form
              v-model="registarForm"
              ref="regis_patient"
              @submit.prevent="AddPatient"
              lazy-validation
            >
              <v-row class="mt-4" justify="center">
                <v-col align="start" cols="12" md="6" sm="12" xs="12">
                  <h2 class="mt-2">لطفا معلومات شخصی خود را وارد کنید</h2>
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
                      <v-autocomplete
                        label="سن"
                        outlined
                        rounded
                        :items="age"
                        type="number"
                        :rules="rule.rules.required_number"
                        v-model="new_patient.age"
                        prepend-icon="mdi-numeric-0"
                      />
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
                            prepend-icon="mdi-gender-male-female-variant"
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
                            picon="mdi-numeric"
                            :rules="rule.rules.number"
                          />
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
                  </v-row>
                </v-col>
                <v-col cols="12" md="12" sm="12" lg="12" xl="12">
                  <v-row>
                    <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                      <v-btn text>
                        برگشت
                      </v-btn>
                    </v-col>
                    <v-col
                      class="text-end"
                      cols="12"
                      md="6"
                      lg="6"
                      xl="6"
                      sm="12"
                      ><v-btn color="primary" @click="step = 2">
                        بعدی
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-form>
              <v-row justify="center">
                <v-col cols="12" md="6">
                  <h2>لطفا تاریخجه بیمار را وارد کیند</h2>
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
                        <v-col
                          ><v-radio label="بلی" value="بلی"></v-radio
                        ></v-col>
                        <v-col
                          ><v-radio label="نخیر" value="نخیر"></v-radio
                        ></v-col>
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
                        <v-col
                          ><v-radio label="بلی" value="بلی"></v-radio
                        ></v-col>
                        <v-col
                          ><v-radio label="نخیر" value="نخیر"></v-radio
                        ></v-col>
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
                <v-col cols="12" md="12" sm="12" lg="12" xl="12">
                  <v-row>
                    <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                      <v-btn @click="step = 1" text>
                        برگشت
                      </v-btn>
                    </v-col>
                    <v-col
                      class="text-end"
                      cols="12"
                      md="6"
                      lg="6"
                      xl="6"
                      sm="12"
                      ><v-btn color="primary" @click="step = 3">
                        بعدی
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-stepper-content>
          <v-stepper-content step="3">
            <v-form>
              <v-row justify="center">
                <v-col cols="12" md="6">
                  <h2>لطفا نوعیت و جزییات بیماری را وارد کنید</h2>
                </v-col>
                <v-col cols="12">
                  <v-row justify="center">
                    <v-col cols="12" md="6" sm="12">
                      <v-divider></v-divider>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="mt-n2">
                  <v-row justify="center">
                    <v-col cols="6" md="6" sm="12" xs="12">
                      <v-autocomplete
                        label="نوعیت مریضی"
                        :items="services"
                        v-model="new_patient.disease"
                        :rules="rule.rules.select"
                        outlined
                        rounded
                        required
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  v-if="new_patient.disease === 'پور کاری دندان'"
                  cols="12"
                  class="mt-n2"
                >
                  <v-row justify="center">
                    <v-col cols="6" md="6" sm="12" xs="12">
                      <v-autocomplete
                        label=" نوعیت مواد"
                        :items="theet_filling_matieral"
                        v-model="new_patient.matiral"
                        :rules="rule.rules.select"
                        outlined
                        rounded
                        required
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  v-if="new_patient.disease === 'پوش کردن دندان ها'"
                  cols="12"
                  class="mt-n2"
                >
                  <v-row justify="center">
                    <v-col cols="6" md="6" sm="12" xs="12">
                      <v-autocomplete
                        label=" نوعیت مواد"
                        :items="theet_cover_matieral"
                        v-model="new_patient.matiral"
                        :rules="rule.rules.select"
                        outlined
                        rounded
                        required
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  v-if="new_patient.type_surgary === 'کشیدن دندان ها'"
                  cols="12"
                  class="mt-n2"
                >
                  <v-row justify="center">
                    <v-col cols="6" md="6" sm="12" xs="12">
                      <v-autocomplete
                        label="نوعیت دندان"
                        :items="type_pull_out_theeth"
                        v-model="new_patient.type_pull_out"
                        :rules="rule.rules.select"
                        outlined
                        rounded
                        required
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  v-if="new_patient.disease === 'جراحی دندان'"
                  cols="12"
                  class="mt-n2"
                >
                  <v-row justify="center">
                    <v-col cols="6" md="6" sm="12" xs="12">
                      <v-autocomplete
                        label=" نوعیت جراحی"
                        :items="type_surgary"
                        v-model="new_patient.type_surgary"
                        :rules="rule.rules.select"
                        outlined
                        rounded
                        required
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  v-if="new_patient.disease === 'پروتیز دندان'"
                  cols="12"
                  class="mt-n2"
                >
                  <v-row justify="center">
                    <v-col cols="6" md="6" sm="12" xs="12">
                      <v-autocomplete
                        label="نوعیت پروتیز"
                        :items="type_protis"
                        v-model="new_patient.prutise"
                        :rules="rule.rules.select"
                        outlined
                        rounded
                        required
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  v-if="new_patient.type_surgary === 'جراحی لثه'"
                  cols="12"
                  class="mt-n2"
                >
                  <v-row justify="center">
                    <v-col cols="6" md="6" sm="12" xs="12">
                      <v-autocomplete
                        label="گواردینات"
                        :items="type_quardinat"
                        v-model="new_patient.type_pull_out"
                        :rules="rule.rules.select"
                        outlined
                        rounded
                        required
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  class="mt-n2"
                  v-if="
                    new_patient.disease === 'پور کاری دندان' ||
                      new_patient.disease === 'پوش کردن دندان ها' ||
                      new_patient.disease === 'ارتودانسی' ||
                      new_patient.disease === 'پروتیز دندان'
                  "
                >
                  <v-row justify="center">
                    <v-col cols="6" md="6" sm="6" xs="12">
                      <v-autocomplete
                        label="فک"
                        :items="type_fack"
                        v-model="new_patient.top_right"
                        :rules="rule.rules.select"
                        outlined
                        rounded
                        required
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="mt-n2">
                  <v-row justify="center">
                    <v-col cols="6" md="6" sm="6" xs="12">
                      <v-autocomplete
                        label="چپ و یا راست"
                        :items="direction"
                        v-model="new_patient.direction"
                        :rules="rule.rules.select"
                        outlined
                        rounded
                        required
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="mt-n2">
                  <v-row justify="center">
                    <v-col cols="6" md="6" sm="6" xs="12">
                      <v-autocomplete
                        label="دندان"
                        :items="theeths"
                        v-model="new_patient.direction"
                        :rules="rule.rules.select"
                        outlined
                        rounded
                        required
                      >
                      </v-autocomplete>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" class="mt-n2">
                  <v-row justify="center">
                    <v-col cols="6" md="6" sm="6" xs="12">
                      <v-textarea
                        label="نوت"
                        v-model="new_patient.description"
                        outlined
                        rounded
                        required
                      >
                      </v-textarea>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="12" sm="12" lg="12" xl="12">
                  <v-row>
                    <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                      <v-btn @click="step = 2" text>
                       برگشت
                      </v-btn>
                    </v-col>
                    <v-col
                      class="text-end"
                      cols="12"
                      md="6"
                      lg="6"
                      xl="6"
                      sm="12"
                      ><v-btn color="primary" @click="step = 4">
                        بعدی
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-stepper-content>
          <v-stepper-content step="4">
            <v-form>
              <v-row justify="center">
                <v-col cols="12">
                  <v-row justify="center">
                    <v-col align="start" cols="12" md="6" sm="12" lg="6">
                      <h2>هزینه ها</h2>
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
                  <v-row justify="center" v-if="fee.installments != 'تکمیل'">
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
                <v-col cols="12" md="12" sm="12" lg="12" xl="12">
                  <v-row>
                    <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                      <v-btn @click="step = 3" text>
                       برگشت
                      </v-btn>
                    </v-col>
                    <v-col
                      class="text-end"
                      cols="12"
                      md="6"
                      lg="6"
                      xl="6"
                      sm="12"
                      ><v-btn color="primary" @click="step = 4">
                        ثبت کردن
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
  </v-row>
</template>

<script>
import rules from "../../validation/validationRules.js";
export default {
  data() {
    return {
      age: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "34",
        "35",
        "26",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "49",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "59",
        "60",
        "61",
        "62",
        "63",
        "64",
        "65",
        "67",
        "68",
        "68",
        "70",
        "71",
        "72",
        "73",
        "74",
        "75",
        "76",
        "77",
        "78",
        "79",
        "80",
        "81",
        "82",
        "83",
        "84",
        "85",
        "86",
        "87",
        "88",
        "89",
        "80",
        "91",
        "92",
        "93",
        "94",
        "95",
        "96",
        "97",
        "98",
        "99",
        "100",
        "101",
        "102",
        "103",
        "104",
        "105",
        "106",
        "107",
        "108",
        "109",
        "110",
        "111",
        "112",
        "113",
        "114",
        "115",
      ],
      rule: rules,
      step: 1,
      registarForm: null,
      heart: "نخیر",
      dieabet: "نخیر",
      blood: "نخیر",
      type_pull_out_theeth: ["ساده", "عقلی", "امپکت"],
      type_surgary: ["کشیدن دندان ها", "جراحی لثه", "جراحی ریشه"],
      type_quardinat: ["1", "2", "3", "4"],
      theeths: ["1", "2", "3", "4", "5", "6", "7", "8"],
      fee: [
        {
          total_amount: "",
          payiad: "",
          installments: "",
          date: "",
        },
      ],
      theet_filling_matieral: ["کامپوزیت", "املگم", "سایر مواد"],
      theet_cover_matieral: ["پورسلن", "میتل", "زرگونیم", "گیگم"],
      new_patient: {},
      marital_status: ["مجرد", "متاهل"],
      sex: ["مذکر", "مونث"],
      blood_gropu: [
        "A+",
        "B+",
        "AB+",
        "O+",
        "A-",
        "B-",
        "AB-",
        "O-",
        "نمی دانم",
      ],
      services: [
        "پور کاری دندان",
        "پوش کردن دندان ها",
        "سفید کردن دندان",
        "ارتودانسی",
        "جراحی دندان",
        "پروتیز دندان",
        "معاینه دندان",
        "نصب نگین ",
        "امپلیت دندان",
      ],
      type_protis: ["پروتیز قسمی", "پروتیز کامل"],
      type_fack: ["بالا", "پایین", "هردو"],
      direction: ["راست", "چپ"],
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

<template>
  <v-form
    @submit.prevent="submitInfo"
    ref="employRegistar"
    v-model="employeRegistarForm"
    lazy-validation
  >
    <v-row fill-height>
      <v-row justify-space-around>
        <v-col class=" mt-2 px-10" cols="12" md="6" lg="6" sm="12" xl="6">
          <v-row class="mt-4 elevation-1">
            <v-col cols="12">
              <strong>معلومات شخصی</strong>
            </v-col>
            <v-col cols="12">
              <v-divider></v-divider>
            </v-col>
            <v-col class="mt-3" cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                label="نام"
                placeholder="نام خود را وارد کنید"
                picon="mdi-account-outline"
                v-model="employe.firstname"
                :rules="Rules.rules.required_text"
              >
              </BaseEdittext>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                label="تخلص"
                placeholder="تخلص خود را وارد کنید"
                picon="mdi-account-outline"
                v-model="employe.lastname"
                :rules="Rules.rules.text"
              >
              </BaseEdittext>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                label="نام پدر"
                placeholder="نام پدر خود را وارد کنید"
                picon="mdi-account-outline"
                v-model="employe.fathername"
                :rules="Rules.rules.required_text"
              >
              </BaseEdittext>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                label="شماره تذکره"
                type="number"
                placeholder="شماره تذکره خود را وارد کنید"
                picon="mdi-numeric"
                v-model="employe.tazkira_id"
                :rules="Rules.rules.number"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                label="شماره تماس"
                placeholder="شماره تماس خود را وارد کنید"
                picon="mdi-phone"
                type="number"
                v-model="employe.phone1"
                :rules="Rules.rules.required_phone"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                label="آدرس"
                placeholder="آدرس خود را وارد کنید"
                picon="mdi-map-outline"
                type="text"
                v-model="employe.address"
                :rules="Rules.rules.required_text"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-file-input
                label="عکس"
                placeholder="عکس خود را وارد کنید"
                outlined
                rounded
                prepend-icon="mdi-camera"
                type="file"
                accept="image/*"
                v-model="employe.photo"
                :rules="Rules.rules.file"
              >
              </v-file-input>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-file-input
                label="کاپی تذکره"
                placeholder="کاپی تذکره خود را وارد کنید"
                outlined
                rounded
                prepend-icon="mdi-file"
                type="file"
                accept="image/*"
                v-model="employe.tazkira_copy"
                :rules="Rules.rules.required_file"
              >
              </v-file-input>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class=" px-10   mt-2" md="6" sm="12" xl="6">
          <v-row class="mt-4 elevation-1">
            <v-col cols="12">
              <strong>تحصیلات</strong>
            </v-col>
            <v-col cols="12"><v-divider></v-divider></v-col>
            <v-col class="mt-5" cols="12" md="12" sm="12" xs="12">
              <v-select
                label="درجه تحصیل"
                prepend-icon="mdi-school-outline"
                placeholder="درجه تحصیل خود را وارد کنید"
                :items="edu_degree"
                v-model="employe.edu_level"
                outlined
                rounded
                :rules="Rules.rules.text"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                label="رشته تحصیلی"
                picon="mdi-school-outline"
                placeholder="رشته تحصیلی خود را وارد کنید"
                type="text"
                v-model="employe.edu_field"
                :rules="Rules.rules.text"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <BaseEdittext
                label="پوهنتون"
                picon="mdi-school-outline"
                placeholder="نام پوهنتون را وارد کنید"
                type="text"
                v-model="employe.edu_university"
                :rules="Rules.rules.text"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-row>
              <v-col cols="12" md="6" sm="12" xs="12" lg="6" xl="6">
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    rounded
                    v-model="edu_start_date"
                    label="تاریخ آغاز "
                    readonly
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="edu_start_date"
                  no-title
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6" sm="12" xs="12" lg="6">
              <v-menu
                ref="menu3"
                v-model="menu3"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    rounded
                    v-model="edu_end_date"
                    label="تاریخ ختم"
                    readonly
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="edu_end_date"
                  no-title
                  @input="menu3 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="mt-2 elevation-1">
            <v-col cols="12" class="mt-3">
              <strong>وظیفه </strong>
            </v-col>
            <v-col cols="12">
              <v-divider class=""></v-divider>
            </v-col>

            <v-col cols="12" md="12" sm="12" xs="12" lg="12" xl="12">
              <BaseEdittext
                label="عنوان وظیفه"
                type="text"
                placeholder="عنوان وظیفه خود را وارد کنید"
                picon="mdi-briefcase-outline"
                v-model="employe.position"
                :rules="Rules.rules.required_text"
              />
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12" lg="12" xl="12">
              <BaseEdittext
                label="معاش"
                placeholder="معاش خود را وارد کنید"
                picon="mdi-cash-refund"
                type="number"
                v-model="employe.salary"
                :rules="Rules.rules.required_number"
              />
            </v-col>

            <v-col cols="12" md="12" sm="12" xs="12">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    rounded
                    v-model="hired_at"
                    label="تاریخ آغاز کار"
                    readonly
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="hired_at"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
     <v-row class="mt-5 pa-4">
        <v-col class="text-right text-xs-center" cols="6" md="6" sm="6" xs="6">
          <v-btn @click="reset" color="red" outlined>هذف کردن</v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="text-left" cols="6" sm="6" xs="6" md="6">
          <v-btn
            type="submit"
            width="300"
            color="green"
            :disabled="!employeRegistarForm"
            outlined
            elevation="5"
            >ثبت کردن</v-btn
          >
        </v-col>
      </v-row>
  </v-form>
</template>

<script>
import Rules from "../../validation/validationRules";
import Store from "../../store/index"
export default {
  data() {
    return {
      Rules,
      menu1: false,
      menu2:false,
      menu3:false,
      employeRegistarForm: null,
      hired_at: "",
      edu_start_date:"",
      edu_end_date: "",
      dateFormatted: "",
      employe: { 
        hired_at: this.hired_at,
        edu_start_date: this.edu_start_date,
        edu_end_date: this.edu_end_date
         },
      edu_degree:[
        "دوازده پاس",
        "چهارده پاس",
        "لیسانس",
        "ماستر",
        "دوکتور",
      ]
    };
  },
  methods: {
    reset() {
      this.$refs.employRegistar.reset();
    },
    submitInfo() {
      if (this.$refs.employRegistar.validate()) {
        Store.dispatch("staff/addEmploye", this.employe)
        window.scrollTo(0,0)
        console.log(this.employe)
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

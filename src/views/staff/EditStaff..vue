<template>
  <v-form
    @submit.prevent="updateStaff"
    ref="employRegistar"
    v-model="employeRegistarForm"
    lazy-validation
  >
    <v-row fill-height>
      <v-row justify="center">
        <v-col class=" mt-2 px-10" cols="12" md="12" lg="12" sm="12" xl="12">
          <v-row class="mt-4 elevation-1">
            <v-col cols="12">
              <strong>معلومات شخصی</strong>
            </v-col>
            <v-col cols="12">
              <v-divider></v-divider>
            </v-col>
            <v-col class="mt-3" cols="12" md="12" sm="12" xs="12">
              <v-row justify="center">
                <v-col cols="12" md="6" lg="6" sm="12" xl="6">
                  <BaseEdittext
                    label="نام"
                    placeholder="نام خود را وارد کنید"
                    picon="mdi-account-outline"
                    v-model="staff.firstname"
                    :values="staff.firstname"
                    :rules="Rules.rules.required_text"
                  >
                  </BaseEdittext>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-row justify="center">
                <v-col cols="12" md="6" lg="6" sm="12" xl="6">
                  <BaseEdittext
                    label="تخلص"
                    placeholder="تخلص خود را وارد کنید"
                    picon="mdi-account-outline"
                    v-model="staff.lastname"
                    :values="staff.lastname"
                    :rules="Rules.rules.text"
                  >
                  </BaseEdittext>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-row justify="center">
                <v-col cols="12" md="6" lg="6" sm="12" xl="6">
                  <BaseEdittext
                    label="نام پدر"
                    placeholder="نام پدر خود را وارد کنید"
                    picon="mdi-account-outline"
                    v-model="staff.fathername"
                    :values="staff.fathername"
                    :rules="Rules.rules.required_text"
                  >
                  </BaseEdittext>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-row justify="center">
                <v-col cols="12" md="6" lg="6" sm="12" xl="6">
                  <v-text-field
                    label="شماره تذکره"
                    type="text"
                    rounded
                    outlined
                    placeholder="شماره تذکره خود را وارد کنید"
                    prepend-icon="mdi-numeric"
                    @input="formatTazkira_number"
                    v-model="tazkira_id"
                    :vlaues="tazkira_id"
                    :rules="Rules.rules.tazkira_id"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-row justify="center">
                <v-col cols="12" md="6" lg="6" sm="12" xl="6">
                  <v-text-field
                    label="شماره تماس"
                    rounded
                    outlined
                    placeholder="شماره تماس خود را وارد کنید"
                    prepend-icon="mdi-phone"
                    type="text"
                    @input="formatPhoneNumber"
                    v-model="phone_number"
                    :values="phone_number"
                    :rules="Rules.rules.required_phone"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-row justify="center">
                <v-col cols="12" md="6" lg="6" sm="12" xl="6">
                  <BaseEdittext
                    label="آدرس"
                    placeholder="آدرس خود را وارد کنید"
                    picon="mdi-map-outline"
                    type="text"
                    v-model="staff.address"
                    :values="staff.address"
                    :rules="Rules.rules.required_text"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="mt-4 elevation-1">
            <v-col cols="12">
              <strong>تحصیلات</strong>
            </v-col>
            <v-col cols="12"><v-divider></v-divider></v-col>
            <v-col class="mt-5" cols="12" md="12" sm="12" xs="12">
              <v-row justify="center">
                <v-col cols="12" md="6" lg="6" sm="12" xl="6">
                  <v-select
                    label="درجه تحصیل"
                    prepend-icon="mdi-school-outline"
                    placeholder="درجه تحصیل خود را وارد کنید"
                    :items="edu_degree"
                    v-model="staff.edu_level"
                    :value="staff.edu_level"
                    outlined
                    rounded
                    :rules="Rules.rules.required_text"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-row justify="center">
                <v-col cols="12" md="6" lg="6" sm="12" xl="6">
                  <BaseEdittext
                    label="رشته تحصیلی"
                    picon="mdi-school-outline"
                    placeholder="رشته تحصیلی خود را وارد کنید"
                    type="text"
                    v-model="staff.edu_field"
                    :values="staff.edu_field"
                    :rules="Rules.rules.required_text"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-row justify="center">
                <v-col cols="12" md="6" lg="6" sm="12" xl="6">
                  <BaseEdittext
                    label="پوهنتون"
                    picon="mdi-school-outline"
                    placeholder="نام پوهنتون را وارد کنید"
                    type="text"
                    v-model="staff.edu_university"
                    :values="staff.edu_university"
                    :rules="Rules.rules.required_text"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12">
              <v-row>
                <v-col cols="12" md="12" sm="12" xs="12" lg="12" xl="12">
                  <v-row justify="center">
                    <v-col cols="12" md="6" lg="6" sm="12" xl="6">
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
                            :value=" edu_start_date"
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
                  </v-row>
                </v-col>
                <v-col cols="12" md="12" sm="12" xs="12" lg="12">
                  <v-row justify="center">
                    <v-col cols="12" md="6" lg="6" sm="12" xl="6">
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
                            :value="edu_end_date"
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
              <v-row justify="center">
                <v-col cols="12" md="6" lg="6" sm="12" xl="6">
                  <BaseEdittext
                    label="عنوان وظیفه"
                    type="text"
                    placeholder="عنوان وظیفه خود را وارد کنید"
                    picon="mdi-briefcase-outline"
                    v-model="staff.position"
                    :values="staff.position"
                    :rules="Rules.rules.required_text"
                  />
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="12" sm="12" xs="12" lg="12" xl="12">
              <v-row justify="center">
                <v-col cols="12" md="6" lg="6" sm="12" xl="6">
                  <BaseEdittext
                    label="معاش"
                    placeholder="معاش خود را وارد کنید"
                    picon="mdi-cash-refund"
                    type="number"
                    v-model="staff.salary"
                    :values="staff.salary"
                    :rules="Rules.rules.required_number"
                  />
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="12" md="12" sm="12" xs="12">
              <v-row justify="center">
                <v-col cols="12" md="6" lg="6" sm="12" xl="6">
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
                        :value="hired_at"
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
        </v-col>
      </v-row>
    </v-row>
    <v-row class="mt-5 pa-4">
      <v-col class="text-right text-xs-center" cols="6" md="6" sm="6" xs="6">
        <v-btn  width="200" elevation="5" @click="reset" color="red" class="white--text" large>لغو کردن</v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col class="text-left" cols="6" sm="6" xs="6" md="6">
        <v-btn
          type="submit"
          width="200"
          color="primary"
          :disabled="!employeRegistarForm"
          large
          elevation="5"
          >تغیر دادن</v-btn
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
      staff: {},
      phone_number:"",
      tazkira_id:"",
      Rules,
      menu1: false,
      menu2: false,
      menu3: false,
      employeRegistarForm: null,
      hired_at: "",
      edu_start_date: "",
      edu_end_date: "",
      dateFormatted: "",
      edu_degree: ["دوازده پاس", "چهارده پاس", "لیسانس", "ماستر", "دوکتور"],
    };
  },
  mounted() {
    this.staff = this.$route.params.staff;
    this.edu_start_date = this.getRealDate(this.staff.edu_start_date);
    this.edu_end_date = this.getRealDate(this.staff.edu_end_date);
    this.hired_at = this.getRealDate(this.staff.hired_at);
    this.phone_number = this.staff.phone1;
    this.tazkira_id = this.staff.tazkira_id;
  },
  methods:{
      reset() {
      this.$router.push({name: "staff"})
    },
    getRealDate(date){
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var real_date = new Date(date);
      var month = real_date.getMonth();
      var year = real_date.getFullYear();
      var day = real_date.getDate();
      return  months[month] +"-" + year+"-" +day ;
    },
   async updateStaff(){
      this.staff.hired_at = this.hired_at;
      this.staff.edu_start_date = this.edu_start_date;
      this.staff.edu_end_date = this.edu_end_date;
      this.staff.phone1 = this.phone_number;
      this.staff.tazkira_id = this.tazkira_id
      await Store.dispatch("staff/editStaff",this.staff);
      await Store.dispatch("staff/getStaff")
      this.$router.push({name:"staff"});


    },
    formatTazkira_number(){
      var tazkira = this.tazkira_id.replace(/\D/g,'').match(/(\d{0,4})(\d{0,4})(\d{0,5})/);
      this.tazkira_id = !tazkira[2] ? tazkira[1] :  tazkira[1] + '-' + tazkira[2] + (tazkira[3] ? '-' +tazkira[3]: '');
    },
    formatPhoneNumber(){
      var phone = this.phone_number.replace(/\D/g,'').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.phone_number = !phone[2] ? phone[1] :  phone[1] + '-' + phone[2] + (phone[3] ? '-' +phone[3]: '');
      
    },
  }
};
</script>

<style lang="scss" scoped></style>

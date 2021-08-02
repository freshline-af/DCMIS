<template>
  <v-row  class="mt-4">
    <v-col align="right" class="mt-4 " cols="12" md="3" lg="3" xl="3" sm="4">
      <v-row class="elevation-1" justify="center">
        <v-col cols="12" align="center">
          <v-avatar size="90" color="primary">
            <span class="white--text">{{ employe.firstname }}</span>
          </v-avatar>
        </v-col>
        <v-col cols="12"><v-divider></v-divider></v-col>
        <v-col class="mr-4" cols="12">
          <div>
            <span class=" gray--text pr-2 label">اسم :</span>
            <span class="show_detial pr-2">
              {{ employe.firstname }}
            </span>
          </div>
        </v-col>
        <v-col class="mr-4" cols="12">
          <div>
            <span class=" label">تخلص :</span>
            <span class="show_detial pr-2">{{ employe.lastname }}</span>
          </div>
        </v-col>
        <v-col class="mr-4" cols="12">
          <div>
            <span class=" gray--text label">اسم پدر :</span>
            <span class="show_detial pr-2">
              {{ employe.fathername }}
            </span>
          </div>
        </v-col>
        <v-col class="mr-4" cols="12">
          <div>
            <span class=" gray--text label"> نمبر تماس اولی :</span>
            <span class="show_detial pr-2">
              {{ employe.phone1 }}
            </span>
          </div>
        </v-col>
        <v-col v-if="employe.phone2" class="mr-4" cols="12">
          <div>
            <span class=" gray--text label"> نمبر تماس دومی :</span>
            <span class="show_detial pr-2">
              {{ employe.phone2 }}
            </span>
          </div>
        </v-col>
        <v-col class="mr-4" cols="12">
          <div>
            <span class=" gray--text label"> آدرس :</span>
            <span class="show_detial pr-2">
              {{ employe.address }}
            </span>
          </div>
        </v-col>
        <v-col class="mr-4" cols="12">
          <div>
            <span class=" gray--text label"> شماره تذکره :</span>
            <span class="show_detial pr-2">
              {{ employe.tazkira_id }}
            </span>
          </div>
        </v-col>
        <v-col class="mr-4" cols="12">
          <div>
            <span class=" gray--text label"> درجه تحصیلی :</span>
            <span class="show_detial pr-2">
              {{ employe.edu_level }}
            </span>
          </div>
        </v-col>
        <v-col class="mr-4" cols="12">
          <div>
            <span class=" gray--text label"> پوهنتون :</span>
            <span class="show_detial pr-2">
              {{ employe.edu_university }}
            </span>
          </div>
        </v-col>
        <v-col class="mr-4" cols="12">
          <div>
            <span class=" gray--text label"> تاریخ آغاز :</span>
            <span class="show_detial pr-2">
              {{ getRealDate(employe.edu_start_date) }}
            </span>
          </div>
        </v-col>
        <v-col class="mr-4" cols="12">
          <div>
            <span class=" gray--text label">تاریخ ختم :</span>
            <span class="show_detial pr-2">
              {{ getRealDate(employe.edu_end_date) }}
            </span>
          </div>
        </v-col>
        <v-col class="mr-4" cols="12">
          <div>
            <span class=" gray--text label"> مقام :</span>
            <span class="show_detial pr-2">
              {{ employe.position }}
            </span>
          </div>
        </v-col>
        <v-col class="mr-4" cols="12">
          <div>
            <span class=" gray--text label"> تاریخ آغاز کار :</span>
            <span class="show_detial pr-2">
              {{ getRealDate(employe.hired_at) }}
            </span>
          </div>
        </v-col>
        <v-col class="mr-4" cols="12">
          <div>
            <span class=" gray--text label"> معاش :</span>
            <span class="show_detial pr-2"> {{ employe.salary }} افغانی </span>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="9" lg="9" xl="9" sm="8">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <span>اسناد تحصیلی</span>
              <v-spacer></v-spacer>
              <v-btn @click="edu_dialog = !edu_dialog" icon>
                <v-icon color="primary">mdi-cloud-upload-outline</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col align="center" class="pa-12">
                  <v-icon x-large color="warning">mdi-alert-outline</v-icon>
                  <br />
                  <span class="pt-8 show_detial"
                    >لطفااسناد های تحصیلی خود را در سیستم اپلود نماید.</span
                  >
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <span>تذکره</span>
              <v-spacer></v-spacer>
              <v-btn @click="tazkira_dialog = !tazkira_dialog" icon>
                <v-icon color="primary">mdi-cloud-upload-outline</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col align="center" class="pa-12">
                  <v-icon x-large color="warning">mdi-alert-outline</v-icon>
                  <br />
                  <span class="pt-8 show_detial"
                    >لطفا تذکره خود را در سیستم اپلود نماید.</span
                  >
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <span>قرارداد کاری</span>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon color="primary">mdi-cloud-upload-outline</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col align="center" class="pa-12">
                  <v-icon x-large color="warning">mdi-alert-outline</v-icon>
                  <br />
                  <span class="pt-8 show_detial"
                    >لطفا قرارداد کاری خود را در سیستم اپلود نماید.</span
                  >
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <span>حساب کاربری</span>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon color="primary"
                  >mdi-card-account-details-outline</v-icon
                >
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col align="center" class="pa-12">
                  <v-icon x-large color="warning">mdi-alert-outline</v-icon>
                  <br />
                  <span class="pt-8 show_detial"
                    >لطفابرای وارد شدن کارمند به سیستم یوزرنیم و پسورد انتخاب
                    نماید.</span
                  >
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <!-- dialog for upload education document -->
    <v-dialog width="900" v-model="edu_dialog">
      <v-card>
        <v-card-title
          >ثبت کردن اسناد تحصیلی
          <v-spacer></v-spacer>
          <v-btn icon @click="edu_dialog = !edu_dialog">
            <v-icon color="warning">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
          <v-form v-model="edu_form_doc" ref="edu_from_document" @submit.prevent="SubmitEduDoc">
            <v-card-text>
            <v-row justify="center">
            <v-col class="mt-8" cols="12" md="6" lg="6" sm="12" xl="6">
              <v-file-input
                label="اسناد تحصیلی"
                v-model="edu_doc.files"
                outlined
                rounded
                show-size
                counter
                accept=".pdf, .zip"
                :rules="rules.rules.required_file"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="mt-3">
          <v-btn class="mb-3" outlined  color="warning" @click="edu_dialog =! edu_dialog">
            لغو کردن
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!edu_form_doc" type="submit" class="mb-3" outlined  color="primary">
            ثبت کردن
          </v-btn>
        </v-card-actions>
          </v-form>

      </v-card>
    </v-dialog>
    <!-- dialog for upload Tazkira-------- -->
    <v-dialog width="900" v-model="tazkira_dialog">
      <v-card>
        <v-card-title
          >ثبت کردن تذکره 
          <v-spacer></v-spacer>
          <v-btn icon @click="tazkira_dialog = !tazkira_dialog">
            <v-icon color="warning">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
          <v-form v-model="tazkira_form" ref="tazkira_from_document" @submit.prevent="SubmitTazkiraDoc">
            <v-card-text>
            <v-row justify="center">
            <v-col class="mt-8" cols="12" md="6" lg="6" sm="12" xl="6">
              <v-file-input
                label="تذکره خود را انتخاب نماید."
                v-model="tazkira_doc.files"
                outlined
                rounded
                show-size
                counter
                accept=".pdf,Image/*"
                :rules="rules.rules.required_file"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="mt-3">
          <v-btn class="mb-3" outlined  color="warning" @click="tazkira_dialog =! tazkira_dialog">
            لغو کردن
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!tazkira_form" type="submit" class="mb-3" outlined  color="primary">
            ثبت کردن
          </v-btn>
        </v-card-actions>
          </v-form>

      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import rules from "../../validation/validationRules.js";
export default {
  mounted() {
    this.employe = this.$route.params.employe;
  },
  data() {
    return {
      employe: {},
      rules: rules,
      // Education
      edu_doc:{},
      edu_dialog: false,
      edu_form_doc:null,
      // Tazkira
      tazkira_dialog:false,
      tazkira_form:null,
      tazkira_doc:{}

    };
  },
  methods: {
    getRealDate(date) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      var real_date = new Date(date);
      var month = real_date.getMonth();
      var year = real_date.getFullYear();
      var day = real_date.getDate();
      return months[month] + "-" + year + "-" + day;
    },
    SubmitEduDoc(){
      if(this.$refs.edu_from_document.validate()){
       this.edu_doc.id = this.employe._id;
       console.log(this.edu_doc)
      }
    },
    SubmitTazkiraDoc(){
      if(this.$refs.tazkira_from_document.validate()){
        this.tazkira_doc.id = this.employe._id;
        console.log(this.tazkira_doc)
      }
    }
  },
};
</script>

<style scoped>
.show_detial {
  font-family: "Times New Roman", Times, serif;
  size: 1.975rem;
  font-weight: 500;
}
.label {
  font-family: "Times New Roman", Times, serif;
  size: 2.975rem;
  font-weight: 700;
}
</style>

<template>
  <v-form
    @submit.prevent="submitInfo"
    ref="employRegistar"
    v-model="employeRegistarForm"
    lazy-validation
  >
    <v-container fill-height>
      <div class="mt-8 mr-3">
        <p>معلومات شخصی</p>
      </div>
      <v-divider width="1600" class="mt-7 mr-16"></v-divider>
      <v-row>
        <v-col class="mt-5" cols="12" md="4" sm="12" xs="12">
          <BaseEdittext
            label="نام"
            placeholder="نام خود را وارد کنید"
            picon="mdi-account-outline"
            v-model="employe.name"
            :rules="Rules.rules.required_text"
          >
          </BaseEdittext>
        </v-col>
        <v-col class=" mt-md-5" cols="12" md="4" sm="12" xs="12">
          <BaseEdittext
            label="تخلص"
            placeholder="تخلص خود را وارد کنید"
            picon="mdi-account-outline"
            v-model="employe.lastName"
            :rules="Rules.rules.text"
          >
          </BaseEdittext>
        </v-col>
        <v-col class="mt-md-5" cols="12" md="4" sm="12" xs="12">
          <BaseEdittext
            label="نام پدر"
            placeholder="نام پدر خود را وارد کنید"
            picon="mdi-account-outline"
            v-model="employe.fName"
            :rules="Rules.rules.required_text"
          >
          </BaseEdittext>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" sm="12" xs="12">
          <BaseEdittext
            label="شماره تذکره"
            type="number"
            placeholder="شماره تذکره خود را وارد کنید"
            picon="mdi-numeric"
            v-model="employe.tazkarahNum"
            :rules="Rules.rules.number"
          />
        </v-col>
        <v-col cols="12" md="4" sm="12" xs="12">
          <BaseEdittext
            label="شماره تماس"
            placeholder="شماره تماس خود را وارد کنید"
            picon="mdi-phone"
            type="number"
            v-model="employe.phone"
            :rules="Rules.rules.required_phone"
          />
        </v-col>
        <v-col cols="12" md="4" sm="12" xs="12">
          <BaseEdittext
            label="آدرس"
            placeholder="آدرس خود را وارد کنید"
            picon="mdi-map-outline"
            type="text"
            v-model="employe.address"
            :rules="Rules.rules.required_text"
          />
        </v-col>
        <v-col cols="12" md="4" sm="12" xs="12">
          <v-file-input
            label="عکس"
            placeholder="عکس خود را وارد کنید"
            outlined
            rounded
            prepend-icon="mdi-picture"
            type="file"
            accept="image/*"
            v-model="employe.photo"
            :rules="Rules.rules.file"
          >
          </v-file-input>
        </v-col>
        <v-col cols="12" md="4" sm="12" xs="12">
          <v-file-input
            label="گاپی تذکره"
            placeholder="گاپی تذکره خود را وارد کنید"
            outlined
            rounded
            prepend-icon="mdi-file"
            type="file"
            accept="image/*"
            v-model="employe.copyTazkrah"
            :rules="Rules.rules.required_file"
          >
          </v-file-input>
        </v-col>
      </v-row>
      <div class="mt-8 mr-4">
        <p>تحصیلات</p>
      </div>
      <v-divider class="mr-16 mt-7"></v-divider>
      <v-row>
        <v-col class="mt-5" cols="12" md="4" sm="12" xs="12">
          <BaseEdittext
            label="درجه تحصیل"
            picon="mdi-school-outline"
            placeholder="درجه تحصیل خود را وارد کنید"
            type="text"
            v-model="employe.eduDegree"
            :rules="Rules.rules.text"
          />
        </v-col>
        <v-col class=" mt-md-5" cols="12" md="4" sm="12" xs="12">
          <BaseEdittext
            label="رشته تحصیلی"
            picon="mdi-school-outline"
            placeholder="رشته تحصیلی خود را وارد کنید"
            type="text"
            v-model="employe.eduField"
            :rules="Rules.rules.text"
          />
        </v-col>
        <v-col class=" mt-md-5" cols="12" md="4" sm="12" xs="12">
          <BaseEdittext
            label="پوهنتون"
            picon="mdi-school-outline"
            placeholder="نام پوهنتون را وارد کنید"
            type="text"
            v-model="employe.university"
            :rules="Rules.rules.text"
          />
        </v-col>
        <v-col cols="12" md="4" sm="12" xs="12" class="mt-md-5">
          <v-file-input
            type="file"
            label="اسناد تحصیلی"
            placeholder="اسناد تحصیلی خود را وارد کنید"
            prepend-icon="mdi-file"
            v-model="employe.eduDocument"
            :rules="Rules.rules.file"
            outlined
            rounded
          />
        </v-col>
      </v-row>
      <div class="mt-8 mr-5">
        <p>وظیفه که استخدام می شود</p>
      </div>
      <v-divider class="mr-16 mt-7"></v-divider>
      <v-row>
        <v-col cols="12" md="4" sm="12" xs="12" class="mt-5">
          <BaseEdittext
            label="وظیفه"
            type="text"
            placeholder="عنوان وظیفه خود را وارد کنید"
            picon="mdi-briefcase-outline"
            v-model="employe.job"
            :rules="Rules.rules.required_text"
          />
        </v-col>
        <v-col class="mt-md-5" cols="12" md="4" sm="12" xs="12">
          <BaseEdittext
            label="معاش"
            placeholder="معاش خود را وارد کنید"
            picon="mdi-number"
            type="number"
            v-model="employe.salary"
            :rules="Rules.rules.required_number"
          />
        </v-col>
        <v-col class="mt-md-5" cols="12" md="4" sm="12" xs="12">
          <v-file-input
            label="قرار داد خط"
            placeholder="قرار داد خود را وارد کنید"
            prepend-icon="mdi-number"
            type="file"
            v-model="employe.jobContract"
            :rules="Rules.rules.required_file"
            outlined
            rounded
          />
        </v-col>
        <v-col cols="12" md="4" sm="12" xs="12">
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
                v-model="date"
                label="تاریخ آغاز کار"
                readonly
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="12" xs="12" md="8">
          <v-textarea
            outlined
            rounded
            prepend-icon="mdi-text"
            label="مسولیت ها"
            placeholder="مسولیت های وظیفه خود را وارد کنید"
            v-model="employe.jobsDescription"
            type="text"
            rows="4"
            :rules="Rules.rules.text"
          />
        </v-col>
      </v-row>
      <v-row><v-divider class="mt-8"></v-divider></v-row>
      <v-row class="mt-5">
        <v-col class="text-right text-xs-center" cols="6" md="6" sm="6" xs="6">
          <v-btn @click="reset" rounded outlined elevation="3">هذف کردن</v-btn>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="text-left" cols="6" sm="6" xs="6" md="6">
          <v-btn
            type="submit"
            :disabled="!employeRegistarForm"
            rounded
            outlined
            elevation="3"
            >ثبت کردن</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import Rules from "../../validation/validationRules";
export default {
  data() {
    return {
      Rules,
      menu1: false,
      employeRegistarForm: null,
      date: "",
      dateFormatted: "",
      employe: { date: this.date }
    };
  },
  methods: {
    reset() {
      this.$refs.employRegistar.reset();
    },
    submitInfo() {
      if (this.$refs.employRegistar.validate()) {
        this.$store.dispatch("staff/set_employe", this.employe).then(()=>{
          this.reset();
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <v-row class="mt-4">
    <v-col align="right" class="mt-4 " cols="12" md="3" lg="3" xl="3" sm="4">
      <v-row class="elevation-1" justify="center">
        <v-col cols="12" align="center">
          <v-avatar
            @click="photo_dialog = !photo_dialog"
            size="90"
            color="primary"
          >
            <v-icon v-if="!employe.photo" x-large color="white"
              >mdi-account</v-icon
            >
            <v-img
              v-else
              :src="'http://localhost:3000/uploads/docs/photo/' + employe.photo"
            ></v-img>
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
                <v-col
                  v-if="!employe.edu_docs"
                  cols="12"
                  align="center"
                  class="pa-12"
                >
                  <v-icon x-large color="warning">mdi-alert-outline</v-icon>
                  <br />
                  <span class="pt-8 show_detial"
                    >لطفااسناد تحصیلی خود را در سیستم اپلود نمایید.</span
                  >
                </v-col>
                <v-col v-else cols="12" align="center" class="pa-8">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th>
                            درجه تحصیلی
                          </th>
                          <th>
                            رشته تحصیلی
                          </th>
                          <th>
                            دیپلوم
                          </th>
                          <th>
                            مشاهده کردن دیپلوم
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{ employe.edu_level }}</td>
                          <td>{{ employe.edu_university }}</td>
                          <td>{{ employe.edu_docs }}</td>
                          <td>
                            <v-btn
                              icon
                              color="primary"
                              target="_blank"
                              :href="
                                'http://localhost:3000/uploads/docs/education/' +
                                  employe.edu_docs
                              "
                              ><v-icon>mdi-eye</v-icon></v-btn
                            >
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
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
                <v-icon v-if="!employe.tazkira_copy" color="primary">mdi-cloud-upload-outline</v-icon>
                <v-icon color="primary" v-else>mdi-pencil</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col
                  v-if="!employe.tazkira_copy"
                  align="center"
                  class="pa-12"
                >
                  <v-icon x-large color="warning">mdi-alert-outline</v-icon>
                  <br />
                  <span class="pt-8 show_detial"
                    >لطفا تذکره خود را در سیستم اپلود نمایید.</span
                  >
                </v-col>
                <v-col v-else cols="12" align="center" class="pa-8">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th>
                            شماره تذکره
                          </th>
                          <th>
                            تذکره
                          </th>
                          <th>
                            مشاهده کردن تذکره
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{ employe.tazkira_id }}</td>
                          <td>{{ employe.tazkira_copy }}</td>
                          <td>
                            <v-btn
                              icon
                              color="primary"
                              target="_blank"
                              :href="
                                'http://localhost:3000/uploads/docs/tazkira/' +
                                  employe.tazkira_copy
                              "
                              ><v-icon>mdi-eye</v-icon></v-btn
                            >
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
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
              <v-btn @click="contract_dialog = !contract_dialog" icon>
                <v-icon color="primary">mdi-cloud-upload-outline</v-icon>
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col v-if="!employe.contract" align="center" class="pa-12">
                  <v-icon x-large color="warning">mdi-alert-outline</v-icon>
                  <br />
                  <span class="pt-8 show_detial"
                    >لطفا قرارداد کاری خود را در سیستم اپلود نمایید.</span
                  >
                </v-col>
                <v-col v-else cols="12" align="center" class="pa-8">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th>
                            تاریخ آغاز کار
                          </th>
                          <th>
                            قرار داد کاری
                          </th>
                          <th>
                            مشاهده کردن قرارداد
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{ getRealDate(employe.hired_at) }}</td>
                          <td>{{ employe.contract }}</td>
                          <td>
                            <v-btn
                              icon
                              color="primary"
                              target="_blank"
                              :href="
                                'http://localhost:3000/uploads/docs/contract/' +
                                  employe.contract
                              "
                              ><v-icon>mdi-eye</v-icon></v-btn
                            >
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
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
              <v-btn @click="sign_up_dialog = !sign_up_dialog" icon>
                <v-icon color="primary"
                  >mdi-card-account-details-outline</v-icon
                >
              </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row>
                <v-col v-if="!employe.username" align="center" class="pa-12">
                  <v-icon x-large color="warning">mdi-alert-outline</v-icon>
                  <br />
                  <span class="pt-8 show_detial"
                    >لطفابرای وارد شدن کارمند به سیستم یوزرنیم و پسورد انتخاب
                    نمایید.</span
                  >
                </v-col>
                <v-col v-else cols="12" align="center" class="pa-8">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th>
                            یوزنیم
                          </th>
                          <th>
                            تغیر دادن
                          </th>
                          <th>
                            مقام
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{{ employe.username }}</td>
                          <td>
                            <v-btn
                              icon
                              color="primary"
                              @click="sign_up_dialog = !sign_up_dialog"
                              ><v-icon>mdi-pencil</v-icon></v-btn
                            >
                          </td>
                          <td>{{ employe.role }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
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
        <v-form
          v-model="edu_form_doc"
          ref="edu_from_document"
          @submit.prevent="SubmitEduDoc"
        >
          <v-card-text>
            <v-row justify="center">
              <v-col class="mt-8" cols="12" md="6" lg="6" sm="12" xl="6">
                <v-file-input
                  label="اسناد تحصیلی"
                  outlined
                  rounded
                  show-size
                  counter
                  accept=".pdf, .zip"
                  v-model="edu_doc.staffEduDocs"
                  :rules="rules.rules.required_file"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="mt-3">
            <v-btn
              class="mb-3"
              outlined
              color="warning"
              @click="edu_dialog = !edu_dialog"
            >
              لغو کردن
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!edu_form_doc"
              type="submit"
              class="mb-3"
              outlined
              color="primary"
            >
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
        <v-form
          v-model="tazkira_form"
          ref="tazkira_from_document"
          @submit.prevent="SubmitTazkiraDoc"
        >
          <v-card-text>
            <v-row justify="center">
              <v-col class="mt-8" cols="12" md="6" lg="6" sm="12" xl="6">
                <v-file-input
                  label="تذکره خود را انتخاب نمایید."
                  v-model="tazkira_doc.staffTazkira"
                  outlined
                  rounded
                  show-size
                  counter
                  accept=".pdf,.zip,Image/*"
                  :rules="rules.rules.required_file"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="mt-3">
            <v-btn
              class="mb-3"
              outlined
              color="warning"
              @click="tazkira_dialog = !tazkira_dialog"
            >
              لغو کردن
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!tazkira_form"
              type="submit"
              class="mb-3"
              outlined
              color="primary"
            >
              ثبت کردن
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- dialog for upload work contract -->
    <v-dialog width="900" v-model="contract_dialog">
      <v-card>
        <v-card-title
          >ثبت کردن قرارداد کاری
          <v-spacer></v-spacer>
          <v-btn icon @click="contract_dialog = !contract_dialog">
            <v-icon color="warning">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-form
          v-model="contract_form"
          ref="contract_from_document"
          @submit.prevent="SubmitContractDoc"
        >
          <v-card-text>
            <v-row justify="center">
              <v-col class="mt-8" cols="12" md="6" lg="6" sm="12" xl="6">
                <v-file-input
                  label="قرارداد کاری خود را انتخاب نمایید."
                  v-model="contract_doc.staffContract"
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
            <v-btn
              class="mb-3"
              outlined
              color="warning"
              @click="contract_dialog = !contract_dialog"
            >
              لغو کردن
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!contract_form"
              type="submit"
              class="mb-3"
              outlined
              color="primary"
            >
              ثبت کردن
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- dialog for upload staff photo -->
    <v-dialog width="900" v-model="photo_dialog">
      <v-card>
        <v-card-title
          >ثبت کردن عکس کارمند
          <v-spacer></v-spacer>
          <v-btn icon @click="photo_dialog = !photo_dialog">
            <v-icon color="warning">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-form
          v-model="photo_form"
          ref="photo_from_document"
          @submit.prevent="SubmitPhotoDoc"
        >
          <v-card-text>
            <v-row justify="center">
              <v-col class="mt-8" cols="12" md="6" lg="6" sm="12" xl="6">
                <v-file-input
                  label="عکس مورد نظر خود را انتخاب نمایید."
                  v-model="photo_doc.staffPhoto"
                  outlined
                  rounded
                  show-size
                  counter
                  accept="Image/*"
                  :rules="rules.rules.required_file"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="mt-3">
            <v-btn
              class="mb-3"
              outlined
              color="warning"
              @click="photo_dialog = !photo_dialog"
            >
              لغو کردن
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!photo_form"
              type="submit"
              class="mb-3"
              outlined
              color="primary"
            >
              ثبت کردن
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- dialog for sign up staff -->
    <v-dialog width="900" v-model="sign_up_dialog">
      <v-card>
        <v-card-title
          >ایجاد کردن حساب کاربری
          <v-spacer></v-spacer>
          <v-btn icon @click="sign_up_dialog = !sign_up_dialog">
            <v-icon color="warning">mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-form
          v-model="sign_up_form"
          ref="sign_up_from_document"
          @submit.prevent="SubmitSignUp"
        >
          <v-card-text>
            <v-row justify="center">
              <v-col class="mt-8" cols="12" md="12" lg="12" sm="12" xl="12">
                <v-row justify="center">
                  <v-col cols="12" md="6" lg="6" xl="6" sm="6">
                    <v-text-field
                      label="یوزر نیم"
                      outlined
                      :rules="rules.auth_rules.username"
                      prepend-icon="mdi-account"
                      type="text"
                      rounded
                      v-model="sign_up_info.staffUname"
                      placeholder="لطفا یوزرنیم خود را وارد کنید."
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="mt-n2" cols="12" md="12" lg="12" sm="12" xl="12">
                <v-row justify="center">
                  <v-col cols="12" md="6" lg="6" xl="6" sm="6">
                    <v-text-field
                      label="پسورد"
                      outlined
                      :type="show_pass ? 'text' : 'password'"
                      :prepend-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                      rounded
                      v-model="password"
                      @click:prepend="show_pass = !show_pass"
                      :rules="password_rules"
                      placeholder="لطفا پسورد خود را وارد کنید."
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="mt-n2" cols="12" md="12" lg="12" sm="12" xl="12">
                <v-row justify="center">
                  <v-col cols="12" md="6" lg="6" xl="6" sm="6">
                    <v-text-field
                      label="تصدیق کردن پسورد"
                      outlined
                      :prepend-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show_pass ? 'text' : 'password'"
                      rounded
                      v-model="confirm_password"
                      @click:prepend="show_pass = !show_pass"
                      :rules="confirmPasswordRull"
                      placeholder="لطفا پسورد خود را دوباره وارد کنید."
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="mt-n2" cols="12" md="12" lg="12" sm="12" xl="12">
                <v-row justify="center">
                  <v-col cols="12" md="6" lg="6" xl="6" sm="6">
                    <v-select
                      label="مقام کارمند"
                      outlined
                      :items="type_staff"
                      item-text="text"
                      item-value="value"
                      prepend-icon="mdi-text"
                      rounded
                      v-model="sign_up_info.role"
                      placeholder="لطفا پسورد خود را دوباره وارد کنید."
                    >
                    </v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="mt-3">
            <v-btn
              class="mb-3"
              outlined
              color="warning"
              @click="sign_up_dialog = !sign_up_dialog"
            >
              لغو کردن
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!sign_up_form"
              type="submit"
              class="mb-3"
              outlined
              color="primary"
            >
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
import Store from "../../store/index";
export default {
  mounted() {
    this.employe = this.$route.params.employe;
  },
  data() {
    return {
      //photoBase:"http://localhost:3000/uploads/docs/photo/"+ this.employe.photo,
      upload_file: "",
      employe: {},
      rules: rules,
      // Education
      edu_doc: {},
      edu_dialog: false,
      edu_file: "",
      edu_form_doc: null,
      // Tazkira
      tazkira_dialog: false,
      tazkira_form: null,
      tazkira_doc: {},

      // Work Contract
      contract_dialog: false,
      contract_form: null,
      contract_doc: {},

      // staff photo
      photo_dialog: false,
      photo_form: null,
      photo_doc: {},

      // sign up staff
      sign_up_dialog: false,
      show_pass: false,
      sign_up_form: null,
      confirm_password: "",
      password: "",
      sign_up_info: {},
      type_staff: [
        { text: "مدیر", value: "َAdmin" },
        { text: "اسیستاند", value: "Assistant" },
        { text: "کشییر", value: "cashier" },
      ],
      password_rules: [
        (v) => !!v || "وارد کردن پسورد الزامی می باشد.",
        (v) =>
          ((v || "").length >= 6 && v.length <= 20) ||
          "پسورد باشد بزرگتر از 6 و کوچکتر از 20 باشد.",
        (v) =>
          /[A-Z a-z]+/.test(v) ||
          "پسورد باید شامل حروف الفبای بزرگ و کوچک انگلسی باشدو",
        (v) =>
          /[£$%#@]+/.test(v) || "پسورد باید شامل حروف خاص مثل £$%#@ باشد. ",
        (v) => /[0-9]+/.test(v) || "پسورد باید حداقل شامل یک رقم عدد باشد.",
      ],
      confirmPasswordRull: [
        (v) => !!v || "تصدیق کردن پسورد الزامی می باشد.",
        (v) =>
          ((v || "").length >= 6 && v.length <= 20) ||
          "پسورد باشد بزرگتر از 6 و کوچکتر از 20 باشد.",
        (v) =>
          /[A-Z a-z]+/.test(v) ||
          "پسورد باید شامل حروف الفبای بزرگ و کوچک انگلسی باشدو",
        (v) =>
          /[£$%#@]+/.test(v) || "پسورد باید شامل حروف خاص مثل £$%#@ باشد. ",
        (v) => /[0-9]+/.test(v) || "پسورد باید حداقل شامل یک رقم عدد باشد.",
        (v) =>
          v == this.password ||
          " این پسورد را کی وارد کردین باید با پسورد قبلی مطابق باشد. ",
      ],
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
    SubmitEduDoc() {
      if (this.$refs.edu_from_document.validate()) {
        this.edu_doc.id = this.employe._id;
        Store.dispatch("staff/uploadeEduDoc", this.edu_doc);
        this.edu_dialog = false;
      }
    },
    SubmitTazkiraDoc() {
      if (this.$refs.tazkira_from_document.validate()) {
        this.tazkira_doc.id = this.employe._id;
        Store.dispatch("staff/uploadStaffTazkira", this.tazkira_doc);
        this.$refs.tazkira_from_document.reset();
        this.tazkira_dialog = false;
      }
    },
    SubmitContractDoc() {
      if (this.$refs.contract_from_document.validate()) {
        this.contract_doc.id = this.employe._id;
        Store.dispatch("staff/uploadStaffContract", this.contract_doc);
        this.$refs.contract_from_document.reset();
        this.contract_dialog = false;
      }
    },
    SubmitPhotoDoc() {
      if (this.$refs.photo_from_document.validate()) {
        this.photo_doc.id = this.employe._id;
        Store.dispatch("staff/uploadStaffPhoto", this.photo_doc);
        this.$refs.photo_from_document.reset();
        this.photo_dialog = false;
      }
    },
    SubmitSignUp() {
      if (this.$refs.sign_up_from_document.validate()) {
        this.sign_up_info.id = this.employe._id;
        this.sign_up_info.staffPwd = this.password;
        Store.dispatch("staff/signUpuser", this.sign_up_info);
        this.sign_up_dialog = false;
        this.$router.push({ name: "staff" });
      }
    },
    onpdfFile(event) {
      const files = event;
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      this.upload_file = event;
    },
    fileselect(file) {
      console.log(file);
    },
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

<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <strong class="pr-3"> جزییات بیشتر اکونت</strong>
        </v-card-title>
      </v-card>
    </v-col>
    <v-col class="mt-n5" cols="12">
      <v-row>
        <v-col cols="12" md="4" lg="4" xl="4" sm="4">
          <v-card>
            <v-card-title>
              <v-row>
                <v-col cols="12" class="mt-n1">
                  <v-btn icon @click="openEditPersonalInfoEditDialog"
                    ><v-icon color="primary">mdi-pencil</v-icon></v-btn
                  >
                </v-col>
                <v-col class="mt-n3" align="center">
                  <v-avatar size="80" class="mr-1" color="blue">
                    <v-img
                      v-if="editedItem.photo"
                      :src="
                        'http://localhost:3000/uploads/docs/patient-photo/' +
                          editedItem.photo
                      "
                    >
                    </v-img>
                    <span v-else class="white--text">{{
                      showname(editedItem.firstname)
                    }}</span>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="mt-2">
              <v-row>
                <v-col class="mt-n2">
                  <v-text-field
                    readonly
                    v-model="editedItem.firstname"
                    label="اسم"
                  ></v-text-field>
                </v-col>
                <v-col class="mt-n2">
                  <v-text-field
                    readonly
                    v-model="editedItem.lastname"
                    label="تخلص"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mt-n2">
                  <v-text-field
                    readonly
                    v-model="editedItem.fathername"
                    label="اسم پدر"
                  ></v-text-field>
                </v-col>
                <v-col class="mt-n2">
                  <v-text-field
                    readonly
                    v-model="editedItem.marital_status"
                    label="حالت مدنی"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mt-n2">
                  <v-text-field
                    readonly
                    v-model="editedItem.tazkira_id"
                    label="شماره تذکره"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mt-n2">
                  <v-text-field
                    readonly
                    v-model="editedItem.address"
                    label="آدرس"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mt-n2">
                  <v-text-field
                    readonly
                    v-model="editedItem.phone"
                    label="شماره تماس"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mt-n2">
                  <v-text-field
                    readonly
                    v-model="editedItem.blood_group"
                    label="گروپ خون"
                  ></v-text-field>
                </v-col>
                <v-col class="mt-n2">
                  <v-text-field
                    readonly
                    v-model="editedItem.age"
                    label="سن"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="mt-n2">
                  <v-text-field
                    readonly
                    v-model="editedItem.occupation"
                    label="شغل"
                  ></v-text-field>
                </v-col>
                <v-col class="mt-n2">
                  <v-text-field
                    readonly
                    v-model="editedItem.sex"
                    label="جنسیت"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="8" lg="8" xl="8" sm="8">
          <v-row>
            <v-col cols="12" sm="12">
              <v-card>
                <v-card-title>
                  <strong> دفعات مراجعه شده</strong>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-simple-table v-if="editedItem.appointment">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th>نوبت دوره</th>
                          <th>تاریخ مراجعه</th>
                          <th>توضیحات</th>
                          <th>مشکل مریض</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in editedItem.appointment"
                          :key="item.round"
                        >
                          <td>{{ item.round }}</td>
                          <td>{{ getDate(item.meet_date) }}</td>
                          <td>{{ item.description }}</td>
                          <td>{{ item.disease }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                  <v-sheet v-else>
                    <span>بیمار مورد نظر تا فعلا هیج مراجعه نداشته است</span>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card>
                <v-card-title>
                  <strong>تاریخچه مریض</strong>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-simple-table v-if="editedItem.case_history">
                    <template>
                      <thead>
                        <tr>
                          <th>نوعیت تاریخچه</th>
                          <th>حالت</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in editedItem.case_history"
                          :key="item.disease"
                        >
                          <td>{{ item.disease }}</td>
                          <td>{{ item.result }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                  <v-sheet v-if="!editedItem.case_history">
                    <span>بیمار مورد نظر هیچ تاریخچه ندارد</span>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" sm="12">
              <v-card>
                <v-card-title>
                  <strong> هزینه ها</strong>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-simple-table class="mb-5 mt-1">
                    <template>
                      <thead>
                        <tr>
                          <th>نوعیت بیماری</th>
                          <th>تاریخ ثبت بیمار</th>
                          <th>هزینه کل</th>
                          <th>حالت</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>دندان درد</td>
                          <td>May 12 2021</td>
                          <td>1000</td>
                          <td>پرداخت شده</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-dialog persistent max-width="1200" v-model="edit_patient">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="6">
                  <strong class="mr-2">تغیر آوردن در معلومات شخصی </strong>
                </v-col>
                <v-col cols="6" class="text-left">
                  <v-btn
                    color="primary"
                    @click="edit_patient = !edit_patient"
                    icon
                    ><v-icon x-large>mdi-close</v-icon></v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12">
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-stepper v-model="patient_edit_step">
            <v-stepper-header>
              <v-stepper-step step="1" :complete="patient_edit_step > 1">
                معلومات شخصی
              </v-stepper-step>
              <v-stepper-step step="2" :complete="patient_edit_step > 2">
                تاریخجه مریضی
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <!-- step 1 parsonal information form----------------------------- -->
              <v-stepper-content step="1">
                <v-form
                  v-model="editParsonalInfoForm"
                  ref="editPersonalInfoRef"
                  @submit.prevent="stepOnePersonalInfoEdit"
                  lazy-validation
                >
                  <v-row class="mt-4" justify="center">
                    <v-col align="start" cols="12" md="6" sm="12" xs="12">
                      <h2 class="mt-2">
                        لطفا معلومات شخصی بیمار مورد نطر را وارد کنید.
                      </h2>
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
                            hint=".وارد کردن اسم الزامی می باشد"
                            placeholder=".لطفاًاسم خود را وارد کنید"
                            v-model="editePatient.firstname"
                            :values="editePatient.firstname"
                            picon="mdi-account"
                            :rules="rule.rules.required_text"
                          />
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12" class="mt-3">
                      <v-row justify="center">
                        <v-col cols="12" md="6" sm="12" xs="12">
                          <BaseEdittext
                            label=" اسم پدر"
                            type="text"
                            hint=".وارد کردن اسم پدر الزامی می باشد"
                            placeholder=".لطفاً خود اسم پدر خود را وارد کنید"
                            v-model="editePatient.fathername"
                            :values="editePatient.fathername"
                            picon="mdi-account"
                            :rules="rule.rules.required_text"
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" class="mt-3">
                      <v-row justify="center">
                        <v-col cols="12" md="6" sm="12" xs="12">
                          <BaseEdittext
                            label=" تخلص"
                            type="text"
                            hint="وارد کردن تخلص اختیاری میباشد."
                            placeholder="لطفا تخلص خود را وارد کنید."
                            v-model="editePatient.lastname"
                            :values="editePatient.lastname"
                            picon="mdi-account"
                            :rules="rule.rules.text"
                          />
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12" class="mt-3">
                      <v-row justify="center">
                        <v-col cols="12" md="6" sm="12" xs="12">
                          <BaseEdittext
                            label=" شغل"
                            type="text"
                            hint=".وارد کردن شغل الزامی می باشد"
                            placeholder=".لطفاً شغل خود را وارد کنید"
                            v-model="editePatient.occupation"
                            :values="editePatient.occupation"
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
                            v-model="editePatient.age"
                            :value="editePatient.age"
                            prepend-icon="mdi-numeric-0"
                          />
                        </v-col>
                        <v-col cols="12" class="mt-n2">
                          <v-row justify="center">
                            <v-col cols="6" md="6" sm="12" xs="12">
                              <v-select
                                label="حالت مدنی"
                                outlined
                                rounded
                                required
                                v-model="editePatient.marital_status"
                                :value="editePatient.marital_status"
                                prepend-icon="mdi-gender-male-female-variant"
                                :rules="rule.rules.select"
                                :items="maritalStatus"
                              >
                              </v-select>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="mt-n2">
                          <v-row justify="center">
                            <v-col cols="6" md="6" sm="12" xs="12">
                              <v-select
                                label="جنسیت"
                                outlined
                                rounded
                                required
                                v-model="editePatient.sex"
                                :value="editePatient.sex"
                                prepend-icon="mdi-account"
                                :rules="rule.rules.select"
                                :items="six"
                              >
                              </v-select>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="mt-n2">
                          <v-row justify="center">
                            <v-col cols="6" md="6" sm="12" xs="12">
                              <v-text-field
                                outlined
                                rounded
                                label="نمبر تذکره"
                                v-model="editePatient.tazkira_id"
                                :value="editePatient.tazkira_id"
                                placeholder="نمبر تذکره بیمار مورد نظر را وارد کنید."
                                type="text"
                                @input="formatTazkira_number"
                                prepend-icon="mdi-numeric"
                                :rules="rule.rules.tazkira_id"
                              />
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="mt-n2">
                          <v-row justify="center">
                            <v-col cols="6" md="6" sm="12" xs="12">
                              <v-select
                                label="گروپ خون"
                                hint=".وارد کردن گروپ خون الزامی می باشد میباشد"
                                v-model="editePatient.blood_group"
                                :value="editePatient.blood_group"
                                outlined
                                rounded
                                :rules="rule.rules.select"
                                :items="bloodGroup"
                                prepend-icon="mdi-blood-bag"
                              />
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" class="mt-n2">
                          <v-row justify="center">
                            <v-col
                              cols="12"
                              md="6"
                              xl="6"
                              lg="6"
                              sm="12"
                              xs="12"
                            >
                              <v-text-field
                                label="نمبر تماس"
                                hint=".وارد کردن شماره تماس الزامی می باشد"
                                placeholder=".لطفا شماره تماس خود را وارد کنید"
                                type="text"
                                @input="formatPhoneNumber"
                                :rules="rule.rules.required_phone"
                                outlined
                                rounded
                                v-model="editePatient.phone"
                                :value="editePatient.phone"
                                prepend-icon="mdi-phone"
                              />
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      cols="12"
                      md="12"
                      sm="12"
                      lg="12"
                      xl="12"
                      class="mb-3"
                    >
                      <v-row>
                        <v-col   class="text-right"
                          cols="6"
                         
                         >
                          <v-btn class="white--text" elevation="3" large width="200" color="red" @click="closeEditPersonalInfoEditDialog">
                            لفو کردن
                          </v-btn>
                        </v-col>
                        <v-col
                          class="text-end"
                          cols="6"
                          ><v-btn
                            :disabled="!editParsonalInfoForm"
                            elevation="3"
                            large
                            type="sebmit"
                            width="200"
                            color="primary"
                          >
                            بعدی
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-form>
              </v-stepper-content>
              <!-- step 2 Case history of patients-------------------------------- -->
              <v-stepper-content step="2">
                  <v-row justify="center">
                    <v-col cols="12" md="6">
                      <h2>تغیر وارد کردن در تاریخجه بیمار.</h2>
                    </v-col>
                    <v-col cols="12">
                      <v-data-table
                        :headers="caseHeaders"
                        :items="editePatient.case_history"
                        sort-by="disease"
                        class="evevation-1"
                      >
                        <template v-slot:item.actions="{ item }">
                          <v-btn
                            icon
                            class="mr-2"
                            @click="openUpdateCaseHistory(item)"
                          >
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </template>
                        <template v-slot:item.result="{ item }">
                          <v-chip
                            :color="item.result === true ? 'red' : 'primary'"
                            dark
                          >
                            {{ item.result === true ? "بلی" : "نخیر" }}
                          </v-chip>
                        </template>
                      </v-data-table>
                    </v-col>
                    <v-col
                      cols="12"
                      md="12"
                      sm="12"
                      lg="12"
                      xl="12"
                      class="mb-3"
                    >
                      <v-row>
                        <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                          <v-btn width="200" large @click="patient_edit_step = 1">
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
                          ><v-btn
                            elevation="3"
                            large
                            width="200"
                            color="primary"
                            @click="stepTwoCaseHistoryEdit"
                          >
                            بعدی
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Case History update Dialog -->
    <v-dialog max-width="300" persistent v-model="caseHistoryDialog">
      <v-card>
        <v-card-text>
         <v-form v-model="caseUpdateForm" ref="CaseUpdateRef" @submit.prevent="submitUpdateCaseHistory">
            <v-row class="pt-4">
            <v-col cols="12">
              <strong class="text-weight-bold">{{ caseUpdate.disease }}</strong>
            </v-col>
            <v-col cols="12">
              <v-radio-group v-model="caseUpdate.result"  :value="caseUpdate.result" mandatory row >
                <v-radio label="بلی" color="red" :value="true"></v-radio>
                <v-radio label="نخیر" :value="false"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="6" clase="text-right">
                  <v-btn outlined color="red" @click=" closeCaseUpdateDialog">
                    لغو کردن
                  </v-btn>
                </v-col>
                <v-col cols="6" class="text-left">
                 <v-btn type="submit" outlined color="blue">
                   تغیر دادن
                 </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
         </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import rules from "../../validation/validationRules.js";
import Store from "../../store/index";

export default {
  data() {
    return {
      // v-model of stepper
      patient_edit_step: 1,
      rule: rules ,// rule for validation
      editedItem: {},// object for show specifc patient
      maritalStatus: ["مجرد", "متاهل"],
      six: ["مذکر", "مونث"],
      bloodGroup: [
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
      // personal information 
       editePatient: {
        firstname: "",
        lastname: "",
        fathername: "",
        tazkira_id:0,
        occupation: "",
        age: 0,
        blood_group: "",
        marital_status:"",
        phone: "",
        address: "",
        sex: "",
        photo: "",
        case_history: [],
       },
        defalutEditePatient: {
        firstname: "",
        lastname: "",
        fathername: "",
        tazkira_id:0,
        occupation: "",
        age: 0,
        blood_group: "",
        marital_status:"",
        phone: "",
        address: "",
        sex: "",
        photo: "",
        case_history: [],
       },
      edit_patient: false,
      editParsonalInfoForm: null,
      //Case History
      caseUpdateForm:null,
      caseHistoryDialog: false,
      caseHeaders: [
        {
          text: "مرض",
          value: "disease",
          align: "start",
          sortable: true,
        },
        {
          text: "نتیجه",
          value: "result",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedCaseIndex: -1,
      caseUpdate: {
        disease:"",
        result:"",
      },
      caseUpdateDefalut:{
        disease:"",
        result:""
      },

    };
  },
  mounted() {
    this.editedItem = this.$route.params.editedItem;
  },
  methods: {
    showname(firstname) {
      let name = "" + firstname + "".split("");
      return name[0] + name[1];
    },
    getDate(date) {
      let date_time = new Date(date);
      var months = [
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
      return (
        months[date_time.getMonth("MM")] +
        " " +
        date_time.getDate() +
        " " +
        date_time.getFullYear()
      );
    },
    formatTazkira_number() {
      var tazkira = this.editePatient.tazkira_id
        .replace(/\D/g, "")
        .match(/(\d{0,4})(\d{0,4})(\d{0,5})/);
      this.editePatient.tazkira_id = !tazkira[2]
        ? tazkira[1]
        : tazkira[1] + "-" + tazkira[2] + (tazkira[3] ? "-" + tazkira[3] : "");
    },
    formatPhoneNumber() {
      var phone = this.editePatient.phone
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.editePatient.phone = !phone[2]
        ? phone[1]
        : phone[1] + "-" + phone[2] + (phone[3] ? "-" + phone[3] : "");
    },
    // To open dialog for edit personal information of patient
    openEditPersonalInfoEditDialog() {
      this.editePatient = {
        firstname: this.editedItem.firstname,
        lastname: this.editedItem.lastname,
        fathername: this.editedItem.fathername,
        tazkira_id: this.editedItem.tazkira_id,
        occupation: this.editedItem.occupation,
        age: this.editedItem.age,
        blood_group: this.editedItem.blood_group,
        marital_status: this.editedItem.marital_status,
        phone: this.editedItem.phone,
        address: this.editedItem.address,
        sex: this.editedItem.sex,
        photo: this.editedItem.photo,
        case_history: this.editedItem.case_history,
      };
      this.edit_patient = true;
    },
    // To close edit information dialog
    closeEditPersonalInfoEditDialog(){
      this.editePatient =Object.assign({},this.defalutEditePatient);
      this.patient_edit_step =1;
      this.edit_patient = false;
    },
    // To open case history update dialog
    openUpdateCaseHistory(item) {
      this.editedCaseIndex = this.editePatient.case_history.indexOf(item);
      this.caseUpdate = Object.assign({}, item);
      this.caseHistoryDialog = true;
    },
    // To submit case Histofy update
    submitUpdateCaseHistory(){
       if(this.$refs.CaseUpdateRef.validate()){
          if(this.editedCaseIndex>-1){
           Object.assign( this.editePatient.case_history[this.editedCaseIndex],this.caseUpdate);
           this.closeCaseUpdateDialog()
          }
       }

    },
    stepOnePersonalInfoEdit() {
      if (this.$refs.editPersonalInfoRef.validate()) {
       
        this.patient_edit_step = 2;
      }
    },
    // To close case history dialog
    closeCaseUpdateDialog(){
       this.caseHistoryDialog = false;
          this.$nextTick(()=>{
            this.caseUpdate = Object.assign({},this.caseUpdateDefalut);
            this.editedCaseIndex = -1;
            
          });
    },
   async stepTwoCaseHistoryEdit() {
        this.editedItem.firstname = this.editePatient.firstname;
        this.editedItem.fathername = this.editePatient.fathername;
        this.editedItem.lastname = this.editePatient.lastname;
        this.editedItem.occupation = this.editePatient.occupation;
        this.editedItem.age = this.editePatient.age;
        this.editedItem.blood_group = this.editePatient.blood_group;
        this.editedItem.address = this.editePatient.address
        this.editedItem.marital_status = this.editePatient.marital_status;
        this.editedItem.sex = this.editePatient.sex;
        this.editedItem.tazkira_id = this.editePatient.tazkira_id;
        this.editedItem.phone = this.editePatient.phone;
        await Store.dispatch("patient/editPatient",this.editedItem);
        this.closeEditPersonalInfoEditDialog();
        
    },
  },
};
</script>

<style lang="scss" scoped></style>

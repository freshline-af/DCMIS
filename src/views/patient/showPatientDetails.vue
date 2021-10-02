<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <strong class="pr-3 text-h5"> جزییات بیشتر</strong>
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
                  <strong class="text-h5"> دفعات مراجعه شده</strong>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-data-table
                    v-if="editedItem.appointment"
                    :headers="appointmentHeader"
                    :items="appointmentItem"
                  >
                    <template v-slot:item.actions="{ item }">
                      <v-btn icon @click="openAppointmentEditDialog(item)">
                        <v-icon color="primary">mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn icon @click="openShowAppointmentDialog(item)">
                        <v-icon color="primary">mdi-text</v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:item.meet_at="{ item }">
                      {{ getRealDate(item.meet_at) }}
                    </template>
                    <template v-slot:item.stag="{ item }">
                      {{ showServices(item.stag) }}
                    </template>
                    <template v-slot:item.dentist="{ item }">
                      {{ showDintstName(item.dentist) }}
                    </template>
                  </v-data-table>
                  <v-sheet v-else>
                    <span>بیمار مورد نظر تا فعلا هیج مراجعه نداشته است</span>
                  </v-sheet>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card>
                <v-card-title>
                  <strong class="text-h5">تاریخچه مریض</strong>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-simple-table v-if="editedItem.case_history">
                    <template>
                      <thead>
                        <tr>
                          <th
                            class="font-weight-block font-weight-bold text-h6"
                          >
                            نوعیت مریضی
                          </th>
                          <th
                            class="font-weight-block font-weight-bold text-h6"
                          >
                            نتیجه
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in editedItem.case_history"
                          :key="item.disease"
                        >
                          <td>{{ item.disease }}</td>
                          <td>
                            <v-chip
                              :color="item.result === true ? 'red' : 'blue'"
                              class="white--text"
                              >{{
                                item.result === true ? "بلی" : "نخیر"
                              }}</v-chip
                            >
                          </td>
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
                  <strong class="text-h5"> هزینه ها</strong>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-simple-table class="mb-5 mt-1">
                    <template>
                      <thead>
                        <tr>
                          <th
                            class="font-weight-block font-weight-bold text-h6"
                          >
                            نوعیت بیماری
                          </th>
                          <th
                            class="font-weight-block font-weight-bold text-h6"
                          >
                            تاریخ ثبت بیمار
                          </th>
                          <th
                            class="font-weight-block font-weight-bold text-h6"
                          >
                            هزینه کل
                          </th>
                          <th
                            class="font-weight-block font-weight-bold text-h6"
                          >
                            حالت
                          </th>
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
    <!-- dialog for edit patient personal infomation -->
    <v-dialog scrollable persistent max-width="1200" v-model="edit_patient">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="6">
                  <strong class="mr-2">تغییر دادن معلومات شخصی </strong>
                </v-col>
                <v-col cols="6" class="text-left">
                  <v-btn
                  x-large
                    color="red"
                    @click="closeEditPersonalInfoEditDialog"
                    icon
                    ><v-icon>mdi-close</v-icon></v-btn
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
                تاریخچه بیمار
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
                            label="آدرس"
                            type="text"
                            hint=".وارد کردن آدرس اختیاری می باشد"
                            placeholder=".لطفاً آدرس خود را وارد کنید"
                            v-model="editePatient.address"
                            :values="editePatient.address"
                            picon="mdi-map"
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
                        <v-col class="text-right" cols="6">
                          <v-btn
                            class="white--text"
                            elevation="3"
                            large
                            width="200"
                            color="red"
                            @click="closeEditPersonalInfoEditDialog"
                          >
                            لفو کردن
                          </v-btn>
                        </v-col>
                        <v-col class="text-end" cols="6"
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
                  <v-col cols="12" md="12" sm="12" lg="12" xl="12" class="mb-3">
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
                         تغییر دادن
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
    <v-dialog  max-width="300" persistent v-model="caseHistoryDialog">
      <v-card>
        <v-card-text>
          <v-form
            v-model="caseUpdateForm"
            ref="CaseUpdateRef"
            @submit.prevent="submitUpdateCaseHistory"
          >
            <v-row class="pt-4">
              <v-col cols="12">
                <strong class="text-weight-bold">{{
                  caseUpdate.disease
                }}</strong>
              </v-col>
              <v-col cols="12">
                <v-radio-group
                  v-model="caseUpdate.result"
                  :value="caseUpdate.result"
                  mandatory
                  row
                >
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
                    <v-btn outlined color="red" @click="closeCaseUpdateDialog">
                      لغو کردن
                    </v-btn>
                  </v-col>
                  <v-col cols="6" class="text-left">
                    <v-btn type="submit" outlined color="blue">
                      تغییر دادن
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- dialog for update appointment -->
    <v-dialog scrollable max-width="1200" persistent v-model="appointmentEditDialog">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col class="mt-3 ml-3" cols="12">
              <v-row>
                <strong class="mr-3 mt-2"
                  >تغییر دادن جلسه مراجعه شده</strong
                >
                <v-spacer></v-spacer>
                <v-btn
                  x-large
                  icon
                  color="red"
                  @click="closeAppointmentEditDialog"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </v-row>
            </v-col>
            <v-col class="mt-3" cols="12">
              <v-divider></v-divider>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-stepper v-model="appointment_edit_stepper">
            <v-stepper-header>
              <v-stepper-step step="1" :complete="appointment_edit_stepper > 1">
                تغییر دادن جلسه مراجعه شده
              </v-stepper-step>
              <v-stepper-step step="2" :complete="appointment_edit_stepper > 2">
                تغیر دادن حساب مالی
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-form
                v-model="appointmentEditForm"
                ref="appointmentEditRef"
                @submit.prevent="appointmentEditStepOne"
              >
                <v-stepper-content step="1">
                  <v-row justify="center">
                    <v-col cols="12">
                      <v-row justify="center">
                        <v-col cols="6" md="6" sm="12" xs="12">
                          <v-autocomplete
                            label="نوعیت مریضی"
                            :items="services"
                            item-value="value"
                            item-text="text"
                            v-model="appointmentEditOb.stag"
                            :value="appointmentEditOb.stag"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- teeth filling services 1 -->
                    <v-col
                      v-if="appointmentEditOb.stag === 1"
                      cols="6"
                      md="6"
                      sm="12"
                      xs="12"
                    >
                      <v-row justify="center">
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label=" نوعیت مواد"
                            :items="theet_filling_matieral"
                            v-model="appointmentEditOb.material"
                            :value="appointmentEditOb.material"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>

                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label="فک"
                            :items="type_fack"
                            v-model="appointmentEditOb.tooth_gum"
                            :value="appointmentEditOb.tooth_gum"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>

                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label="دندان"
                            :items="teeths"
                            v-model="appointmentEditOb.tooth_type"
                            :value="appointmentEditOb.tooth_type"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-textarea
                            label="نوت"
                            v-model="appointmentEditOb.description"
                            :value="appointmentEditOb.description"
                            outlined
                            rounded
                            required
                          >
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- teeth cover services 2 -->
                    <v-col
                      v-if="appointmentEditOb.stag === 2"
                      cols="6"
                      md="6"
                      sm="12"
                      xs="12"
                    >
                      <v-row justify="center">
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label=" نوعیت مواد"
                            :items="theet_cover_matieral"
                            v-model="appointmentEditOb.material"
                            :value="appointmentEditOb.material"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>

                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label="فک"
                            :items="type_fack"
                            v-model="appointmentEditOb.tooth_gum"
                            :value="appointmentEditOb.tooth_gum"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>

                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label="دندان"
                            :items="teeths"
                            v-model="appointmentEditOb.tooth_type"
                            :value="appointmentEditOb.tooth_type"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-textarea
                            label="نوت"
                            v-model="appointmentEditOb.description"
                            :value="appointmentEditOb.description"
                            outlined
                            rounded
                            required
                          >
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- teeth orthodoncy services 3  -->
                    <v-col
                      v-if="appointmentEditOb.stag === 3"
                      cols="6"
                      md="6"
                      sm="12"
                      xs="12"
                    >
                      <v-row justify="center">
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label="فک"
                            :items="type_fack_orthodoncy"
                            v-model="appointmentEditOb.tooth_gum"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="12" lg="12" xl="12" sm="12">
                          <v-file-input
                            label="عکس از دندان ها"
                            outlined
                            v-model="appointmentEditOb.image"
                            :value="appointmentEditOb.image"
                            :rules="rule.rules.file"
                            rounded
                            required
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-textarea
                            label="نوت"
                            v-model="appointmentEditOb.description"
                            :value="appointmentEditOb.description"
                            outlined
                            rounded
                            required
                          >
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- Teeth remove services 4 -->
                    <v-col
                      v-if="appointmentEditOb.stag === 4"
                      cols="6"
                      md="6"
                      sm="12"
                      xs="12"
                    >
                      <v-row justify="center">
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label="فک"
                            :items="type_fack"
                            v-model="appointmentEditOb.tooth_gum"
                            :value="appointmentEditOb.tooth_gum"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>

                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label="دندان"
                            :items="type_pull_out_theeth"
                            v-model="appointmentEditOb.tooth_type"
                            :value="appointmentEditOb.tooth_type"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-textarea
                            label="نوت"
                            v-model="appointmentEditOb.description"
                            :value="appointmentEditOb.description"
                            outlined
                            rounded
                            required
                          >
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- Teeth Gum Surgery services 5---------- -->
                    <v-col
                      v-if="appointmentEditOb.stag === 5"
                      cols="6"
                      md="6"
                      sm="12"
                      xs="12"
                    >
                      <v-row justify="center">
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label="گواردینات"
                            :items="type_quardinat"
                            v-model="appointmentEditOb.tooth_gum"
                            :value="appointmentEditOb.tooth_gum"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>

                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-textarea
                            label="نوت"
                            v-model="appointmentEditOb.description"
                            :value="appointmentEditOb.description"
                            outlined
                            rounded
                            required
                          >
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- Teeth Root Surgery services 6 -->
                    <v-col
                      v-if="appointmentEditOb.stag === 6"
                      cols="6"
                      md="6"
                      sm="12"
                      xs="12"
                    >
                      <v-row justify="center">
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label="فک"
                            :items="type_fack"
                            v-model="appointmentEditOb.tooth_gum"
                            :value="appointmentEditOb.tooth_gum"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>

                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label="دندان"
                            :items="teeths"
                            v-model="appointmentEditOb.tooth_type"
                            :value="appointmentEditOb.tooth_type"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-textarea
                            label="نوت"
                            v-model="appointmentEditOb.description"
                            :value="appointmentEditOb.description"
                            outlined
                            rounded
                            required
                          >
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- Teeth protices services 7 -->
                    <v-col
                      v-if="appointmentEditOb.stag === 7"
                      cols="6"
                      md="6"
                      sm="12"
                      xs="12"
                    >
                      <v-row justify="center">
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label="نوعیت پروتیز"
                            :items="type_protis"
                            v-model="appointmentEditOb.initail_services"
                            :value="appointmentEditOb.initail_services"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label="فک"
                            :items="type_fack"
                            v-model="appointmentEditOb.tooth_gum"
                            :value="appointmentEditOb.tooth_gum"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>

                        <v-col
                          v-if="
                            appointmentEditOb.initail_services === 'پروتیز قسمی'
                          "
                          cols="12"
                          md="12"
                          sm="12"
                          xs="12"
                        >
                          <v-autocomplete
                            label="دندان"
                            :items="teeths"
                            v-model="appointmentEditOb.tooth_type"
                            :value="appointmentEditOb.tooth_type"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-textarea
                            label="نوت"
                            v-model="appointmentEditOb.description"
                            :value="appointmentEditOb.description"
                            outlined
                            rounded
                            required
                          >
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!-- ،Teeth bleaching services 8--- -->
                    <v-col
                      v-if="appointmentEditOb.stag === 8"
                      cols="6"
                      md="6"
                      sm="12"
                      xs="12"
                    >
                      <v-row justify="center">
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label="نوعیت سفید کردن دندان ها"
                            :items="type_teeth_bleaching"
                            v-model="appointmentEditOb.material"
                            :value="appointmentEditOb.material"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>

                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-textarea
                            label="نوت"
                            v-model="appointmentEditOb.description"
                            :value="appointmentEditOb.description"
                            outlined
                            rounded
                            required
                          >
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      v-if="appointmentEditOb.stag === 9"
                      cols="6"
                      md="6"
                      sm="12"
                      xs="12"
                    >
                      <v-row justify="center">
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-autocomplete
                            label="فک"
                            :items="type_fack_orthodoncy"
                            v-model="appointmentEditOb.tooth_gum"
                            :value="appointmentEditOb.tooth_gum"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-textarea
                            label="نوت"
                            v-model="appointmentEditOb.description"
                            :value="appointmentEditOb.description"
                            outlined
                            rounded
                            required
                          >
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      v-if="appointmentEditOb.stag === 10"
                      cols="6"
                      md="6"
                      sm="12"
                      xs="12"
                    >
                      <v-row justify="center">
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-textarea
                            label="نوت"
                            v-model="appointmentEditOb.description"
                            :value="description"
                            outlined
                            rounded
                            required
                          >
                          </v-textarea>
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
                        <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                          <v-btn
                            width="200"
                            color="red"
                            class="white--text"
                            large
                            @click="closeAppointmentEditDialog"
                          >
                            لغو کردن
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
                            @click="appointmentEditStepOne"
                          >
                            بعدی
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-stepper-content>
                <v-stepper-content step="2">
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
                            v-model="appointmentEditOb.grand_total"
                            :values="appointmentEditOb.grand_total"
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
                            v-model="appointmentEditOb.installment"
                            :value="appointmentEditOb.installment"
                            :items="installments"
                            :rules="rule.rules.select"
                            item-text="text"
                            item-value="value"
                            outlined
                            rounded
                          >
                          </v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" class="mt-n2">
                      <v-row
                        justify="center"
                        v-if="appointmentEditOb.installment != 1"
                      >
                        <v-col cols="12" md="6">
                          <BaseEdittext
                            label="مبلغ قابل پرداخت"
                            v-model="appointmentEditOb.fee_amount_received"
                            :values="appointmentEditOb.fee_amount_received"
                            type="number"
                            :rules="rule.rules.number"
                            placeholder="مقدرا قابل پرداخت را وارد کنید"
                          />
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
                        <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                          <v-btn
                            width="200"
                            large
                            @click="appointment_edit_stepper = 1"
                          >
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
                            :disabled="!appointmentEditForm"
                            elevation="3"
                            large
                            type="submit"
                            width="200"
                            color="primary"
                          >
                            ثبت کردن
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-stepper-content>
              </v-form>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- dialog for show appointment of patient -->
    <v-dialog scrollable max-width="400" v-model="appointmentShowDetails">
      <v-card>
        <v-card-title class="elevation-2">
          <v-row><v-col cols="12" align="center"><strong class="text-h6 font-weight-bold">نشان دادن جزییات جلسه مراجعه شده</strong></v-col></v-row>
        </v-card-title>
        <v-card-text  justify="center" class="round-xl elevation-1">
            <v-col  cols="12" md="12" xl="12" lg="12" sm="12">
                  <span class="font-weight-bold font-weigh-black subtitle-1">
                   نوعیت بیماری : </span>
                  <span>{{
                  showServices(appointmentEditOb.stag)
                }}</span>
            </v-col>

             <v-col cols="12" md="12" xl="12" lg="12" sm="12">
                  <span class="font-weight-bold font-weigh-black">
                  تاریخ مراجعه : </span >
                  <span>{{
                  getRealDate(appointmentEditOb.meet_at)
                }}</span>
            </v-col>

             <v-col v-if=" appointmentEditOb.description" cols="12" md="12" xl="12" lg="12" sm="12">
                  <span class="font-weight-bold font-weigh-black subtitle-1">
                 توضیحات : </span
                >
                  <span>{{
                 appointmentEditOb.description
                }}</span>
            </v-col>

             <v-col v-if="appointmentEditOb.material" cols="12" md="12" xl="12" lg="12" sm="12">

                  <span class="font-weight-bold font-weigh-black subtitle-1">
                  مواد استفاده شده : </span
                >
                  <span>{{
                 appointmentEditOb.material
                }}</span>
            </v-col>

              <v-col v-if="appointmentEditOb.initial_services" cols="12" md="12" xl="12" lg="12" sm="12">
                  <span class="font-weight-bold font-weigh-black subtitle-1">
                 کار انجام شده : </span
                >
                  <span>{{
                 appointmentEditOb.initial_services
                }}</span>
            </v-col>

            <v-col cols="12" md="12" xl="12" lg="12" sm="12">

                  <span class="font-weight-bold font-weigh-black subtitle-1">
                   جلسه : </span
                >
                  <span>{{
                 appointmentEditOb.round
                }}</span>
            </v-col>

             <v-col cols="12" md="12" xl="12" lg="12" sm="12">
                  <span class="font-weight-bold font-weigh-black subtitle-1">
                  فک : </span
                >
                  <span>{{
                 appointmentEditOb.tooth_gum
                }}</span>
            </v-col>

             <v-col v-if=" appointmentEditOb.tooth_type" cols="12" md="12" xl="12" lg="12" sm="12">
                  <span class="font-weight-bold font-weigh-black subtitle-1">
                   دندان : </span
                >
                  <span>{{
                 appointmentEditOb.tooth_type
                }}</span>
            </v-col>
            <v-col v-if="appointmentEditOb.image" cols="12" md="12" xl="12" lg="12" sm="12">
                  <span class="font-weight-bold font-weigh-black subtitle-1">
                   عکس : </span
                >
                  <v-img width="300" height="250" src="`http://localhost:3000/uploads/patient-photo/`+appointmentEditOb.image"></v-img>
            </v-col>

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
      rule: rules, // rule for validation
      editedItem: {}, // object for show specifc patient
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
      // Pationt appointment
      appointmentHeader: [
        {
          text: "نوعیت سرویس",
          value: "stag",
          sortable: true,
          align: "start",
        },
        {
          text: "تاریخ",
          value: "meet_at",
          sortable: true,
          align: "start",
        },
        {
          text: "جلسه",
          value: "round",
          sortable: true,
          align: "start",
        },
        {
          text: "داکتر",
          value: "dentist",
          sortable: true,
          align: "start",
        },
        {
          text: "عملیه",
          value: "actions",
          sortable: true,
          align: "start",
        },
      ],
      type_pull_out_theeth: ["ساده", "عقلی", "امپکت"],
      type_surgary: ["کشیدن دندان ها", "جراحی لثه", "جراحی ریشه"],
      type_quardinat: ["1", "2", "3", "4"],
      teeths: ["1", "2", "3", "4", "5", "6", "7", "8"],
      theet_filling_matieral: ["کامپوزیت", "املگم", "سایر مواد"],
      theet_cover_matieral: ["پورسلن", "میتل", "زرگونیم", "گیگم"],
      type_teeth_bleaching: [
        "یک مرحله یی",
        "دو مرحله یی",
        "سه مرحله یی",
        "چهار مرحله یی",
      ],
      services: [
        { text: "معاینه دندان", value: 10 },
        {
          text: "پر کاری دندان",
          value: 1,
        },
        {
          text: "پوش کردن دندان ها",
          value: 2,
        },
        {
          text: "ارتودانسی",
          value: 3,
        },
        {
          text: "کشیدن دندان ها",
          value: 4,
        },
        {
          text: "جراحی ریشه دندان ها",
          value: 6,
        },
        {
          text: "حراحی لثه",
          value: 5,
        },
        { text: "پروتیز دندان", value: 7 },
        {
          text: "سفید کردن دندان",
          value: 8,
        },
        {
          text: "جرم گیری دندان ها",
          value: 9,
        },
      ],
      type_protis: ["پروتیز قسمی", "پروتیز کامل"],
      type_fack: [
        "بالا - راست",
        "بالا - چپ",
        "پایین - راست",
        "پایین - چپ",
        "هردو",
      ],
      type_fack_orthodoncy: ["بالا", "پایین", "هردو"],
      installments: [
        { text: "تکمیل", value: 1 },
        {
          text: "دو قسط",
          value: "2",
        },
        { text: "سه فسط", value: 3 },
      ],
      appointmentItem: [],
      appointmentEditDialog: false,
      appointment_edit_stepper: 1,
      appointmentEditForm: null,
      apointmentEditIndex: -1,
      appointmentEditOb: {
        dentist: 0,
        description: "",
        fee_amount_received: 0,
        fee_amount_due: 0,
        fee_total_received: 0,
        installment: 0,
        meet_at: 0,
        round: 0,
        tooth_gum: "",
        tooth_type: "",
        material: "",
        initial_swervices: "",
        image: "",
        stag: "",
      },
      appointmentDefalutEditOb: {
        dentist: 0,
        description: "",
        fee_amount_received: 0,
        fee_amount_due: 0,
        fee_total_received: 0,
        installment: 0,
        meet_at: 0,
        round: 0,
        tooth_gum: "",
        tooth_type: "",
        material: "",
        initial_swervices: "",
        image: "",
        stag: "",
      },
      // personal information
      editePatient: {
        firstname: "",
        lastname: "",
        fathername: "",
        tazkira_id: 0,
        occupation: "",
        age: 0,
        blood_group: "",
        marital_status: "",
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
        tazkira_id: 0,
        occupation: "",
        age: 0,
        blood_group: "",
        marital_status: "",
        phone: "",
        address: "",
        sex: "",
        photo: "",
        case_history: [],
      },
      edit_patient: false,
      editParsonalInfoForm: null,
      //Case History
      caseUpdateForm: null,
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
        disease: "",
        result: "",
      },
      caseUpdateDefalut: {
        disease: "",
        result: "",
      },

      // appointment show details
      appointmentShowDetails: false,
    };
  },
  async mounted() {
    this.editedItem = this.$route.params.editedItem;
    await Store.dispatch("staff/getStaff");
    this.initionalizeAppointment();
  },
  methods: {
    showname(firstname) {
      let name = "" + firstname + "".split("");
      return name[0] + name[1];
    },
    getRealDate(date) {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      var real_date = new Date(date);
      var month = real_date.getMonth();
      var year = real_date.getFullYear();
      var day = real_date.getDate() + " ";
      let newDate = day + " " + months[month] + " " + year;
      return newDate;
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
    closeEditPersonalInfoEditDialog() {
      this.editePatient = Object.assign({}, this.defalutEditePatient);
      this.patient_edit_step = 1;
      this.edit_patient = false;
    },
    // To open case history update dialog
    openUpdateCaseHistory(item) {
      this.editedCaseIndex = this.editePatient.case_history.indexOf(item);
      this.caseUpdate = Object.assign({}, item);
      this.caseHistoryDialog = true;
    },
    // To submit case Histofy update
    submitUpdateCaseHistory() {
      if (this.$refs.CaseUpdateRef.validate()) {
        if (this.editedCaseIndex > -1) {
          Object.assign(
            this.editePatient.case_history[this.editedCaseIndex],
            this.caseUpdate
          );
          this.closeCaseUpdateDialog();
        }
      }
    },
    stepOnePersonalInfoEdit() {
      if (this.$refs.editPersonalInfoRef.validate()) {
        this.patient_edit_step = 2;
      }
    },
    // To close case history dialog
    closeCaseUpdateDialog() {
      this.caseHistoryDialog = false;
      this.$nextTick(() => {
        this.caseUpdate = Object.assign({}, this.caseUpdateDefalut);
        this.editedCaseIndex = -1;
      });
    },
    // To submit personal information Update
    async stepTwoCaseHistoryEdit() {
      this.editedItem.firstname = this.editePatient.firstname;
      this.editedItem.fathername = this.editePatient.fathername;
      this.editedItem.lastname = this.editePatient.lastname;
      this.editedItem.occupation = this.editePatient.occupation;
      this.editedItem.age = this.editePatient.age;
      this.editedItem.blood_group = this.editePatient.blood_group;
      this.editedItem.address = this.editePatient.address;
      this.editedItem.marital_status = this.editePatient.marital_status;
      this.editedItem.sex = this.editePatient.sex;
      this.editedItem.tazkira_id = this.editePatient.tazkira_id;
      this.editedItem.phone = this.editePatient.phone;
      await Store.dispatch("patient/editPatient", this.editedItem);
      this.closeEditPersonalInfoEditDialog();
    },
    // To initionalize appointment in appointmentItem array;
    initionalizeAppointment() {
      let appointment = {};
      for (var i = 0; i < this.editedItem.appointment.length; i++) {
        appointment.index_of_appoint = i;
        appointment.stag = this.editedItem.appointment[i].stag;
        if (this.editedItem.appointment[i].stag === 1) {
          for (
            var tf = 0;
            tf < this.editedItem.appointment[i].teeth_filling.length;
            tf++
          ) {
            appointment.index_of_tf = tf;
            appointment.round =
              this.editedItem.appointment[i].teeth_filling[tf].round || "";
            appointment.meet_at = this.editedItem.appointment[i].teeth_filling[
              tf
            ].meet_at;
            appointment.fee_amount_received =
              this.editedItem.appointment[i].teeth_filling[tf].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.editedItem.appointment[i].teeth_filling[tf].fee.amount_due ||
              0;
            appointment.installment = this.editedItem.appointment[
              i
            ].teeth_filling[tf].fee.installment;
            appointment.dentist =
              this.editedItem.appointment[i].teeth_filling[tf].fee.dentist || 0;
            appointment.initial_swervices =
              this.editedItem.appointment[i].teeth_filling[tf]
                .initial_swervices || " ";
            appointment.description =
              this.editedItem.appointment[i].teeth_filling[tf].description ||
              " ";
            appointment.material =
              this.editedItem.appointment[i].teeth_filling[tf].material || " ";
            appointment.tooth_gum =
              this.editedItem.appointment[i].teeth_filling[tf].tooth.gum || " ";
            appointment.tooth_type =
              this.editedItem.appointment[i].teeth_filling[tf].tooth.type ||
              " ";
            appointment.fee_grand_total =
              this.editedItem.appointment[i].teeth_filling[tf].grand_total ||
              0;
            this.appointmentItem.push(appointment);
          }
        } else if (this.editedItem.appointment[i].stag === 2) {
          for (
            var tc = 0;
            tc < this.editedItem.appointment[i].teeth_cover.length;
            tc++
          ) {
            appointment.index_of_tc = tc;
            appointment.round =
              this.editedItem.appointment[i].teeth_cover[tc].round || "";
            appointment.meet_at = this.editedItem.appointment[i].teeth_cover[
              tc
            ].meet_at;
            appointment.fee_amount_received =
              this.editedItem.appointment[i].teeth_cover[tc].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.editedItem.appointment[i].teeth_cover[tc].fee.amount_due ||
              0;
            appointment.installment = this.editedItem.appointment[
              i
            ].teeth_cover[tc].fee.installment;
            appointment.dentist =
              this.editedItem.appointment[i].teeth_cover[tc].fee.dentist || 0;
            appointment.material =
              this.editedItem.appointment[i].teeth_cover[tc].material || " ";
            appointment.description =
              this.editedItem.appointment[i].teeth_cover[tc].description || " ";
            appointment.tooth_gum =
              this.editedItem.appointment[i].teeth_cover[tc].tooth.gum || " ";
            appointment.tooth_type =
              this.editedItem.appointment[i].teeth_cover[tc].tooth.type || " ";
            appointment.grand_total =
              this.editedItem.appointment[i].teeth_cover[tc].grand_total ||
              0;
            this.appointmentItem.push(appointment);
          }
        } else if (this.editedItem.appointment[i].stag === 3) {
          for (
            var o = 0;
            o < this.editedItem.appointment[i].orthodoncy.length;
            o++
          ) {
            appointment.index_of_o = o;
            appointment.round =
              this.editedItem.appointment[i].orthodoncy[o].round || "";
            appointment.meet_at = this.editedItem.appointment[i].orthodoncy[
              o
            ].meet_at;
            appointment.fee_amount_received =
              this.editedItem.appointment[i].orthodoncy[o].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.editedItem.appointment[i].orthodoncy[o].fee.amount_due || 0;
            appointment.installment = this.editedItem.appointment[i].orthodoncy[
              o
            ].fee.installment;
            appointment.dentist =
              this.editedItem.appointment[i].orthodoncy[o].fee.dentist || 0;
            appointment.image =
              this.editedItem.appointment[i].orthodoncy[o].image || "";
            appointment.description =
              this.editedItem.appointment[i].orthodoncy[o].description || "";
            appointment.tooth_gum =
              this.editedItem.appointment[i].orthodoncy[o].tooth.gum || "";
            appointment.tooth_type =
              this.editedItem.appointment[i].orthodoncy[o].tooth.type || "";
            appointment.grand_total =
              this.editedItem.appointment[i].orthodoncy[o].grand_total || 0;
            this.appointmentItem.push(appointment);
          }
        } else if (this.editedItem.appointment[i].stag === 4) {
          for (
            var tr = 0;
            tr < this.editedItem.appointment[i].teeth_remove.length;
            tr++
          ) {
            appointment.index_of_tr = tr;
            appointment.round =
              this.editedItem.appointment[i].teeth_remove[tr].round || "";
            appointment.meet_at = this.editedItem.appointment[i].teeth_remove[
              tr
            ].meet_at;
            appointment.fee_amount_received =
              this.editedItem.appointment[i].teeth_remove[tr].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.editedItem.appointment[i].teeth_remove[tr].fee.amount_due ||
              0;
            appointment.installment = this.editedItem.appointment[
              i
            ].teeth_remove[tr].fee.installment;
            appointment.dentist =
              this.editedItem.appointment[i].teeth_remove[tr].fee.dentist || 0;
            appointment.description =
              this.editedItem.appointment[i].teeth_remove[tr].description || "";
            appointment.tooth_gum =
              this.editedItem.appointment[i].teeth_remove[tr].tooth.gum || "";
            appointment.tooth_type =
              this.editedItem.appointment[i].teeth_remove[tr].tooth.type || "";
            appointment.grand_total =
              this.editedItem.appointment[i].teeth_remove[tr].grand_total ||
              0;
            this.appointmentItem.push(appointment);
          }
        } else if (this.editedItem.appointment[i].stag === 5) {
          for (
            var gs = 0;
            gs < this.editedItem.appointment[i].gum_surgery.length;
            gs++
          ) {
            appointment.index_of_gs = gs;
            appointment.round =
              this.editedItem.appointment[i].gum_surgery[gs].round || "";
            appointment.meet_at = this.editedItem.appointment[i].gum_surgery[
              gs
            ].meet_at;
            appointment.fee_amount_received =
              this.editedItem.appointment[i].gum_surgery[gs].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.editedItem.appointment[i].gum_surgery[gs].fee.amount_due ||
              0;
            appointment.installment =
              this.editedItem.appointment[i].gum_surgery[gs].fee.installment ||
              0;
            appointment.dentist =
              this.editedItem.appointment[i].gum_surgery[gs].fee.dentist || 0;
            appointment.description =
              this.editedItem.appointment[i].gum_surgery[gs].description || "";
            appointment.tooth_gum =
              this.editedItem.appointment[i].gum_surgery[gs].tooth.gum || "";
            appointment.tooth_type =
              this.editedItem.appointment[i].gum_surgery[gs].tooth.type || "";
            appointment.grand_total =
              this.editedItem.appointment[i].gum_surgery[gs].grand_total ||
              0;
            this.appointmentItem.push(appointment);
          }
        } else if (this.editedItem.appointment[i].stag === 6) {
          for (
            var rs = 0;
            rs < this.editedItem.appointment[i].root_surgery.length;
            rs++
          ) {
            appointment.index_of_rs = rs;
            appointment.round =
              this.editedItem.appointment[i].root_surgery[rs].round || "";
            appointment.meet_at = this.editedItem.appointment[i].root_surgery[
              rs
            ].meet_at;
            appointment.fee_amount_received =
              this.editedItem.appointment[i].root_surgery[rs].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.editedItem.appointment[i].root_surgery[rs].fee.amount_due ||
              0;
            appointment.installment =
              this.editedItem.appointment[i].root_surgery[rs].fee.installment ||
              0;
            appointment.dentist =
              this.editedItem.appointment[i].root_surgery[rs].fee.dentist || 0;
            appointment.description =
              this.editedItem.appointment[i].root_surgery[rs].description || "";
            appointment.tooth_gum =
              this.editedItem.appointment[i].root_surgery[rs].tooth.gum || "";
            appointment.tooth =
              this.editedItem.appointment[i].root_surgery[rs].tooth.type || "";
            appointment.grand_total =
              this.editedItem.appointment[i].root_surgery[rs].grand_total ||
              0;
            this.appointmentItem.push(appointment);
          }
        } else if (this.editedItem.appointment[i].stag === 7) {
          for (
            var tp = 0;
            tp < this.editedItem.appointment[i].teeth_protice.length;
            tp++
          ) {
            appointment.index_of_tp = tp;
            appointment.round =
              this.editedItem.appointment[i].teeth_protice[tp].round || 1;
            appointment.meet_at = this.editedItem.appointment[i].teeth_protice[
              tp
            ].meet_at;
            appointment.fee_amount_received =
              this.editedItem.appointment[i].teeth_protice[tp].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.editedItem.appointment[i].teeth_protice[tp].fee.amount_due ||
              0;
            appointment.installment =
              this.editedItem.appointment[i].teeth_protice[tp].fee
                .installment || 0;
            appointment.dentist =
              this.editedItem.appointment[i].teeth_protice[tp].fee.dentist || 0;
            appointment.description =
              this.editedItem.appointment[i].teeth_protice[tp].description ||
              "";
            appointment.tooth_gum =
              this.editedItem.appointment[i].teeth_protice[tp].tooth.gum || "";
            appointment.tooth_type =
              this.editedItem.appointment[i].teeth_protice[tp].tooth.type || "";
            appointment.grand_total =
              this.editedItem.appointment[i].teeth_protice[tp].grand_total ||
              0;
            appointment.material =
              this.editedItem.appointment[i].teeth_protice[tp].material || "";
            this.appointmentItem.push(appointment);
          }
        } else if (this.editedItem.appointment[i].stag === 8) {
          for (
            var tb = 0;
            tb < this.editedItem.appointment[i].teeth_bleaching.length;
            tb++
          ) {
            appointment.index_of_tb = tb;
            appointment.round =
              this.editedItem.appointment[i].teeth_bleaching[tb].round || 1;
            appointment.meet_at = this.editedItem.appointment[
              i
            ].teeth_bleaching[tb].meet_at;
            appointment.fee_amount_received =
              this.editedItem.appointment[i].teeth_bleaching[tp].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.editedItem.appointment[i].teeth_bleaching[tb].fee
                .amount_due || 0;
            appointment.installment = this.editedItem.appointment[
              i
            ].teeth_bleaching[tb].fee.installment;
            appointment.dentist =
              this.editedItem.appointment[i].teeth_bleaching[tb].fee.dentist ||
              0;
            appointment.description =
              this.editedItem.appointment[i].teeth_bleaching[tb].description ||
              "";
            appointment.material =
              this.editedItem.appointment[i].teeth_bleaching[tb].material || "";
            appointment.tooth_gum =
              this.editedItem.appointment[i].teeth_bleaching[tb].tooth.gum ||
              "";
            appointment.tooth_type =
              this.editedItem.appointment[i].teeth_bleaching[tb].tooth.type ||
              "";
            appointment.grand_total =
              this.editedItem.appointment[i].teeth_bleaching[tb]
                .grand_total || 0;
            this.appointmentItem.push(appointment);
          }
        } else if (this.editedItem.appointment[i].stag === 9) {
          for (
            var ts = 0;
            ts < this.editedItem.appointment[i].teeth_scaling.length;
            ts++
          ) {
            appointment.index_of_ts = ts;
            appointment.round =
              this.editedItem.appointment[i].teeth_scaling[ts].round || 1;
            appointment.meet_at = this.editedItem.appointment[i].teeth_scaling[
              ts
            ].meet_at;
            appointment.fee_amount_received =
              this.editedItem.appointment[i].teeth_scaling[ts].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.editedItem.appointment[i].teeth_scaling[ts].fee.amount_due ||
              0;
            appointment.installment =
              this.editedItem.appointment[i].teeth_scaling[ts].fee
                .installment || 0;
            appointment.dentist =
              this.editedItem.appointment[i].teeth_scaling[ts].fee.dentist || 0;
            appointment.description =
              this.editedItem.appointment[i].teeth_scaling[ts].description ||
              "";
            appointment.tooth_type =
              this.editedItem.appointment[i].teeth_scaling[ts].tooth.type || "";
            appointment.tooth_gum =
              this.editedItem.appointment[i].teeth_scaling[ts].tooth.gum || "";
            appointment.grand_total =
              this.editedItem.appointment[i].teeth_scaling[ts].grand_total ||
              0;
            this.appointmentItem.push(appointment);
          }
        }
      }
    },
    showServices(services) {
      switch (services) {
        case 1:
          return "پرکردن دندان";
        case 2:
          return "پوش کردن دندان";
        case 3:
          return "ارتودانسی";
        case 4:
          return "کشیدن دندان";
        case 5:
          return "جراحی لثه دندان";
        case 6:
          return "جراحی ریشه دندان";
        case 7:
          return "پروتیز دندان";
        case 8:
          return "سفید کردن دندان";
        case 9:
          return "معاینه دهن";
      }
    },
    showDintstName(id) {
      const res = this.$store.state.staff.staff.find(({ _id }) => _id === id);
      if (res) {
        return res.firstname;
      } else {
        return "";
      }
    },
    openAppointmentEditDialog(item) {
      console.log(item);
      this.apointmentEditIndex = this.appointmentItem.indexOf(item);
      this.appointmentEditOb = Object.assign({}, item);
      this.appointmentEditDialog = true;
    },
    closeAppointmentEditDialog() {
      this.appointmentEditDialog = false;
      this.appointment_edit_stepper = 1;
      this.$nextTick(() => {
        this.appointmentEditOb = Object.assign(
          {},
          this.appointmentDefalutEditOb
        );
        this.apointmentEditIndex = -1;
      });
    },
    appointmentEditStepOne() {
      this.appointment_edit_stepper = 2;
    },
    openShowAppointmentDialog(item) {
      this.apointmentEditIndex = this.appointmentItem.indexOf(item);
      this.appointmentEditOb = Object.assign({}, item);
      this.appointmentShowDetails = true;
    },
    closeShowAppointmentDialog() {
      this.appointmentShowDetails = false;
      this.$nextTick(() => {
        this.appointmentEditOb = Object.assign(
          {},
          this.appointmentDefalutEditOb
        );
        this.apointmentEditIndex = -1;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>

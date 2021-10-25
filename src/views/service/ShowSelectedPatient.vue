<template>
  <v-row>
    <v-col class=""  cols="12" md="2" lg="2" xl="2" sm="12">
      <v-sheet rounded="lg" min-height="268">
        <v-card>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <strong>معلومات شخصی</strong>
              </v-col>
              <v-col cols="12">
                    <v-text-field
                      label="اسم"
                      v-model="selectPatient.firstname"
                      :value="selectPatient.firstname"
                      readonly
                    ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n5">
                    <v-text-field
                      label="تخلص"
                      v-model="selectPatient.lastname"
                      :value="selectPatient.lastname"
                      readonly
                    ></v-text-field>
                  </v-col>
              <v-col cols="12" class="mt-n5">
                <v-text-field
                  label="اسم پدر"
                  v-model="selectPatient.fathername"
                  :value="selectPatient.fathername"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n5">
                <v-text-field
                  label="شماره تماس"
                  v-model="selectPatient.phone"
                  :value="selectPatient.phone"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="mt-n5">
                <v-text-field
                  label="نمبر تذکره"
                  v-model="selectPatient.tazkira_id"
                  :value="selectPatient.tazkira_id"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col class="mt-n5" cols="12">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="جنسیت"
                      v-model="selectPatient.sex"
                      :value="selectPatient.age"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="سن"
                      v-model="selectPatient.age"
                      :value="selectPatient.age"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" class="mt-n5">
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      label="گروپ خون"
                      v-model="selectPatient.blood_group"
                      :value="selectPatient.blood_group"
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      label="حالت مدنی"
                      v-model="selectPatient.marital_status"
                      :value="selectPatient.marital_status"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>

    <v-col  cols="12" md="7" lg="7" xl="7"  sm="12">
      <v-sheet  rounded="lg">
        <v-card>
          <v-card-title>
            <v-row>
              <v-col class=" text-center" align-self="center" cols="3">
                <span>
                  دفعات مراجعه
                </span>
              </v-col>
              <v-divider inset class=" my-8 mr-n6" vertical></v-divider>
              <v-col class="mr-2" cols="5">
                <v-text-field
                  class="mt-6"
                  prepend-icon="mdi-magnify"
                  label="جستجو کردن"
                  v-model="search"
                  outlined
                  rounded
                ></v-text-field>
              </v-col>
              <v-col cols="4" class=" text-center">
                <v-btn
                  large
                  outlined
                  rounded
                  elevation="2"
                  @click="openAddNewRoundDialog"
                  color="primary"
                  class=" mt-8"
                  >اضافه کردن جلسه</v-btn
                >
              </v-col>
            </v-row>
          </v-card-title>
          <v-data-table
            :items="SelectServices"
            :headers="selectPatientServiceHeader"
            :search="search"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn @click="showAppointment(item)" icon
                ><v-icon color="primary">mdi-eye</v-icon></v-btn
              >
            </template>
            <template v-slot:item.meet_at="{ item }">
              {{ getRealDate(item.meet_at) }}
            </template>
          </v-data-table>
        </v-card>
      </v-sheet>
    </v-col>

    <v-col  cols="12" md="3" lg="3" xl="3" sm="12">
      <v-sheet rounded="lg" min-height="249">
        <v-card>
          <v-card-text>
            <template>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <strong>تاریخجه بیمار</strong>
                    <tr>
                      <th class="text-right">
                        نوعیت بیماری
                      </th>
                      <th>
                        نتیجه
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in selectPatient.case_history"
                      :key="item.name"
                    >
                      <td>{{ item.disease }}</td>
                      <td>
                        <v-chip
                          :color="item.result === true ? 'red' : 'primary'"
                          >{{ item.result === true ? "بلی" : "نخیر" }}</v-chip
                        >
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </template>
          </v-card-text>
        </v-card>
      </v-sheet>
    </v-col>
    <!-- dialog for show appointment -->
    <v-dialog persistent max-width="1000" v-model="apperppointment">
      <v-card>
        <v-card-title>
          <strong>نشان دادن جزییات دفعه مراجعه شده</strong>
          <v-spacer></v-spacer>
          <v-btn @click="closeShowAppointment" elevation="2" icon>
            <v-icon color="red">
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider class="my-6"></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6" lg="6" xl="6" sm="12">
              <v-row class="mt-3 px-12">
                <v-col cols="12" align="center"><strong>جلسه</strong></v-col>
                <v-col cols="12"><v-divider></v-divider></v-col>
                <v-col class="px-10" cols="12">
                  <v-row>
                    <v-col cols="12" md="4" lg="4" xl="4" sm="4">
                      <v-text-field
                        label="جلسه"
                        v-model="apointmentItem.round"
                        :value="apointmentItem.round"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" lg="6" xl="6" sm="6">
                      <v-text-field
                        label="تاریخ مراجعه"
                        :value="getRealDate(apointmentItem.meet_at)"
                        readonly
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col class="px-10 mt-n3" cols="12">
                  <v-row>
                    <v-col v-if="apointmentItem.stag ===5" cols="12" md="4" lg="4" xl="4" sm="4">
                      <v-text-field
                        label="کواردینات"
                        v-model="apointmentItem.tooth_gum"
                        :value="apointmentItem.round"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col v-else cols="12" md="4" lg="4" xl="4" sm="4">
                      <v-text-field
                        label="فک"
                        v-model="apointmentItem.tooth_gum"
                        :value="apointmentItem.round"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col v-if="apointmentItem.tooth_type"  cols="12" md="6" lg="6" xl="6" sm="6">
                      <v-text-field
                        label="دندان"
                        :value="apointmentItem.tooth_type"
                        readonly
                      ></v-text-field>
                    </v-col>
                    <v-col v-if="apointmentItem.material"  cols="12" md="6" lg="6" xl="6" sm="6">
                      <v-text-field
                        label="مواد استفاده شده"
                        :value="apointmentItem.material"
                        readonly
                      ></v-text-field>
                    </v-col>
                   
                  </v-row>
                </v-col>
                 <v-col  v-if="apointmentItem.description" class="px-10 mt-n3" cols="12">
                      <v-textarea
                        label="توضیحات"
                        v-model="apointmentItem.description"
                        :value="apointmentItem.description"
                        rows="2"
                        no-resize
                        readonly
                      ></v-textarea>
                    </v-col>
                     <v-col v-if="apointmentItem.image" class="px-10" cols="12">
                      <v-img
                        label="عکس"
                        class="mt-n3"
                        width="300"
                        height="150"
                        :src="`http://localhost:3000/uploads/docs/teeth/`+apointmentItem.image"
                      ></v-img>
                    </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6" lg="6" xl="6" sm="12">
              <v-row class="mt-3 px-12">
                <v-col cols="12" class="px-10" align="center">
                  <strong>فیس</strong>
                </v-col>
                <v-col class="px-10" cols="12"><v-divider></v-divider></v-col>
                <v-col class="px-10" cols="12">
                  <v-text-field
                    label="مجموعه کل"
                    v-model="apointmentItem.fee_grand_total"
                    :value="apointmentItem.fee_grand_total"
                    suffix="افغانی"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col class="px-10" cols="12">
                  <v-text-field
                    label="مجموعه دریافت شده"
                    v-model="apointmentItem.fee_amount_received"
                    suffix="افغانی"
                    :value="apointmentItem.fee_amount_received"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col class="px-10" cols="12">
                  <v-text-field
                    label="مجموعه باقی مانده"
                    v-model="apointmentItem.fee_amount_due"
                    suffix="افغانی"
                    :value="apointmentItem.fee_amount_due"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- dialog for add new rount----------------------------------------------------- -->
    <v-dialog scrollable persistent max-width="1000" v-model="newRounddialog">
      <v-card>
        <v-card-title>
          <strong>ثبت کردن جلسه جدید</strong>
          <v-spacer></v-spacer>
          <v-btn @click="closeAddNewRoundDialog" elevation="2" icon>
            <v-icon color="red">
              mdi-close
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="mt-3">
          <v-stepper v-model="newRountStepper">
            <v-stepper-header>
              <v-stepper-step step="1" :complete="newRountStepper > 1">
                جلسه جدید
              </v-stepper-step>
              <v-stepper-step step="2" :complete="newRountStepper > 2">
                  حساب مالی
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-form
                v-model="newRountForm"
                ref="newRountRef"
                @submit.prevent="submitNewRount"
              >
               <v-stepper-content step="1">
                  <v-row justify="center">
                    <v-col cols="12">
                      <v-row justify="center">
                        <v-col cols="6" md="6" class="mt-5" sm="12" xs="12">
                          <v-autocomplete
                            label="نوعیت مریضی"
                            :items="services"
                            item-value="value"
                            disabled
                            item-text="text"
                            v-model="patientData.stag"
                            :value="patientData.stag"
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
                      v-if="patientData.stag === 1"
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
                            v-model="patientData.material"
                            :value="patientData.material"
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
                            v-model="patientData.tooth_gum"
                            :value="patientData.tooth_gum"
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
                            v-model="patientData.tooth_type"
                            :value="patientData.tooth_type"
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
                            v-model="newRoundData.description"
                            :value="newRoundData.description"
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
                      v-if="patientData.stag === 2"
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
                            v-model="patientData.material"
                            :value="patientData.material"
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
                            v-model="patientData.tooth_gum"
                            :value="patientData.tooth_gum"
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
                            v-model="patientData.tooth_type"
                            :value="patientData.tooth_type"
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
                            v-model="newRoundData.description"
                            :value="newRoundData.description"
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
                      v-if="patientData.stag === 3"
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
                            v-model="patientData.tooth_gum"
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
                            v-model="newRoundData.description"
                            :value="newRoundData.description"
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
                      v-if="patientData.stag === 4"
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
                            v-model="patientData.tooth_gum"
                            :value="patientData.tooth_gum"
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
                            v-model="patientData.tooth_type"
                            :value="patientData.tooth_type"
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
                            v-model="newRoundData.description"
                            :value="newRoundData.description"
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
                      v-if="patientData.stag === 5"
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
                            v-model="patientData.tooth_gum"
                            :value="patientData.tooth_gum"
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
                            v-model="newRoundData.description"
                            :value="newRoundData.description"
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
                      v-if="patientData.stag === 6"
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
                            v-model="patientData.tooth_gum"
                            :value="patientData.tooth_gum"
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
                            v-model="patientData.tooth_type"
                            :value="patientData.tooth_type"
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
                            v-model="newRoundData.description"
                            :value="newRoundData.description"
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
                      v-if="patientData.stag === 7"
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
                            v-model="patientData.initail_services"
                            :value="patientData.initail_services"
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
                            v-model="patientData.tooth_gum"
                            :value="patientData.tooth_gum"
                            :rules="rule.rules.select"
                            outlined
                            rounded
                            required
                          >
                          </v-autocomplete>
                        </v-col>

                        <v-col
                          v-if="
                            patientData.initail_services === 'پروتیز قسمی'
                          "
                          cols="12"
                          md="12"
                          sm="12"
                          xs="12"
                        >
                          <v-autocomplete
                            label="دندان"
                            :items="teeths"
                            v-model="patientData.tooth_type"
                            :value="patientData.tooth_type"
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
                            v-model="newRoundData.description"
                            :value="newRoundData.description"
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
                      v-if="patientData.stag === 8"
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
                            v-model="patientData.material"
                            :value="patientData.material"
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
                            v-model="newRoundData.description"
                            :value="newRoundData.description"
                            outlined
                            rounded
                            required
                          >
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      v-if="patientData.stag === 9"
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
                            v-model="patientData.tooth_gum"
                            :value="patientData.tooth_gum"
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
                            v-model="newRoundData.description"
                            :value="newRoundData.description"
                            outlined
                            rounded
                            required
                          >
                          </v-textarea>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col
                      v-if="patientData.stag === 10"
                      cols="6"
                      md="6"
                      sm="12"
                      xs="12"
                    >
                      <v-row justify="center">
                        <v-col cols="12" md="12" sm="12" xs="12">
                          <v-textarea
                            label="نوت"
                            v-model="newRoundData.description"
                            :value="newRoundData.description"
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
                        <v-col cols="12" md="6" lg="6" xl="6" sm="6">
                          <v-btn
                            width="200"
                            color="red"
                            class="white--text"
                            large
                            @click="closeAddNewRoundDialog"
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
                          sm="6"
                          ><v-btn
                            elevation="3"
                            large
                            width="200"
                            color="primary"
                            @click="newRountStepper=2"
                            
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
                          <h2>هزینه</h2>
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
                            readonly
                            v-model="patientData.grand_total"
                            :values="patientData.grand_total"
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
                            v-model="patientData.installment"
                            :value="patientData.installment"
                            readonly
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
                        v-if="patientData.installment != 1"
                      >
                        <v-col cols="12" md="6">
                          <BaseEdittext
                            label="مبلغ قابل پرداخت"
                            v-model="newRoundData.amount_received"
                            :values="newRoundData.amount_received"
                            type="number"
                            :rules="rule.rules.number"
                            placeholder="مقدرا قابل پرداخت را وارد کنید"
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                     <v-col cols="12" class="mt-n5">
                      <v-row
                        justify="center"
                        v-if="patientData.installment != 1"
                      >
                        <v-col cols="12" md="6">
                         <span class="primary--text text-h6"> مجموعه کل مصارف <span class="red--text">{{patientData.grand_total}}</span> افغانی می باشد، که از این جمله <span class="red--text">{{patientData.amount_received}}</span> افغانی دریافت گردیده است و مبلغ <span class="red--text">{{patientData.amount_due}}</span> افغانی باقی می باشد.</span>
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
                        <v-col cols="12" md="6" lg="6" xl="6" sm="6">
                          <v-btn
                            width="200"
                            large
                            @click="newRountStepper=1"
                            color="red"
                            class="white--text"
                            
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
                          sm="6"
                          ><v-btn
                            :disabled="!newRountForm"
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
  </v-row>
</template>

<script>
import rules from "../../validation/validationRules.js";
export default {
  mounted() {
    this.initializServices();
  },
  data: () => ({
    rule: rules,
    newRountStepper:1,
    newRountForm:null,
    newRoundData:{
       fee:{},
      tooth:{
        gum:"",
        type:""
      }
    },
    patientData:{
     
    },
    type_pull_out_theeth: ["ساده", "عقلی", "امپکت"],
    type_surgary: ["کشیدن دندان", "جراحی لثه", "جراحی ریشه"],
    type_quardinat: ["1", "2", "3", "4"],
    teeths: ["1", "2", "3", "4", "5", "6", "7", "8"],
    theet_filling_matieral: ["کامپوزیت", "املگم", "سایر مواد"],
    theet_cover_matieral: ["پورسلن", "میتل", "زرگونیم", "گیگم"],
    services: [
        { text: "معاینه کردن دهن", value: 10 },
        {
          text: "پر کاری دندان",
          value: 1,
        },
        {
          text: "پوش کردن دندان ",
          value: 2,
        },
        {
          text: "ارتودانسی",
          value: 3,
        },
        {
          text: "کشیدن دندان ",
          value: 4,
        },
        {
          text: "جراحی ریشه دندان ",
          value: 6,
        },
        {
          text: "جراحی لثه",
          value: 5,
        },
        { text: "پروتیز دندان", value: 7 },
        {
          text: "سفید کردن دندان",
          value: 8,
        },
        {
          text: "جرم گیری دندان ",
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
    type_teeth_bleaching: [
        "یک مرحله یی",
        "دو مرحله یی",
        "سه مرحله یی",
        "چهار مرحله یی",
      ],
    type_fack_orthodoncy: ["بالا", "پایین", "هردو"],
    installments: [
        { text: "تکمیل", value: 1 },
        {
          text: "دو قسط",
          value: 2,
        },
        { text: "سه فسط", value: 3 },
      ],
    search: "",
    apperppointment: false,
    apointmentItem: {},
    newRounddialog: false,
    selectPatient: {},
    SelectServices: [],
    selectPatientServiceHeader: [
      {
        text: "تاریخ مراجعه",
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
        text: "مجموعه پول",
        value: "fee_grand_total",
        sortable: true,
        align: "start",
      },
      {
        text: "محموعه دریافت شده",
        value: "fee_amount_received",
        sortable: true,
        align: "start",
      },
      {
        text: "محموعه باقی مانده",
        value: "fee_amount_due",
        sortable: true,
        align: "start",
      },
      {
        text: "مشاهده  کردن",
        value: "actions",
        sortable: false,
        align: "start",
      },
    ],
  }),
  methods: {
    initializServices() {
      this.selectPatient = this.$route.params.selectPatient;
      let appointment = {};
      for (var i = 0; i < this.selectPatient.appointment.length; i++) {
        if (this.selectPatient.appointment[i].stag === 1) {
          for (
            var tf = 0;
            tf < this.selectPatient.appointment[i].teeth_filling.length;
            tf++
          ) {
            appointment.index_of_tf = tf;
            appointment.round =
              this.selectPatient.appointment[i].teeth_filling[tf].round || "";
            appointment.meet_at = this.selectPatient.appointment[
              i
            ].teeth_filling[tf].meet_at;
            appointment.fee_amount_received =
              this.selectPatient.appointment[i].teeth_filling[tf].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.selectPatient.appointment[i].teeth_filling[tf].fee
                .amount_due || 0;
            appointment.installment = this.selectPatient.appointment[
              i
            ].teeth_filling[tf].fee.installment;
            appointment.dentist =
              this.selectPatient.appointment[i].teeth_filling[tf].fee.dentist ||
              0;
            appointment.initial_swervices =
              this.selectPatient.appointment[i].teeth_filling[tf]
                .initial_swervices || " ";
            appointment.description =
              this.selectPatient.appointment[i].teeth_filling[tf].description ||
              " ";
            appointment.material =
              this.selectPatient.appointment[i].teeth_filling[tf].material ||
              " ";
            appointment.tooth_gum =
              this.selectPatient.appointment[i].teeth_filling[tf].tooth.gum ||
              " ";
            appointment.tooth_type =
              this.selectPatient.appointment[i].teeth_filling[tf].tooth.type ||
              " ";
            appointment.fee_grand_total =
              this.selectPatient.appointment[i].teeth_filling[tf].grand_total ||
              0;
            appointment.stag = this.selectPatient.appointment[i].stag;
            appointment.index_of_appoint = i;
            this.SelectServices.push(appointment);
            appointment = {};
          }
        } else if (this.selectPatient.appointment[i].stag === 2) {
          for (
            var tc = 0;
            tc < this.selectPatient.appointment[i].teeth_cover.length;
            tc++
          ) {
            appointment.index_of_tc = tc;
            appointment.round =
              this.selectPatient.appointment[i].teeth_cover[tc].round || "";
            appointment.meet_at = this.selectPatient.appointment[i].teeth_cover[
              tc
            ].meet_at;
            appointment.fee_amount_received =
              this.selectPatient.appointment[i].teeth_cover[tc].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.selectPatient.appointment[i].teeth_cover[tc].fee
                .amount_due || 0;
            appointment.installment = this.selectPatient.appointment[
              i
            ].teeth_cover[tc].fee.installment;
            appointment.dentist =
              this.selectPatient.appointment[i].teeth_cover[tc].fee.dentist ||
              0;
            appointment.material =
              this.selectPatient.appointment[i].teeth_cover[tc].material || " ";
            appointment.description =
              this.selectPatient.appointment[i].teeth_cover[tc].description ||
              " ";
            appointment.tooth_gum =
              this.selectPatient.appointment[i].teeth_cover[tc].tooth.gum ||
              " ";
            appointment.tooth_type =
              this.selectPatient.appointment[i].teeth_cover[tc].tooth.type ||
              " ";
            appointment.fee_grand_total =
              this.selectPatient.appointment[i].teeth_cover[tc].grand_total ||
              0;
            appointment.stag = this.selectPatient.appointment[i].stag;
            appointment.index_of_appoint = i;
            this.SelectServices.push(appointment);
            appointment = {};
          }
        } else if (this.selectPatient.appointment[i].stag === 3) {
          for (
            var o = 0;
            o < this.selectPatient.appointment[i].orthodoncy.length;
            o++
          ) {
            appointment.index_of_o = o;
            appointment.round =
              this.selectPatient.appointment[i].orthodoncy[o].round || "";
            appointment.meet_at = this.selectPatient.appointment[i].orthodoncy[
              o
            ].meet_at;
            appointment.fee_amount_received =
              this.selectPatient.appointment[i].orthodoncy[o].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.selectPatient.appointment[i].orthodoncy[o].fee.amount_due ||
              0;
            appointment.installment = this.selectPatient.appointment[
              i
            ].orthodoncy[o].fee.installment;
            appointment.dentist =
              this.selectPatient.appointment[i].orthodoncy[o].fee.dentist || 0;
            appointment.image =
              this.selectPatient.appointment[i].orthodoncy[o].image ||
              "default.png";
            appointment.description =
              this.selectPatient.appointment[i].orthodoncy[o].description || "";
            appointment.tooth_gum =
              this.selectPatient.appointment[i].orthodoncy[o].tooth.gum || "";
            appointment.tooth_type =
              this.selectPatient.appointment[i].orthodoncy[o].tooth.type || "";
            appointment.fee_grand_total =
              this.selectPatient.appointment[i].orthodoncy[o].grand_total || 0;
            appointment.stag = this.selectPatient.appointment[i].stag;
            appointment.index_of_appoint = i;
            this.SelectServices.push(appointment);
            appointment = {};
          }
        } else if (this.selectPatient.appointment[i].stag === 4) {
          for (
            var tr = 0;
            tr < this.selectPatient.appointment[i].teeth_remove.length;
            tr++
          ) {
            appointment.index_of_tr = tr;
            appointment.round =
              this.selectPatient.appointment[i].teeth_remove[tr].round || "";
            appointment.meet_at = this.selectPatient.appointment[
              i
            ].teeth_remove[tr].meet_at;
            appointment.fee_amount_received =
              this.selectPatient.appointment[i].teeth_remove[tr].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.selectPatient.appointment[i].teeth_remove[tr].fee
                .amount_due || 0;
            appointment.installment = this.selectPatient.appointment[
              i
            ].teeth_remove[tr].fee.installment;
            appointment.dentist =
              this.selectPatient.appointment[i].teeth_remove[tr].fee.dentist ||
              0;
            appointment.description =
              this.selectPatient.appointment[i].teeth_remove[tr].description ||
              "";
            appointment.tooth_gum =
              this.selectPatient.appointment[i].teeth_remove[tr].tooth.gum ||
              "";
            appointment.tooth_type =
              this.selectPatient.appointment[i].teeth_remove[tr].tooth.type ||
              "";
            appointment.fee_grand_total =
              this.selectPatient.appointment[i].teeth_remove[tr].grand_total ||
              0;
            appointment.stag = this.selectPatient.appointment[i].stag;
            appointment.index_of_appoint = i;
            this.SelectServices.push(appointment);
            appointment = {};
          }
        } else if (this.selectPatient.appointment[i].stag === 5) {
          for (
            var gs = 0;
            gs < this.selectPatient.appointment[i].gum_surgery.length;
            gs++
          ) {
            appointment.index_of_gs = gs;
            appointment.round =
              this.selectPatient.appointment[i].gum_surgery[gs].round || "";
            appointment.meet_at = this.selectPatient.appointment[i].gum_surgery[
              gs
            ].meet_at;
            appointment.fee_amount_received =
              this.selectPatient.appointment[i].gum_surgery[gs].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.selectPatient.appointment[i].gum_surgery[gs].fee
                .amount_due || 0;
            appointment.installment =
              this.selectPatient.appointment[i].gum_surgery[gs].fee
                .installment || 0;
            appointment.dentist =
              this.selectPatient.appointment[i].gum_surgery[gs].fee.dentist ||
              0;
            appointment.description =
              this.selectPatient.appointment[i].gum_surgery[gs].description ||
              "";
            appointment.tooth_gum =
              this.selectPatient.appointment[i].gum_surgery[gs].tooth.gum || "";
            appointment.tooth_type =
              this.selectPatient.appointment[i].gum_surgery[gs].tooth.type ||
              "";
            appointment.fee_grand_total =
              this.selectPatient.appointment[i].gum_surgery[gs].grand_total ||
              0;
            appointment.stag = this.selectPatient.appointment[i].stag;
            appointment.index_of_appoint = i;
            this.SelectServices.push(appointment);
            appointment = {};
          }
        } else if (this.selectPatient.appointment[i].stag === 6) {
          for (
            var rs = 0;
            rs < this.selectPatient.appointment[i].root_surgery.length;
            rs++
          ) {
            appointment.index_of_rs = rs;
            appointment.round =
              this.selectPatient.appointment[i].root_surgery[rs].round || "";
            appointment.meet_at = this.selectPatient.appointment[
              i
            ].root_surgery[rs].meet_at;
            appointment.fee_amount_received =
              this.selectPatient.appointment[i].root_surgery[rs].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.selectPatient.appointment[i].root_surgery[rs].fee
                .amount_due || 0;
            appointment.installment =
              this.selectPatient.appointment[i].root_surgery[rs].fee
                .installment || 0;
            appointment.dentist =
              this.selectPatient.appointment[i].root_surgery[rs].fee.dentist ||
              0;
            appointment.description =
              this.selectPatient.appointment[i].root_surgery[rs].description ||
              "";
            appointment.tooth_gum =
              this.selectPatient.appointment[i].root_surgery[rs].tooth.gum ||
              "";
            appointment.tooth_type =
              this.selectPatient.appointment[i].root_surgery[rs].tooth.type ||
              "";
            appointment.fee_grand_total =
              this.selectPatient.appointment[i].root_surgery[rs].grand_total ||
              0;
            appointment.stag = this.selectPatient.appointment[i].stag;
            appointment.index_of_appoint = i;
            this.SelectServices.push(appointment);
            appointment = {};
          }
        } else if (this.selectPatient.appointment[i].stag === 7) {
          for (
            var tp = 0;
            tp < this.selectPatient.appointment[i].teeth_protice.length;
            tp++
          ) {
            appointment.index_of_tp = tp;
            appointment.round =
              this.selectPatient.appointment[i].teeth_protice[tp].round || 1;
            appointment.meet_at = this.selectPatient.appointment[
              i
            ].teeth_protice[tp].meet_at;
            appointment.fee_amount_received =
              this.selectPatient.appointment[i].teeth_protice[tp].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.selectPatient.appointment[i].teeth_protice[tp].fee
                .amount_due || 0;
            appointment.installment =
              this.selectPatient.appointment[i].teeth_protice[tp].fee
                .installment || 0;
            appointment.dentist =
              this.selectPatient.appointment[i].teeth_protice[tp].fee.dentist ||
              0;
            appointment.description =
              this.selectPatient.appointment[i].teeth_protice[tp].description ||
              "";
            appointment.tooth_gum =
              this.selectPatient.appointment[i].teeth_protice[tp].tooth.gum ||
              "";
            appointment.tooth_type =
              this.selectPatient.appointment[i].teeth_protice[tp].tooth.type ||
              "";
            appointment.fee_grand_total =
              this.selectPatient.appointment[i].teeth_protice[tp].grand_total ||
              0;
            appointment.material =
              this.selectPatient.appointment[i].teeth_protice[tp].material ||
              "";
            appointment.stag = this.selectPatient.appointment[i].stag;
            appointment.index_of_appoint = i;
            this.SelectServices.push(appointment);
            appointment = {};
          }
        } else if (this.selectPatient.appointment[i].stag === 8) {
          for (
            var tb = 0;
            tb < this.selectPatient.appointment[i].teeth_bleaching.length;
            tb++
          ) {
            appointment.index_of_tb = tb;
            appointment.round =
              this.selectPatient.appointment[i].teeth_bleaching[tb].round || 1;
            appointment.meet_at = this.selectPatient.appointment[
              i
            ].teeth_bleaching[tb].meet_at;
            appointment.fee_amount_received =
              this.selectPatient.appointment[i].teeth_bleaching[tb].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.selectPatient.appointment[i].teeth_bleaching[tb].fee
                .amount_due || 0;
            appointment.installment = this.selectPatient.appointment[
              i
            ].teeth_bleaching[tb].fee.installment;
            appointment.dentist =
              this.selectPatient.appointment[i].teeth_bleaching[tb].fee
                .dentist || 0;
            appointment.description =
              this.selectPatient.appointment[i].teeth_bleaching[tb]
                .description || "";
            appointment.material =
              this.selectPatient.appointment[i].teeth_bleaching[tb].material ||
              "";
            appointment.fee_grand_total =
              this.selectPatient.appointment[i].teeth_bleaching[tb]
                .grand_total || 0;
            appointment.stag = this.selectPatient.appointment[i].stag;
            appointment.index_of_appoint = i;
            this.SelectServices.push(appointment);
            appointment = {};
          }
        } else if (this.selectPatient.appointment[i].stag === 9) {
          for (
            var ts = 0;
            ts < this.selectPatient.appointment[i].scaling.length;
            ts++
          ) {
            appointment.index_of_ts = ts;
            appointment.round =
              this.selectPatient.appointment[i].scaling[ts].round || 1;
            appointment.meet_at = this.selectPatient.appointment[i].scaling[
              ts
            ].meet_at;
            appointment.fee_amount_received =
              this.selectPatient.appointment[i].scaling[ts].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.selectPatient.appointment[i].scaling[ts].fee.amount_due || 0;
            appointment.installment =
              this.selectPatient.appointment[i].scaling[ts].fee.installment ||
              0;
            appointment.dentist =
              this.selectPatient.appointment[i].scaling[ts].fee.dentist || 0;
            appointment.description =
              this.selectPatient.appointment[i].scaling[ts].description || "";
            appointment.tooth_type =
              this.selectPatient.appointment[i].scaling[ts].tooth.type || "";
            appointment.tooth_gum =
              this.selectPatient.appointment[i].scaling[ts].tooth.gum || "";
            appointment.fee_grand_total =
              this.selectPatient.appointment[i].scaling[ts].grand_total || 0;
            appointment.stag = this.selectPatient.appointment[i].stag;
            appointment.index_of_appoint = i;
            this.SelectServices.push(appointment);
            appointment = {};
          }
        } else if (this.selectPatient.appointment[i].stag === 10) {
          for (
            var m_t = 0;
            m_t < this.selectPatient.appointment[i].mouth_testing.length;
            m_t++
          ) {
            appointment.index_of_m_t = m_t;
            appointment.round =
              this.selectPatient.appointment[i].mouth_testing[m_t].round || 1;
            appointment.meet_at = this.selectPatient.appointment[
              i
            ].mouth_testing[m_t].meet_at;
            appointment.fee_amount_received =
              this.selectPatient.appointment[i].mouth_testing[m_t].fee
                .amount_received || 0;
            appointment.fee_amount_due =
              this.selectPatient.appointment[i].mouth_testing[m_t].fee
                .amount_due || 0;
            appointment.installment =
              this.selectPatient.appointment[i].mouth_testing[m_t].fee
                .installment || 0;
            appointment.dentist =
              this.selectPatient.appointment[i].mouth_testing[m_t].fee
                .dentist || 0;
            appointment.description =
              this.selectPatient.appointment[i].mouth_testing[m_t]
                .description || "";
            appointment.fee_grand_total =
              this.selectPatient.appointment[i].mouth_testing[m_t]
                .grand_total || 0;
            appointment.stag = this.selectPatient.appointment[i].stag;
            appointment.index_of_appoint = i;
            this.SelectServices.push(appointment);
            appointment = {};
          }
        }
      }
    },
    showAppointment(data) {
      this.apointmentItem = data;
      console.log(this.apointmentItem);
      this.apperppointment = true;
    },
    closeShowAppointment() {
      this.apperppointment = false;
    },
    openAddNewRoundDialog() {
      this.newRounddialog = true;
      this.patientData._id = this.selectPatient._id;
      this.patientData.stag = parseInt(localStorage.getItem("selectedServices"));
      this.showServices(this.patientData.stag);
    },
    closeAddNewRoundDialog() {
      this.patientData = {};
      this.newRounddialog = false;
    },
    // format the timestamp date;
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
    showServices(stag){
        let round ={};
        switch (stag) {
        case 1:
          round = this.selectPatient.appointment[this.selectPatient.appointment.length-1].
          teeth_filling[this.selectPatient.appointment[this.selectPatient.appointment.length-1].teeth_filling.length-1]
          this.patientData.grand_total = round.grand_total;
          this.patientData.amount_due = round.fee.amount_due;
          this.patientData.amount_received = round.fee.amount_received;
          this.patientData.installment = round.fee.installment
          this.patientData.tooth_gum = round.tooth.gum;
          this.patientData. tooth_type = round.tooth.type;
          this.patientData.description = round.description;
          this.patientData.material = round.material;
          this.patientData.round = round.round;
          return "teeth_filling";
        case 2:
          round = this.selectPatient.appointment[this.selectPatient.appointment.length-1].
          teeth_cover[this.selectPatient.appointment[this.selectPatient.appointment.length-1].teeth_cover.length-1]
          this.patientData.grand_total = round.grand_total;
          this.patientData.amount_due = round.fee.amount_due;
          this.patientData.amount_received = round.fee.amount_received;
          this.patientData.installment = round.fee.installment;
          this.patientData.tooth_gum = round.tooth.gum;
          this.patientData. tooth_type = round.tooth.type;
          this.patientData.description = round.description;
          this.patientData.material = round.material;
          this.patientData.round = round.round;
          return "teeth_cover";
        case 3:
          round = this.selectPatient.appointment[this.selectPatient.appointment.length-1].
          orthodoncy[this.selectPatient.appointment[this.selectPatient.appointment.length-1].orthodoncy.length-1]
          this.patientData.grand_total = round.grand_total;
          this.patientData.amount_due = round.fee.amount_due;
          this.patientData.amount_received = round.fee.amount_received;
          this.patientData.installment = round.fee.installment;
          this.patientData.tooth_gum = round.tooth.gum;
          this.patientData. tooth_type = round.tooth.type;
          this.patientData.image = round.image;
          this.patientData.description = round.description;
          this.patientData.round = round.round;
          return "orthodoncy";
        case 4:
          round = this.selectPatient.appointment[this.selectPatient.appointment.length-1].
          teeth_remove[this.selectPatient.appointment[this.selectPatient.appointment.length-1].teeth_remove.length-1]
          this.patientData.grand_total = round.grand_total;
          this.patientData.amount_due = round.fee.amount_due;
          this.patientData.amount_received = round.fee.amount_received;
          this.patientData.installment = round.fee.installment;
          this.patientData.tooth_gum = round.tooth.gum;
          this.patientData. tooth_type = round.tooth.type;
          this.patientData.description = round.description;
          this.patientData.round = round.round;
          return "teeth_remove";
        case 5:
          round = this.selectPatient.appointment[this.selectPatient.appointment.length-1].
          gum_surgery[this.selectPatient.appointment[this.selectPatient.appointment.length-1].gum_surgery.length-1]
          this.patientData.grand_total = round.grand_total;
          this.patientData.amount_due = round.fee.amount_due;
          this.patientData.amount_received = round.fee.amount_received;
          this.patientData.installment = round.fee.installment;
          this.patientData.tooth_gum = round.tooth.gum;
          this.patientData. tooth_type = round.tooth.type;
          this.patientData.description = round.description;
          this.patientData.round = round.round;
          return "gum_surgery";
        case 6:
          round = this.selectPatient.appointment[this.selectPatient.appointment.length-1].
          root_surgery[this.selectPatient.appointment[this.selectPatient.appointment.length-1].root_surgery.length-1]
          this.patientData.grand_total = round.grand_total;
          this.patientData.amount_due = round.fee.amount_due;
          this.patientData.amount_received = round.fee.amount_received;
          this.patientData.installment = round.fee.installment;
          this.patientData.tooth_gum = round.tooth.gum;
          this.patientData. tooth_type = round.tooth.type;
          this.patientData.description = round.description;
          this.patientData.round = round.round;
          return "root_surgery";
        case 7:
          round = this.selectPatient.appointment[this.selectPatient.appointment.length-1].
         teeth_protice[this.selectPatient.appointment[this.selectPatient.appointment.length-1].teeth_protice.length-1]
          this.patientData.grand_total = round.grand_total;
          this.patientData.amount_due = round.fee.amount_due;
          this.patientData.amount_received = round.fee.amount_received;
          this.patientData.installment = round.fee.installment;
          this.patientData.tooth_gum = round.tooth.gum;
          this.patientData. tooth_type = round.tooth.type;
          this.patientData.description = round.description;
          this.patientData.material = round.material;
          this.patientData.round = round.round;
          return "teeth_protice";
        case 8:
          round = this.selectPatient.appointment[this.selectPatient.appointment.length-1].
          teeth_bleaching[this.selectPatient.appointment[this.selectPatient.appointment.length-1].teeth_bleaching.length-1]
          this.patientData.grand_total = round.grand_total;
          this.patientData.amount_due = round.fee.amount_due;
          this.patientData.amount_received = round.fee.amount_received;
          this.patientData.installment = round.fee.installment;
          this.patientData.description = round.description;
          this.patientData.step = round.step;
          this.patientData.material = round.material;
          this.patientData.round = round.round;
          return "teeth_bleaching";
        case 9:
           round = this.selectPatient.appointment[this.selectPatient.appointment.length-1].
          scaling[this.selectPatient.appointment[this.selectPatient.appointment.length-1].scaling.length-1]
          this.patientData.grand_total = round.grand_total;
          this.patientData.amount_due = round.fee.amount_due;
          this.patientData.amount_received = round.fee.amount_received;
          this.patientData.installment = round.fee.installment;
          this.patientData.tooth_gum = round.tooth.gum;
          this.patientData. tooth_type = round.tooth.type;
          this.patientData.description = round.description;
          this.patientData.round = round.round;
          return "teeth_scaling";
        case 10 :
           round = this.selectPatient.appointment[this.selectPatient.appointment.length-1].
          mouth_testing[this.selectPatient.appointment[this.selectPatient.appointment.length-1].mouth_testing.length-1]
          this.patientData.grand_total = round.grand_total;
          this.patientData.amount_due = round.fee.amount_due;
          this.patientData.amount_received = round.fee.amount_received; 
          this.patientData.installment = round.fee.installment;
          this.patientData.description = round.description;
          this.patientData.round = round.round;
          return "mouth_testing"
      }
    },
    submitNewRount(){
      if(this.$refs.newRountRef.validate()){
        this.newRoundData._id = this.patientData._id
        this.newRoundData.stag = this.patientData.stag;
        this.newRoundData.material = this.patientData.material;
        this.newRoundData.initial_swervices = this.patientData.initial_swervices;
        this.newRoundData.tooth.gum = this.patientData.tooth_gum;
        this.newRoundData.tooth.type = this.patientData.tooth_type;
        this.newRoundData.grand_total = this.patientData.grand_total;
        this.newRoundData.fee.installment = this.patientData.installment;
        this.newRoundData.fee.amount_received = this.newRoundData.amount_received;
        this.newRoundData.fee.amount_due = this.patientData.amount_due;
      }
    }
  },
};
</script>

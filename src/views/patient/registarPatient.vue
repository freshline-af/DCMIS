<template>
  <v-row>
    <v-col cols="12" md="12" sm="12" lg="12" xl="12">
      <h2>راجستر کردن بیمار جدید</h2>
    </v-col>
    <v-col cols="12" xl="12" md="12" sm="12">
      <v-stepper v-model="step">
        <!-- header of steper------------------------------- -->
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
          <!-- step 1 parsonal information form----------------------------- -->
          <v-stepper-content step="1">
            <v-form
              v-model="registarForm"
              ref="regis_patient"
              @submit.prevent="step1_parsonal"
              lazy-validation
            >
              <v-row class="mt-4" justify="center">
                <v-col align="start" cols="12" md="6" sm="12" xs="12">
                  <h2 class="mt-2">لطفا معلومات شخصی بیمار مورد نطر را وارد کنید.</h2>
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
                        v-model="new_patient.firstname"
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
                        v-model="new_patient.fathername"
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
                        v-model="new_patient.lastname"
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
                        v-model="new_patient.occupation"
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
                          <v-select
                            label="جنسیت"
                            v-model="new_patient.sex"
                            outlined
                            rounded
                            required
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
                            v-model="tazkira_id"
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
                          <v-text-field
                            label="نمبر تماس"
                            hint=".وارد کردن شماره تماس الزامی می باشد"
                            placeholder=".لطفا شماره تماس خود را وارد کنید"
                            type="text"
                            @input="formatPhoneNumber"
                            :rules="rule.rules.required_phone"
                            outlined
                            rounded
                            v-model="phone_number"
                            prepend-icon="mdi-phone"
                          />
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="12" sm="12" lg="12" xl="12" class="mb-3">
                  <v-row>
                    <v-col
                      class="text-end"
                      cols="12"
                      md="12"
                      lg="12"
                      xl="12"
                      sm="12"
                      ><v-btn
                        :disabled="!registarForm"
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
            <v-form
              v-model="case_history_form"
              ref="case_history_form"
              @submit.prevent="step2_case_history"
            >
              <v-row justify="center">
                <v-col cols="12" md="6">
                  <h2>.لطفا تاریخجه بیمار را وارد کیند</h2>
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
                          ><v-radio label="بلی" value="true"></v-radio
                        ></v-col>
                        <v-col
                          ><v-radio label="نخیر" value="false"></v-radio
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
                          ><v-radio label="بلی" value="true"></v-radio
                        ></v-col>
                        <v-col
                          ><v-radio label="نخیر" value="false"></v-radio
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
                          <v-radio label="بلی" value="true"></v-radio>
                        </v-col>
                        <v-col>
                          <v-radio label="نخیر" value="false"></v-radio>
                        </v-col>
                      </v-row>
                    </v-radio-group>
                  </v-row>
                </v-col>
                <v-col cols="12" md="12" sm="12" lg="12" xl="12" class="mb-3">
                  <v-row>
                    <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                      <v-btn width="200" large @click="step = 1">
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
                        :disabled="!case_history_form"
                        elevation="3"
                        large
                        width="200"
                        color="primary"
                        type="submit"
                      >
                        بعدی
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-stepper-content>

          <!-- step 3 disease type selection------------------------------------ -->
          <v-stepper-content step="3">
            <v-form
              v-model="disease_type_3"
              ref="disease_type_form"
              @submit.prevent="step3_disease_type"
            >
              <v-row justify="center">
                <v-col cols="12" md="6">
                  <h2>.لطفا نوعیت و جزییات بیماری را وارد کنید</h2>
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
                        item-value="value"
                        item-text="text"
                        v-model="appointment.stag"
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
                  v-if="appointment.stag === 1"
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
                        v-model="appointment.teeth_filling.material"
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
                        v-model="appointment.teeth_filling.tooth.gum"
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
                        v-model="appointment.teeth_filling.tooth.type"
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
                        v-model="appointment.teeth_filling.description"
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
                  v-if="appointment.stag === 2"
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
                        v-model="appointment.teeth_cover.material"
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
                        v-model="appointment.teeth_cover.tooth.gum"
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
                        v-model="appointment.teeth_cover.tooth.type"
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
                        v-model="appointment.teeth_cover.description"
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
                  v-if="appointment.stag === 3"
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
                        v-model="appointment.orthodoncy.tooth.gum"
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
                        v-model="appointment.orthodoncy.image"
                        :rules="rule.rules.file"
                        rounded
                        required
                      ></v-file-input>
                    </v-col>
                    <v-col cols="12" md="12" sm="12" xs="12">
                      <v-textarea
                        label="نوت"
                        v-model="appointment.orthodoncy.description"
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
                  v-if="appointment.stag === 4"
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
                        v-model="appointment.teeth_remove.tooth.gum"
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
                        v-model="appointment.teeth_remove.tooth.type"
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
                        v-model="appointment.teeth_remove.description"
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
                  v-if="appointment.stag === 5"
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
                        v-model="appointment.teeth_surgery.tooth.gum"
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
                        v-model="appointment.teeth_surgery.description"
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
                  v-if="appointment.stag === 6"
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
                        v-model="appointment.root_surgery.tooth.gum"
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
                        v-model="appointment.root_surgery.tooth.type"
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
                        v-model="appointment.root_surgery.description"
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
                  v-if="appointment.stag === 7"
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
                        v-model="appointment.teeth_protice.initail_services"
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
                        v-model="appointment.teeth_protice.tooth.gum"
                        :rules="rule.rules.select"
                        outlined
                        rounded
                        required
                      >
                      </v-autocomplete>
                    </v-col>

                    <v-col
                      v-if="
                        appointment.teeth_protice.initail_services ===
                          'پروتیز قسمی'
                      "
                      cols="12"
                      md="12"
                      sm="12"
                      xs="12"
                    >
                      <v-autocomplete
                        label="دندان"
                        :items="teeths"
                        v-model="appointment.teeth_protice.tooth.type"
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
                        v-model="appointment.teeth_protice.description"
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
                  v-if="appointment.stag === 8"
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
                        v-model="appointment.teeth_bleaching.material"
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
                        v-model="appointment.teeth_bleaching.description"
                        outlined
                        rounded
                        required
                      >
                      </v-textarea>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  v-if="appointment.stag === 9"
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
                        v-model="appointment.scaling.tooth.gum"
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
                        v-model="appointment.scaling.description"
                        outlined
                        rounded
                        required
                      >
                      </v-textarea>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  v-if="appointment.stag === 10"
                  cols="6"
                  md="6"
                  sm="12"
                  xs="12"
                >
                  <v-row justify="center">
                    <v-col cols="12" md="12" sm="12" xs="12">
                      <v-textarea
                        label="نوت"
                        v-model="appointment.mounth_testing.description"
                        outlined
                        rounded
                        required
                      >
                      </v-textarea>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="12" sm="12" lg="12" xl="12" class="mb-3">
                  <v-row>
                    <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                      <v-btn width="200" large @click="step = 2">
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
                        type="submit"
                      >
                        بعدی
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-stepper-content>
          <!-- step 4 finaces -->
          <v-stepper-content step="4">
            <v-form
              v-model="form_4"
              ref="submit_new_patient_form"
              @submit.prevent="PatientRagistar"
            >
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
                        v-model="fee.grand_total"
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
                        v-model="fee.installment"
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
                  <v-row justify="center" v-if="fee.installment != 1">
                    <v-col cols="12" md="6">
                      <BaseEdittext
                        label="مبلغ قابل پرداخت"
                        v-model="fee.amount_received"
                        type="number"
                        :rules="rule.rules.number"
                        placeholder="مقدرا قابل پرداخت را وارد کنید"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12" md="12" sm="12" lg="12" xl="12" class="mb-3">
                  <v-row>
                    <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                      <v-btn width="200" large @click="step = 3">
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
                        :disabled="!form_4"
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
      phone_number: "",
      tazkira_id: "",
      user_login_id:0,
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
      case_history_form: null,
      disease_type_3: null,
      form_4: null,
      registarForm: null,
      amount_due: "",
      step: 1,
      rule: rules,
      heart: "false",
      dieabet: "false",
      blood: "false",
      type_pull_out_theeth: ["ساده", "عقلی", "امپکت"],
      type_surgary: ["کشیدن دندان ها", "جراحی لثه", "جراحی ریشه"],
      type_quardinat: ["1", "2", "3", "4"],
      teeths: ["1", "2", "3", "4", "5", "6", "7", "8"],
      fee: [
        {
          installment: "",
          amount_received: "",
          amount_due: "",
          dentist: "",
        },
      ],
      theet_filling_matieral: ["کامپوزیت", "املگم", "سایر مواد"],
      theet_cover_matieral: ["پورسلن", "میتل", "زرگونیم", "گیگم"],
      type_teeth_bleaching: [
        "یک مرحله یی",
        "دو مرحله یی",
        "سه مرحله یی",
        "چهار مرحله یی",
      ],
      new_patient: {
        appointment: [],
      },
      marital_status: ["مجرد", "متاهل"],
      six: ["مذکر", "مونث"],
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
          value: 5,
        },
        {
          text: "حراحی لثه",
          value: 6,
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
      patient_caseHistory: [],
      appointment2: {
        teeth_filling: [],
        teeth_cover: [],
        orthodoncy: [],
        teeth_remove: [],
        teeth_surgery: [],
        root_surgery: [],
        teeth_protice: [],
        teeth_bleaching: [],
        scaling: [],
        mounth_testing: [],
      },
      appointment: {
        stag: "",
        teeth_filling: {
          tooth: {},
          fee: {},
          total_received: "",
        },
        teeth_cover: {
          tooth: {},
          fee: {},
          total_received: "",
        },
        orthodoncy: {
          tooth: {},
          fee: {},
          total_received: "",
        },
        teeth_remove: {
          tooth: {},
          fee: {},
          total_received: "",
        },
        teeth_surgery: {
          tooth: {},
          fee: {},
          total_received: "",
        },
        root_surgery: {
          tooth: {},
          fee: {},
          total_received: "",
        },
        teeth_protice: {
          tooth: {},
          fee: {},
          total_received: "",
        },
        teeth_bleaching: {
          tooth: {},
          fee: {},
          total_received: "",
        },
        scaling: {
          tooth: {},
          fee: {},
          total_received: "",
        },
        mounth_testing: {
          tooth: {},
          fee: {},
          total_received: "",
        },
      },
    };
  },
  mounted() {
    this.user_login_id = JSON.parse(localStorage.getItem("user"))._id;
    this.patient_caseHistory = this.$store.state.services.caseHistory;
  },
  methods: {
    formatTazkira_number() {
      var tazkira = this.tazkira_id
        .replace(/\D/g, "")
        .match(/(\d{0,4})(\d{0,4})(\d{0,5})/);
      this.tazkira_id = !tazkira[2]
        ? tazkira[1]
        : tazkira[1] + "-" + tazkira[2] + (tazkira[3] ? "-" + tazkira[3] : "");
    },
    formatPhoneNumber() {
      var phone = this.phone_number
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.phone_number = !phone[2]
        ? phone[1]
        : phone[1] + "-" + phone[2] + (phone[3] ? "-" + phone[3] : "");
    },
    step1_parsonal() {
      if (this.$refs.regis_patient.validate()) {
        this.new_patient.phone = this.phone_number;
        this.new_patient.tazkira_id = this.tazkira_id;
        this.step = 2;
      }
    },
    step2_case_history() {
      if (this.$refs.case_history_form.validate()) {
        this.step = 3;
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
      }
    },
    step3_disease_type() {
      if (this.$refs.disease_type_form.validate()) {
        this.step = 4;
      }
    },

    PatientRagistar() {
      if (this.$refs.submit_new_patient_form.validate()) {
        if (this.appointment.stag === 1) {
          this.appointment.teeth_filling.fee = {
            installment: this.fee.installment,
            amount_received: this.fee.amount_received,
            dentist: this.user_login_id,
          };
          this.appointment.teeth_filling.grand_total = this.fee.grand_total;
          this.appointment2.stag = 1;
          this.appointment2.teeth_filling.push(this.appointment.teeth_filling);
          this.new_patient.appointment.push(this.appointment2);
        } else if (this.appointment.stag === 2) {
          this.appointment.teeth_cover.fee = {
            installment: this.fee.installment,
            amount_received: this.fee.amount_received,
            dentist: this.user_login_id,
          };
          this.appointment.teeth_cover.grand_total = this.fee.grand_total;
          this.appointment2.stag = 2;
          this.appointment2.teeth_cover.push(this.appointment.teeth_cover);
          this.new_patient.appointment.push(this.appointment2);
        } else if (this.appointment.stag === 3) {
          this.appointment.orthodoncy.fee = {
            installment: this.fee.installment,
            amount_received: this.fee.amount_received,
            dentist:  this.user_login_id,
            image: this.appointment.orthodoncy.image,
          };
          this.appointment.orthodoncy.grand_total =  this.fee.grand_total;
          this.appointment2.stag = 3;
          this.appointment2.orthodoncy.push(this.appointment.orthodoncy);
          this.new_patient.appointment.push(this.appointment2);
        } else if (this.appointment.stag === 4) {
          this.appointment.teeth_remove.fee = {
            installment: this.fee.installment,
            amount_received: this.fee.amount_received,
            dentist:  this.user_login_id,
          };
          this.appointment.teeth_remove.grand_total =  this.fee.grand_total;
          this.appointment2.stag = 4;
          this.appointment2.teeth_remove.push(this.appointment.teeth_remove);
          this.new_patient.appointment.push(this.appointment2);
        } else if (this.appointment.stag === 5) {
          this.appointment.teeth_surgery.fee = {
            installment: this.fee.installment,
            amount_received: this.fee.amount_received,
            dentist:  this.user_login_id,
          };
          this.appointment.teeth_surgery.grand_total = this.fee.grand_total;
          this.appointment2.stag = 5;
          this.appointment2.teeth_surgery.push(this.appointment.teeth_surgery);
          this.new_patient.appointment.push(this.appointment2);
        } else if (this.appointment.stag === 6) {
          this.appointment.root_surgery.fee = {
            installment: this.fee.installment,
            amount_received: this.fee.amount_received,
            dentist:  this.user_login_id,
          };
          this.appointment.root_surgery.grand_total =this.fee.grand_total;
          this.appointment2.stag = 6;
          this.appointment2.root_surgery.push(this.appointment.root_surgery);
          this.new_patient.appointment.push(this.appointment2);
        } else if (this.appointment.stag === 7) {
          this.appointment.teeth_protice.fee = {
            installment: this.fee.installment,
            amount_received: this.fee.amount_received,
            dentist:  this.user_login_id,
          };
          this.appointment.teeth_protice.grand_total = this.fee.grand_total;
          this.appointment2.stag = 7;
          this.appointment2.teeth_protice.push(this.appointment.teeth_protice);
          this.new_patient.appointment.push(this.appointment2);
        } else if (this.appointment.stag === 8) {
          this.appointment.teeth_bleaching.fee = {
            installment: this.fee.installment,
            amount_received: this.fee.amount_received,
            dentist:  this.user_login_id,
          };
          this.appointment.teeth_bleaching.grand_total = this.fee.grand_total;
          this.appointment2.stag = 8;
          this.appointment2.teeth_bleaching.push(
            this.appointment.teeth_bleaching
          );
          this.new_patient.appointment.push(this.appointment2);
        } else if (this.appointment.stag === 9) {
          this.appointment.scaling.fee = {
            installment: this.fee.installment,
            amount_received: this.fee.amount_received,
            dentist:  this.user_login_id,
          };
          this.appointment.scaling.grand_total = this.fee.grand_total;
          this.appointment2.stag = 9;
          this.appointment2.scaling.push(this.appointment.scaling);
          this.new_patient.appointment.push(this.appointment2);
        }
        console.log(this.new_patient);
        this.$store.dispatch("patient/addPatient", this.new_patient);
        this.$store.dispatch("patient/getListOfPatient");
        this.$router.push({ name: "patient" });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>

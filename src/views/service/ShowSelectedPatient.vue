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
    <v-dialog persistent max-width="1000" v-model="newRounddialog">
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
               
              </v-form>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  mounted() {
    this.initializServices();
  },
  data: () => ({
    newRountStepper:1,
    newRountForm:null,
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
        text: "عملیه",
        value: "actions",
        sortable: true,
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
    },
    closeAddNewRoundDialog() {
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
  },
};
</script>

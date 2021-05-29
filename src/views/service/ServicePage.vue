<template>
  <v-container>
    <v-row justify-space-between class="mr-sm-4 mt-sm-3 mb-sm-3">
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.one)">
          <h2 slot="Content">{{ services.services.one.name }}</h2>
          <v-icon slot="icon">{{ services.services.one.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.two)">
          <h2 slot="Content">{{ services.services.two.name }}</h2>
          <v-icon slot="icon">{{ services.services.two.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.three)">
          <h2 slot="Content">{{ services.services.three.name }}</h2>
          <v-icon slot="icon">{{ services.services.three.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.four)">
          <h2 slot="Content">{{ services.services.four.name }}</h2>
          <v-icon slot="icon">{{ services.services.four.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.five)">
          <h2 slot="Content">{{ services.services.five.name }}</h2>
          <v-icon slot="icon">{{ services.services.five.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.six)">
          <h2 slot="Content">{{ services.services.six.name }}</h2>
          <v-icon slot="icon">{{ services.services.six.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.seven)">
          <h2 slot="Content">{{ services.services.seven.name }}</h2>
          <v-icon slot="icon">{{ services.services.seven.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.eight)">
          <h2 slot="Content">{{ services.services.eight.name }}</h2>
          <v-icon slot="icon">{{ services.services.eight.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.nine)">
          <h2 slot="Content">{{ services.services.nine.name }}</h2>
          <v-icon slot="icon">{{ services.services.nine.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.ten)">
          <h2 slot="Content">{{ services.services.ten.name }}</h2>
          <v-icon slot="icon">{{ services.services.ten.icon }}</v-icon>
        </BaseCard>
      </v-col>
    </v-row>
    <template>
      <v-dialog v-model="dialog" fullscreen>
        <v-card>
          <v-card-title>
            <v-row>
              <v-col cols="12" md="12" sm="12" lg="12">
                <v-row class="mt-3 mx-3">
                  <span class="mt-2">{{ selectedService.name }}</span>
                  <v-spacer></v-spacer>
                  <v-btn class="mt-2" icon elevation="3" @click="close">
                    <v-icon>
                      mdi-close
                    </v-icon>
                  </v-btn>
                </v-row>
              </v-col>
              <v-col cols="12" md="12" lg="12" sm="12" xl="12">
                <v-row justify="center" class="mt-md-n16">
                  <v-col cols="12" md="6" lg="6" sm="12" xl="6">
                    <v-autocomplete
                      label="انتخاب کردن بیمار"
                      :items="patientList"
                      v-model="selectPatientName"
                      @change="selectedPatient"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <!-- Show the Parsonal information of patient  -->
              <v-col cols="12" md="4" lg="4" xl="4" sm="12">
                <v-row
                  v-if="selectPatientName != null"
                  class="  elevation-1 mt-4"
                >
                  <v-col cols="12" class="text-center">
                    <span>معلومات شخصی</span>
                    <v-divider class="mt-3"></v-divider>
                  </v-col>
                  <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                    <v-text-field
                      label="اسم"
                      v-model="selectPatient.firstname"
                      type="text"
                      class="px-2"
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                    <v-text-field
                      label="نمبر تذکره"
                      v-model="selectPatient.tazkira_id"
                      type="number"
                      class="px-2"
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" lg="6" xl="6" sm="12">
                    <v-text-field
                      label="سن"
                      v-model="selectPatient.age"
                      type="number"
                      class="px-2"
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                    <v-text-field
                      label="نمبر تماس"
                      v-model="selectPatient.phone"
                      type="number"
                      class="px-2"
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="12" lg="12" xl="12" sm="12">
                    <v-text-field
                      label="آدرس"
                      v-model="selectPatient.address"
                      type="text"
                      readonly
                      class="px-2"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                    <v-text-field
                      label="هزینه کل  "
                      v-model="selectPatient.fee"
                      type="text"
                      class="px-2"
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                    <v-text-field
                      label="نوعیت سرویس"
                      v-model="selectPatient.disease"
                      type="text"
                      readonly
                      class="px-2"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <!-- Show the case history of patients -->
              <v-col cols="12" md="4" lg="4" xl="4" sm="12">
               <v-row v-if="selectPatientName != null" class=" pxr3 elevation-1 mt-4">
                   <v-col  class="text-center mt-3" cols="12" md="12" sm="12" lg="12" xl="12">
                    <span>تاریخچه مریض</span>
                    <v-divider class="mt-3"></v-divider>
                  </v-col>
                  <v-col class="mb-7" v-if="selectPatient.case_history">
                    <v-row v-for="item in selectPatient.case_history" :key="item.disease">
                      <v-col class="pr-5">
                       <strong>{{item.disease}}</strong>
                      </v-col>
                      <v-col class="pr-5">
                        <span class="red--text" v-if="item.result=== result" >{{item.result}}</span>
                        <span v-else >{{item.result}}</span>
                      </v-col>
                      <v-col>

                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col v-else  class="text-center mt-12 mb-15" cols="12" md="12" sm="12" lg="12" xl="12">
                   <span class="red--text">مریض مورد نظر هیچ تاریخچه ندارد</span>
                  </v-col>
               
               </v-row>
              </v-col>
              <!-- Show the number of appoinment of the patient -->
              <v-col cols="12" md="4" lg="4" xl="4" sm="12">
                <v-row
                  v-if="selectPatientName != null"
                  class="elevation-1 mt-4"
                >
                  <v-col>
                    <v-col class="text-center">
                      <span>دفعات مراجعه </span>
                      <v-divider class="mt-3"></v-divider>
                      </v-col>
                    <v-timeline v-if="selectPatient.appointment" class="mt-4">
                     <v-timeline-item color="pink" small v-for="item in selectPatient.appointment" :key="item.round">
                     <v-row>
                       <v-col>
                          <strong>دوره {{item.round}}</strong>
                       </v-col>
                       <v-col>
                         <strong>تاریخ دوره {{getDate(item.meet_date)}}</strong>
                       </v-col>
                     </v-row>
                     </v-timeline-item>
                     
                    </v-timeline>
                    <v-col class=" mt-12 mb-12 text-center" v-else>
                     <span class="red--text">مریض مورد نظر هیج مراجعه تا فعلا نداشته است</span>
                    </v-col>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Store from "../../store/index";
export default {
  async beforeRouteEnter(routeTo, routeFrom, next) {
    await Store.dispatch("patient/getListOfPatient");
    next();
  },
  data() {
    return {
      dialog: false,
      result:"بلی",
      selectedService: {},
      patientList: [],
      selectPatient: [],
      selectPatientName: null,
    };
  },
  created() {
    this.setPatientList();
  },

  computed: {
    ...mapState(["services"]),
  },
  methods: {
    close() {
      this.dialog = false;
      this.selectPatientName = null;
      this.selectPatient = null;
    },
    selectService(data) {
      this.selectedService = data;
      this.dialog = true;
    },
    setPatientList() {
      let patient = Object.values(Store.state.patient.patients);
      patient.forEach((e) => this.patientList.push(e.firstname));
    },
    selectedPatient(value) {
      let firstname = value;
      let patient = Object.values(Store.state.patient.patients);
      this.selectPatient = patient.find((e) => e.firstname == firstname);
    },
    // format the timestamp date to day-month-year format
    getDate(date){
      let date_time = new Date(date);
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return date_time.getFullYear() + " " + months[date_time.getMonth("MM")] + " "+  date_time.getDate() ;
    }
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <v-app>
    <v-app-bar app flat>
      <strong class="pr-3">نشان دادن مشخصات</strong>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row>
          <v-col class="mr-md-n10" cols="12" md="4" lg="4" xl="4" sm="4">
            <v-card>
              <v-card-title align="center">
                <v-avatar size="80" class="mr-1" color="blue">
                  <v-img v-if="editedItem.image != null"> </v-img>
                  <span class="white--text" v-else>{{
                    showname(editedItem.firstname)
                  }}</span>
                </v-avatar>
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
                    <strong>لست دفعات مراجعه شده</strong>
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
                    <v-sheet>
                      <span>بیمار مورد نظر هیچ تاریخچه ندارد</span>
                    </v-sheet>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="12">
                <v-card>
                  <v-card-title>
                    <strong>لیست هزینه ها</strong>
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
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      editedItem: [],
    };
  },
  mounted(){
   this.editedItem=this.$route.params.editedItem;
  },
  methods: {
    showname(firstname) {
      let name = "" + firstname + "".split("");
      return name[0] + name[1];
    },
     getDate(date){
      let date_time = new Date(date);
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return months[date_time.getMonth("MM")]  + " " +  date_time.getDate()  + " "+ date_time.getFullYear()    ;
    },
  },
};
</script>

<style lang="scss" scoped></style>

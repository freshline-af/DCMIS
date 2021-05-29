<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <v-col cols="4" md="4" lg="4" sm="12">
          <v-row class="text-center mt-3">
            <v-col>
              <v-avatar size="90" color="primary">
                <v-img src="../../assets/face.png">
                  <v-btn icon outlined rounded class="mr-7 mt-12"
                    ><v-icon color="light-blue">mdi-pencil</v-icon></v-btn
                  >
                </v-img>
              </v-avatar>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-title>
                <span>معلومات شخصی</span>
              </v-card-title>
            </v-col>
            <v-col>
              <v-btn
                icon
                elevation="3"
                class="mt-3"
                @click="enableParsonelEidt"
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider class="mx-sm-3"></v-divider>
          <v-row class="mt-3 mx-sm-3">
            <v-col cols="12" md="6">
              <v-text-field
                label="اسم"
                :readonly="enableParsonelInfo"
                type="text"
                v-model="user_login_info.personalInfo.name"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="نام پدر"
                :readonly="enableParsonelInfo"
                type="text"
                v-model="user_login_info.personalInfo.fName"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-3 mx-sm-3">
            <v-col cols="12" md="6">
              <v-text-field
                label="تخلص"
                :readonly="enableParsonelInfo"
                type="text"
                v-model="user_login_info.personalInfo.lName"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="شماره تماس"
                :readonly="enableParsonelInfo"
                type="number"
                v-model="user_login_info.personalInfo.phone"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-3 mx-sm-3">
            <v-col cols="12" md="6">
              <v-text-field
                label="آدرس"
                :readonly="enableParsonelInfo"
                type="text"
                v-model="user_login_info.personalInfo.address"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="شماره تذکره"
                :readonly="enableParsonelInfo"
                type="number"
                v-model="user_login_info.personalInfo.tazkrahNum"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="!enableParsonelInfo" class="mx-sm-8 mx-md-3">
            <v-col cols="12" md="6" lg="6" sm="6">
              <v-btn elevation="3" outlined @click="cancelParsonalEdit">
                لغو کردن
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" lg="6" sm="6">
              <v-btn elevation="3" outlined>
                تغیر دادن
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="mt-md-16" cols="8" md="8" lg="8" sm="12">
          <v-row class="mr-md-4 mt-md-14">
            <v-col>
              <v-card-title>
                <span>تحصیلات</span>
              </v-card-title>
            </v-col>
            <v-col>
              <v-btn
                icon
                @click="enableEduEdit"
                elevation="3"
                class=" mt-3 mr-md-3"
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider class="mr-11"></v-divider>
          <v-row class="mt-4 mr-md-8 mx-sm-3">
            <v-col cols="6" md="6" lg="6" sm="12">
              <v-text-field
                :readonly="enableEducationInfo"
                type="text"
                label="درجه تحصیلی"
                v-model="user_login_info.education.eduDegree"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6" lg="6" sm="12">
              <v-text-field
                :readonly="enableEducationInfo"
                type="text"
                label="پوهنتون"
                v-model="user_login_info.education.university"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-4 mr-md-8 mx-sm-3">
            <v-col cols="6" md="6" lg="6" sm="12">
              <v-text-field
                :readonly="enableEducationInfo"
                type="text"
                label="سال شمولیت"
                v-model="user_login_info.education.startDate"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="6" lg="6" sm="12">
              <v-text-field
                :readonly="enableEducationInfo"
                type="text"
                label="سال فراغت"
                v-model="user_login_info.education.endDate"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-4 mr-md-8 mx-sm-3">
            <v-col cols="6" md="6" lg="6" sm="12">
              <v-text-field
                :readonly="enableEducationInfo"
                type="text"
                label="رشته تحصیلی"
                v-model="user_login_info.education.filed"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="!enableEducationInfo" class="mt-4 mr-md-9 mx-sm-3">
            <v-col cols="12" md="6" lg="6" sm="6">
              <v-btn outlined elevation="3" @click="cancelEduEdit">
                لغو کردن
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" lg="6" sm="6">
              <v-btn outlined elevation="3">
                تغیر دادن
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col class="mt-3" cols="12">
      <v-row>
        <v-col cols="6" md="6" lg="6" sm="12">
          <v-row>
            <v-col>
              <v-card-title><span>حساب کاربری</span></v-card-title>
            </v-col>
            <v-col>
              <v-btn icon elevation="3" @click="enableAccountEdit" class="mt-3">
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row class="mt-3 mb-3 mx-sm-3">
            <v-col cols="12" md="12 " lg="8" sm="12">
              <v-text-field
                label="یوزر نیم"
                :readonly="enableAcountInfo"
                v-model="user_login_info.accountInfo.username"
              />
            </v-col>
            <v-col cols="12" md="12" lg="8" sm="12">
              <v-text-field
                label="پسورد"
                :readonly="enableAcountInfo"
                v-model="user_login_info.accountInfo.password"
              />
            </v-col>
          </v-row>
          <v-row v-if="!enableAcountInfo" class="mb-3 mx-sm-3 mx-1">
            <v-col>
              <v-btn outlined elevation="3" @click="cancelAccountEdit">
                لغو کردن
              </v-btn>
            </v-col>
            <v-col>
              <v-btn outlined elevation="3">
                تغیر دادن
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" md="6" lg="6" sm="12"> </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      enableParsonelInfo: true,
      enableEducationInfo: true,
      enableAcountInfo: true,
      user_login_info: []
    };
  },
  created() {
    this.initializeUserInfo();
  },
  methods: {
    enableParsonelEidt() {
      this.enableParsonelInfo = false;
    },
    cancelParsonalEdit() {
      this.enableParsonelInfo = true;
    },
    enableEduEdit() {
      this.enableEducationInfo = false;
    },
    cancelEduEdit() {
      this.enableEducationInfo = true;
    },
    enableAccountEdit() {
      this.enableAcountInfo = false;
    },
    cancelAccountEdit() {
      this.enableAcountInfo = true;
    },
    initializeUserInfo() {
      this.user_login_info = this.$store.state.userInfo.user_info;
    }
  }
};
</script>

<style lang="scss" scoped></style>

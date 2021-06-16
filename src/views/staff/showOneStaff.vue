<template>
  <v-card>
    <v-card-title>
      <v-col> </v-col>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" lg="6" xl="6" sm="12">
          <v-row>
            <v-col cols="12" class="text-center">
              <v-avatar size="100" color="blue">
                <!-- <v-img
             v-if="employe.photo"
             :src="employe.photo"
             >

             </v-img> -->
                <strong class="white--text">
                  {{ employe.firstname }}
                </strong>
              </v-avatar>
            </v-col>
            <v-col cols="12">
              <v-divider></v-divider>
            </v-col>
            <v-col class="px-6" cols="12">
              <v-row>
                <v-col>
                  <v-text-field
                    outlined
                    label="اسم"
                    :value="employe.firstname"
                    readonly
                    rounded
                    prepend-icon="mdi-text"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    label="تخلص"
                    readonly
                    outlined
                    rounded
                    :value="employe.lastname"
                    prepend-icon="mdi-text"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="px-6" v-if="employe.fathername">
              <v-text-field
                label=""
                readonly
                rounded
                :value="employe.fathername"
                outlined
                prepend-icon="mdi-text"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" class="px-6">
              <v-text-field
                readonly
                prepend-icon="mdi-map"
                :value="employe.address"
                outlined
                rounded
                label="آدرس"
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="px-6">
              <v-text-field
                label="نمبر تماس 1"
                outlined
                :value="employe.phone1"
                prepend-icon="mdi-phone"
                readonly
                rounded
              >
              </v-text-field>
            </v-col>
            <v-col v-if="employe.phone2" cols="12" class="px-6">
              <v-text-field
                label="نمبر تماس 2"
                outlined
                :value="employe.phone2"
                prepend-icon="mdi-phone"
                readonly
                rounded
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" class="px-6">
              <v-row>
                <v-col>
                  <v-text-field
                    label="نمبر تذکره"
                    readonly
                    :value="employe.tazkira_id"
                    prepend-icon="mdi-numeric"
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <v-col class="text-left">
                  <v-btn
                    :disabled="employe.tazkira_copy"
                    outlined
                    width="200"
                    height="55"
                    link
                    :href="employe.tazkira_copy"
                  >
                    <v-icon>mdi-paperclip</v-icon>
                    <span>کاپی تذکره</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="mt-md-16" cols="12" md="6" lg="6" xl="6" sm="12">
          <v-row>
            <v-col cols="12" class="text-center">
              <strong>تحصیلات</strong>
            </v-col>
            <v-col class="mt-3" cols="12">
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12" class="px-6">
              <v-row>
                <v-col>
                  <v-text-field
                    label="درجه تحصیلی"
                    :value="employe.edu_level"
                    outlined
                    readonly
                    rounded
                    prepend-icon="mdi-school"
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="رشته تحصیلی"
                    outlined
                    readonly
                    rounded
                    prepend-icon="mdi-school"
                    :value="employe.edu_field"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="px-6" cols="12">
              <v-row>
                <v-col>
                  <v-text-field
                    label="تاریخ آغاز"
                    outlined
                    readonly
                    prepend-icon="mdi-calendar-range"
                    :value="employe.edu_start_date"
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="تاریخ ختم"
                    outlined
                    readonly
                    prepend-icon="mdi-calendar-range"
                    :value="employe.edu_end_date"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="px-6">
              <v-text-field
                label="پوهنتون"
                outlined
                readonly
                rounded
                :value="employe_university"
                prepend-icon="mdi-school-outline"
              >
              </v-text-field>
            </v-col>
            <v-col class="px-6">
              <v-row>
                <v-col class="text-right mr-7">
                  <v-btn :disabled="employe.edu_docs" width="200" height="50" outlined link :href="employe.edu_docs">
                    <v-icon>mdi-paperclip</v-icon>
                    <span>اسناد تحصیلی</span>
                  </v-btn>
                </v-col>
                <v-col class="text-left">
                  <v-btn :disabled="!employe.edu_docs" outlined width="200" height="50">
                    <span>آپلود کردن اسناد تحصیلی</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  mounted() {
    this.employe = this.$route.params.employe;
  },
  data() {
    return {
      employe: {},
    };
  },
};
</script>

<style lang="scss" scoped></style>

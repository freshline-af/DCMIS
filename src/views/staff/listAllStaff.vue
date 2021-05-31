<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="4" sm="4" md="4" xs="4">
        <BaseEdittext
          label="جستجو.."
          picon="mdi-magnify"
          placeholder="کیبورد مورد نظر خود را پیدا کنید"
          v-model="search"
        />
      </v-col>
    </v-row>
    <v-row class="mt-n3">
      <v-col cols="12" md="12" sm="12" xs="12">
        <v-data-table
          :headers="headers"
          :items="staffList"
          :items-per-page="10"
          :search="search"
          :footer-props="footer"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-btn x-small icon @click="ShowOneStaff(item)">
              <v-icon>mdi-text</v-icon>
            </v-btn>
          </template>
          <template v-slot:no-data>
            <span> هیچ کارمند فعلا ثبت نشده است </span>
          </template>
          <template v-slot:no-results>
            <span>هیچ کارمند که با این کیبورد وارد کردین موجود نمی باشد</span>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
//import staffAll from "../../../server"
export default {
 
  props: {
    staffs: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      search: "",
      staffList: this.staffs,
      employe: {},
      footer: {
        itemsPerPageText: "تعداد کارمند در هر صفحه",
      },
      headers: [
        {
          text: "آدی",
          align: "start",
          sortable: false,
          value: "_id",
        },
        {
          text: "نام",
          align: "start",
          sortable: false,
          value: "firstname",
        },
        { text: "نام پدر", value: "fathername" },
        { text: "وظیفه", value: "position" },
        { text: "شماره تذکره", value: "tazkira_id" },
        { text: "درجه تحصیل", value: "edu_level" },
        { text: "شماره تماس", value: "phone1" },
        { text: "عملیه", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    ShowOneStaff(item) {
      this.employe = item;
      this.$router.push({name:"ShowStaff", params:{employe: this.employe}});
    },
}
};
</script>
<style lang="scss" scoped></style>
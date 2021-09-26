<template>
  <v-data-table
    :headers="headers"
    :items="patients"
    sort-by="name"
    class="elevation-1"
    :search="search"
    :footer-props="footer"
  >
    <!-- The Header of table -->
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title class="mr-3">بیماران</v-toolbar-title>
        <v-divider class="mx-4 mr-4" inset vertical></v-divider>
        <v-col cols="6" md="4" class="mt-3 mb-3">
          <v-text-field
            outlined
            rounded
            append-icon="mdi-magnify"
            label="جستجو.."
            v-model="search"
            placeholder="کیبورد جستجو خود را وارد کنید"
            class="mt-8"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <!-- dialog for registar patient -->
            <v-btn
              color="primary"
              dark
              class="mb-2"
              rounded
              elevation="2"
              outlined
              @click="goRegistarPatient"
            >
              ثبت کردن بیمار جدید
            </v-btn>
        <!-- delete dialog -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >آیا می خواهد این بیمار را از سیستم حذف کنید؟</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >انصراف</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >بله</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <!-- the CURD button -->

    <template v-slot:item.actions="{ item }">
      <v-btn icon class="mr-2" @click="showitem(item)">
        <v-icon>mdi-text</v-icon>
      </v-btn>
      <v-btn icon class="mr-2" @click="editItem(item)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn @click="deleteItem(item)" icon>
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </template>
    <!-- if there is no data in the tabel -->
    <template v-slot:no-data>
      <span> هیچ بیماری فعلا ثبت نشده است </span>
    </template>
    <!-- if there is no data found by searching -->
    <template v-slot:no-results>
      <span>هیچ بیماری به این کیبورد که وارد کردین وجود ندارد</span>
    </template>
  </v-data-table>
</template>

<script>
import Store from "../../store/index";

export default {
  data: () => ({
    dialog: false,
    showDialog: false,
    dialogDelete: false,
    search: "",
    patients: [],
    footer: {
      itemsPerPageText: "تعداد مریض در هر صفحه",
    },
    headers: [
      {
        text: "آی دی",
        align: "start",
        sortable: false,
        value: "_id",
      },
      { text: "اسم", value: "firstname" },
      { text: "اسم پدر", value: "fathername" },
      { text: "شماره تماس", value: "phone" },
      { text: "نوعیت بیماری", value: "disease" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    patients_list: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      lName: 0,
      fName: 0,
      phone: 0,
      age: 0,
      address: "",
      occupation: "",
      bloodGroup: "",
      photoUrl: "",
    },
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
 
  async beforeRouteEnter(routeTo, routeFrom, next) {
    await Store.dispatch("patient/getListOfPatient");
    next();
  },

  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.patients = this.$store.state.patient.patients;
    },

    editItem(item) {
      this.editedIndex = this.patients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$router.push({name: "editPatient", params:{patients: this.editedItem}});
    },
    //  mthod for open the dialog to show the patient deatials
    showitem(item) {
      this.editedIndex = this.patients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.$router.push({name:"PatienDetails",params:{editedItem:this.editedItem}})
    },
    // method for close the dialog of show patient deatils
    closeShowDialog() {
      this.editedIndex ="";
      this.editedItem = "";
      this.showDialog = false;
    },
    deleteItem(item) {
      this.editedIndex = this.patients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      Store.dispatch("patient/deletePatient", this.editedItem._id);
      this.patients.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    
    getDate(date){
      let date_time = new Date(date);
      var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return months[date_time.getMonth("MM")]  + " " +  date_time.getDate()  + " "+ date_time.getFullYear()    ;
    },
    goRegistarPatient(){
      this.$router.push({name: "PatientRegistar"});
    }
  },
};
</script>

<style lang="scss" scoped></style>

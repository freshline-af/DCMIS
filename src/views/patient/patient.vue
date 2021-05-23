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
        <v-dialog fullscreen v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              rounded
              outlined
              v-bind="attrs"
              v-on="on"
            >
              ثبت کردن بیمار جدید
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
              <span class="headline mr-3">{{ formTitle }}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="mt-3">
              <Register :patients="editedItem"></Register>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- dialog for show patient deatials -->
        <v-dialog v-model="showDialog" max-width="500px" fullscreen>
          <v-app>
            <v-app-bar app flat>
              <strong class="pr-3">نشان دادن مشخصات</strong>
              <v-spacer></v-spacer>
              <v-btn class="pr-3" @click="closeShowDialog" icon
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </v-app-bar>
            <v-main>
              <v-container>
                <v-row>
                  <v-col class="mr-n10" cols="12" md="4" lg="4" xl="4" sm="6">
                    <v-card>
                      <v-card-title align="center">
                        <v-avatar size="80" class="mr-1" color="blue">
                          <v-img v-if="editedItem.image!=null"> </v-img>
                          <span class="white--text" v-else>{{showname(editedItem.firstname)}}</span>
                        </v-avatar>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text class="mt-2">
                        <v-row>
                          <v-col class="mt-n2">
                            <v-text-field  readonly v-model="editedItem.firstname" label="اسم"></v-text-field>
                          </v-col>
                           <v-col class="mt-n2">
                            <v-text-field readonly v-model="editedItem.lastname" label="تخلص"></v-text-field>
                          </v-col>

                        </v-row>
                        <v-row>
                          <v-col class="mt-n2">
                            <v-text-field readonly v-model="editedItem.fathername" label="اسم پدر"></v-text-field>
                          </v-col>
                          <v-col class="mt-n2">
                            <v-text-field readonly v-model="editedItem.marital_status" label="حالت مدنی"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="mt-n2">
                            <v-text-field readonly v-model="editedItem.tazkira_id" label="شماره تذکره"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="mt-n2">
                            <v-text-field readonly v-model="editedItem.address" label="آدرس"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="mt-n2">
                            <v-text-field readonly v-model="editedItem.phone" label="شماره تماس"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="mt-n2">
                            <v-text-field readonly v-model="editedItem.blood_group" label="گروپ خون"></v-text-field>
                          </v-col>
                          <v-col class="mt-n2">
                            <v-text-field readonly v-model="editedItem.age" label="سن"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="mt-n2">
                            <v-text-field readonly v-model="editedItem.occupation" label="شغل"></v-text-field>
                          </v-col>
                          <v-col class="mt-n2">
                            <v-text-field readonly v-model="editedItem.sex" label="جنسیت"></v-text-field>
                          </v-col>
                        </v-row>
                        
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <v-col cols="12" md="8" lg="8" xl="8" sm="8">
                    <v-card>
                      <v-card-title>
                        <h2>content card title</h2>
                      </v-card-title>
                      <v-card-text>
                        <v-row>
                          <h2>row content</h2>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-main>
          </v-app>
        </v-dialog>
        <!-- delete dialog -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >آیا می خواهد این بیمار را از سیتم حذف کنید؟</v-card-title
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
import Register from "./registarPatient";
import Store from "../../store/index";
export default {
  components: {
    Register,
  },
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
      { text: "اسم", value: "fitstname" },
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

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "ثبت بیمار جدید" : "Edit Item";
    },
  },

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
      this.dialog = true;
    },
    //  mthod for open the dialog to show the patient deatials
    showitem(item) {
      this.editedIndex = this.patients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.showDialog = true;
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
      this.patients.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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
    showname(firstname){
           let name = ""+firstname+"".split('');
           return name[0] + name[1]
           //console.log(name.split(''))
    }
  },
};
</script>

<style lang="scss" scoped></style>

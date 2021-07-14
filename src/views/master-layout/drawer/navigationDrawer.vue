<template>
  <div>
    <v-navigation-drawer app temporary right v-model="nav">
      <v-list>
        <v-list-item
          link
          ripple
          v-for="item in items"
          :key="item.id"
          :to="item.link"
          @click="item.fun"
        >
          <v-list-item-content>
            <v-list-item-title>
              <v-list-item-icon
                ><v-icon>{{ item.icon }}</v-icon></v-list-item-icon
              >
              {{ item.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data() {
    return {
      nav:this.drawer,
      items: [
        { id: "1", name: "داشبورد", icon: "mdi-home", link: "/dashboard" ,fun:this.goHome},
        { id: "2", name: "خدمات", icon: "mdi-medical-bag", link: "/service", fun:this.goService },
        {
          id: "8",
          name: "بیماران",
          icon: "mdi-doctor",
          link: "/patient",
          fun: this.goPatient
        },
        { id: "3", name: "کارمندان", icon: "mdi-account-tie", link: "/staff", fun:this.goStaff },
        {
          id: "4",
          name: "پروفایل",
          icon: "mdi-account-cog-outline",
          link: "/account_managment",
          fun: this.goProfile
        },
        {
          id: "5",
          name: "مدیریت مالی",
          icon: "mdi-finance",
          link: "/finace_manag",
          fun:this.goFinance
        },
        { id: "6", name: "تنظیمات", icon: "mdi-cog", link: "/sitting" ,fun:this.goSitting},
        { id: "7", name: "خروج", icon: "mdi-logout", fun:this.logout}
      ]
    };
  },
   watch: {
      drawer() {
        this.nav = true;
      }
    },
    methods:{
      logout(){
        localStorage.removeItem('user');
        window.location.reload();
      },
      goHome(){},
      goService(){},
      goPatient(){},
      goStaff(){},
      goProfile(){},
      goFinance(){},
      goSitting(){}
    }
};
</script>

<style lang="scss" scoped></style>

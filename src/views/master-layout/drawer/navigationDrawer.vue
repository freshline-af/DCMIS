<template>
  <div>
    <v-navigation-drawer app temporary right v-model="drawer">
      <v-list>
        <v-list-item
          link
          ripple
          v-for="item in items"
          :key="item.id"
          :to="item.link"
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
      items: [
        { id: "1", name: "داشبورد", icon: "mdi-home", link: "/" },
        { id: "2", name: "خدمات", icon: "mdi-medical-bag", link: "/service" },
        {
          id: "8",
          name: "بیماران",
          icon: "mdi-doctor",
          link: "/patient"
        },
        { id: "3", name: "کارمندان", icon: "mdi-account-tie", link: "/staff" },
        {
          id: "4",
          name: "مدیریت حساب",
          icon: "mdi-account-cog-outline",
          link: "/account_managment"
        },
        {
          id: "5",
          name: "مدیریت مالی",
          icon: "mdi-finance",
          link: "/finace_manag"
        },
        { id: "6", name: "تنظیمات", icon: "mdi-cog", link: "/sitting" },
        { id: "7", name: "خروج", icon: "mdi-logout" }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>

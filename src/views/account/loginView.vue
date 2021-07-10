<template >
     <v-img  height="560">
      <v-row class="justify-center align-center pa-sm-12   bg-login" fill-height>
    <v-form>
      <v-card class="mt-10" rounded="8" shaped elevation="7" style="background-color:transparent">
        <v-row justify="center">
          <v-col
            align="center"
            class="mt-10"
            cols="12"
            md="8"
            xl="8"
            lg="8"
            sm="12"
          >
            <h1 class="font-weight-bold pa-5">به سیستم DCMIS خوش آمدید</h1>
          </v-col>

          <v-col align="center" class="mt-2" cols="12" md="12" sm="12" xs="12">
            <v-row justify="center">
              <v-col cols="12" md="6" sm="12" lg="4" xl="4" class="">
                <BaseEdittext
                  single-line
                  type="text"
                  icon="mdi-email"
                  v-model="user.username"
                  label="یوزرنیم"
                  placeholder="لطفاً یوزر نیم و یا ایمل خود را وارد کنید"
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col class="mt-n2" cols="12" md="12" sm="12" xs="12">
            <v-row justify="center">
              <v-col cols="12" xl="6" lg="4" md="4" sm="12">
                <BaseEdittext
                  single-line
                  label="پسورد"
                  v-model="user.password"
                  :type="show_pass ? 'password' : 'text'"
                  :icon="show_pass ? 'mdi-eye-off' : 'mdi-eye'"
                  placeholder="لطفاً  پسورد خود را وارد کنید"
                  @click:append="show_pass = !show_pass"
                />
              </v-col>
            </v-row>  
          </v-col>
          <v-col
            cols="12"
            class=" mt-n2 mb-8"
            md="4"
            sm="8"
            xs="8"
            align="center"
          >
            <v-btn rounded shaped width="200" @click="login">
              <v-icon left>mdi-login-variant</v-icon>
              وٌرود
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-row>
   </v-img>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      show_pass: true,
    };
  },
  methods: {
    login() {
      
    },
  },
};
</script>

<style  scoped>
</style>

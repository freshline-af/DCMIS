<template>
  <v-container>
    <v-row>
      <v-col align-center justify-center>
        <v-sheet elevation-1 height="100" rounded="" class="text-center">
          <h1 class="pt-4">وٌرد به سیستم</h1>
        </v-sheet>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-card elevation-1>
      <v-form>
        <v-row class="justify-center">
          <v-col class="mt-2" cols="12" md="6" sm="12" xs="12">
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
        <v-row class="justify-center">
          <v-col class="mt-n2" cols="12" md="6" sm="12" xs="12">
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
        <v-row class="justify-center mb-3">
          <v-col
            cols="12"
            class="justify-center mt-n2 mb-8"
            md="4"
            sm="8"
            xs="8"
          >
            <v-btn rounded shaped width="200" @click="login">
              <v-icon left>mdi-login-variant</v-icon>
              وٌرد
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      show_pass: true
    };
  },
  methods: {
    login() {
      alert(this.user);
    }
  }
};
</script>

<style lang="scss" scoped></style>

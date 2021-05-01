<template>
    <v-container>
        <v-row justify="center" align="center" class="mt-16  text-center">
        <v-col  cols="12" md="12" lg="12" sm="12" xl="12">
         <h1>OOPS</h1>
        <h3>{{resource}} که شما دنبالش هستین در این جا موجود نمی باشد </h3>
        <router-link  :to="{name: 'Home' }" > برگشت به صفحه داشبورد</router-link>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>
    export default {
        props: {
    resource: {
      type: String,
      requried: true
    }
  }
    }
</script>

<style lang="scss" scoped>

</style>
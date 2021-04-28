<template>
  <v-sheet
    v-ripple="{ center: true }"
    rounded="xl"
    width="250"
    height="150"
    elevation="2"
    shaped
    v-on="$listeners"
  >
    <v-row class="text-center" align-center justify-center>
      <v-col class="mt-7" align-center justify-center>
        <slot name="Content"> </slot>
        <slot name="icon"></slot>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
 
};
</script>

<style lang="scss" scoped></style>

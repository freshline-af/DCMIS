<template>
  <v-dialog
    v-model="Mydialog"
    fullscreen
    @input="$emit('update:dialog', Mydialog)"
  >
    <v-card>
      <v-card-title>
        <slot name="close"></slot>
      </v-card-title>
      <v-card-text>
        <h3>{{ employInfo.name }}</h3>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      Mydialog: this.dialog
    };
  },
  props: {
    dialog: {
      type: Boolean
    },
    employInfo: {
      type: Object
    }
  },
  watch: {
    dialog(val) {
      this.Mydialog = val;
    }
  }
};
</script>

<style lang="scss" scoped></style>

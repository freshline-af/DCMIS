<template>
    <v-row align-content="center" class="mr-sm-4 mt-sm-3 mb-sm-3">
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.one)">
          <h2 slot="Content">{{ services.services.one.name }}</h2>
          <v-icon slot="icon">{{ services.services.one.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.two)">
          <h2 slot="Content">{{ services.services.two.name }}</h2>
          <v-icon slot="icon">{{ services.services.two.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.three)">
          <h2 slot="Content">{{ services.services.three.name }}</h2>
          <v-icon slot="icon">{{ services.services.three.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.four)">
          <h2 slot="Content">{{ services.services.four.name }}</h2>
          <v-icon slot="icon">{{ services.services.four.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.five)">
          <h2 slot="Content">{{ services.services.five.name }}</h2>
          <v-icon slot="icon">{{ services.services.five.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.six)">
          <h2 slot="Content">{{ services.services.six.name }}</h2>
          <v-icon slot="icon">{{ services.services.six.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.seven)">
          <h2 slot="Content">{{ services.services.seven.name }}</h2>
          <v-icon slot="icon">{{ services.services.seven.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.eight)">
          <h2 slot="Content">{{ services.services.eight.name }}</h2>
          <v-icon slot="icon">{{ services.services.eight.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.nine)">
          <h2 slot="Content">{{ services.services.nine.name }}</h2>
          <v-icon slot="icon">{{ services.services.nine.icon }}</v-icon>
        </BaseCard>
      </v-col>
      <v-col class="mt-3">
        <BaseCard class="mt-3" @click="selectService(services.services.ten)">
          <h2 slot="Content">{{ services.services.ten.name }}</h2>
          <v-icon slot="icon">{{ services.services.ten.icon }}</v-icon>
        </BaseCard>
      </v-col>
    </v-row>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      result:"بلی",
      selectedService: {},
      selectPatient: [],
      selectPatientName: null,
    };
  },

  computed: {
    ...mapState(["services"]),
  },
  methods: {
    selectService(data) {
      this.selectedService = data;
      this.dialog = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <v-row>
    <!-- Daily food report -->
    <v-col cols="12">
        <strong>راپور مواد خوراکی </strong>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="foodheader"
            :items="foodItems"
            class="elevation-1"
          >
          </v-data-table>
        </v-col>
      </v-row>
    </v-col>
    <!-- Midison Daily Report -->
    <v-col cols="12" class="mt-5">
        <strong>راپور داروها</strong>
      <v-row>
        <v-col cols="12">
          <v-data-table></v-data-table>
        </v-col>
      </v-row>
    </v-col>
    <!-- Equepment Daily Report -->
    <v-col cols="12" class="mt-5">
        <strong>راپور تجهیزات</strong>
      <v-row>
        <v-col cols="12">
          <v-data-table></v-data-table>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      foodheader: [
        {
          text: "اسم",
          align: "start",
          sortable: true,
          value: "name",
        },
        {
          text: "توضیحات",
          align: "start",
          sortable: true,
          value: "Description",
        },
        {
          text: "تعداد",
          align: "start",
          sortable: true,
          value: "total_number",
        },
        {
          text: "قیمت فی واحد",
          align: "start",
          sortable: true,
          value: "unitPer_price",
        },
        {
          text: "قیمت مجموعی",
          align: "start",
          sortable: true,
          value: "total_price",
        },
      ],
      foodItems: [],
    };
  },
};
</script>

<style lang="scss" scoped></style>

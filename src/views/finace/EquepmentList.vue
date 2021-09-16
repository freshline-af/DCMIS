<template>
    <v-row class="mt-7">
        <v-col cols="12" md="4" lg="4" xl="4" sm="12">
            <v-text-field
            outlined
            rounded
            label="جستجو کردن"
            v-model="search"
            prepend-icon="mdi-magnify"
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="12" xl="12">
            <v-data-table
            :headers="equepment_header"
            :items="equepment_list"
            :search="search"
            class="evelvation-3"
            >

            </v-data-table>
        </v-col>
    </v-row>
</template>

<script>
import Store from "../../store/index"
    export default {
        mounted(){
            let numOfDays = 20;
        Store.dispatch("finances/get_report_numberOf_days",numOfDays)
        },
        data() {
            return {
                search:"",
                equepment_list:[],
                equepment_header:[
                    {
                        text:"نام",
                        value:"name",
                        sortable: true,
                        align: "start"
                    },
                     {
                        text:"قیمت خرید",
                        value:"price",
                        sortable: true,
                        align: "start"
                    },
                     {
                        text:"تعداد",
                        value:"numbers",
                        sortable: true,
                        align: "start"
                    },
                     {
                        text:"قیمت مجموعی",
                        value:"total_price",
                        sortable: true,
                        align: "start"
                    },
                     {
                        text:"تاریخ خرید",
                        value:"buy_date",
                        sortable: true,
                        align: "start"
                    },
                     {
                        text:"شخص خرید کننده",
                        value:"bouthby",
                        sortable: true,
                        align: "start"
                    }
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
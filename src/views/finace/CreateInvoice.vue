<template>
   <v-row>
       <v-col cols="12" md="12" lg="12" sm="12" >
       <v-card class="elevation-3">
           <v-card-title>
               <v-col align="center">
                   <strong class="mt-4">ایجاد کردن بل جدید</strong>
               </v-col>
           </v-card-title>
           <v-row justify="center">
               <v-col cols="12" md="8">
                   <v-divider></v-divider>
               </v-col>
           </v-row>
           <v-card-text>
                <v-form v-model="invoce_form" ref="NewInvoce_form" lazy-validation @submit.prevent="submitInvoceFrom">
               <v-row justify="center" class="mt-4">
                       <v-col>
                           <v-row  justify="center">
                           <v-col cols="12" md="6" sm="12" lg="6" xl="6">
                           <v-select
                           outlined
                           rounded
                           :items="InvoceType"
                           prepend-icon="mdi-format-list-checkbox"
                           v-model="Invoces.type"
                           label="انتخاب کردن نوعیت ارقام خریداری شده"
                           ></v-select>
                           </v-col>
                       </v-row>
                       </v-col>
                       <v-col cols="12" class="mt-n4">
                     <v-row  justify="center" >
                           <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                            <v-text-field
                            rounded
                            outlined
                            label="اسم نوعیت ارقام که خریداری کرده اید وارد کنید"
                            placeholder="اسم نوعیت جنس که خریداری کرده اید وارد کنید"
                            :rules="rules.rules.required_text"
                            prepend-icon="mdi-rename-box"
                            v-model="Invoces.name"
                            hint="وارد کردن این فیلد الزامی می باشد"
                            type="text"
                            />
                           </v-col>
                       </v-row>
                       </v-col>
                       <v-col cols="12" class="mt-n4">
                           <v-row justify="center">
                               <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                               <v-text-field
                               rounded
                               outlined
                               label="تعداد ارقام خریداری شده را وارد کنید"
                               :rules="rules.rules.required_number"
                               hint="وارد کردن این فیلد الزامی می باشد"
                               prepend-icon="mdi-counter"
                               v-model="Invoces.total_number"
                               type="number"
                               />
                               </v-col>
                           </v-row>
                       </v-col>
                       <v-col cols="12" class="mt-n4">
                           <v-row justify="center">
                               <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                               <v-text-field
                               rounded
                               outlined
                               label="قیمت فی واحد ارقام "
                               type="number"
                               placeholder="قیمت فی واحد رقم خریداری شده را وارد کنید"
                               :rules="rules.rules.required_number"
                               v-model="Invoces.perunit_price"
                               hint="وارد کردن این فیلد الزامی می باشد"
                               prepend-icon="mdi-cash"
                               />
                               </v-col>
                           </v-row>
                       </v-col>
                       <v-col cols="12" class="mt-n4">
                           <v-row justify="center">
                               <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                               <v-text-field
                               rounded
                               outlined
                               label="مجموعه پول پرداخته شده"
                               type="number"
                               prepend-icon="mdi-cash-multiple"
                               placeholder="مجموعه پول که برای خریداری کردن ارقام ذکر شده مصرف شده است وارد کنید"
                               :rules="rules.rules.required_number"
                               v-model="Invoces.total_price"
                               hint="وارد کردن این فیلد الزامی می باشد"
                               />
                               </v-col>
                           </v-row>
                       </v-col>
                       <v-col cols="12" class="mt-n4">
                           <v-row justify="center">
                               <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                               <v-textarea
                               rounded
                               outlined
                               no-resize
                               label="توضیحات"
                               type="text"
                               prepend-icon="mdi-text"
                               placeholder="لطفا در باره خریداری تان توضیحات ارایه کنید"
                               :rules="rules.rules.text"
                               v-model="Invoces.description"
                               hint="وارد کردن این فیلد اختیاری می باشد"
                               />
                               </v-col>
                           </v-row>
                       </v-col>
                       <v-col cols="12" class="mt-n4">
                           <v-row justify="center">
                               <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                               <v-file-input
                               outlined
                               rounded
                               label="اسکن از بل خریداری شده"
                               :rules="rules.rules.file"
                               show-size
                               v-model="Invoces.scan_file"
                               counter
                               chips
                               />
                               </v-col>
                           </v-row>
                       </v-col>
                       <v-col cols="12">
                           <v-row justify="center">
                               <v-col justify="center" align="center" cols="12" md="12" lg="12" xl="12" sm="12">
                                <v-btn :disabled="!invoce_form" type="submit" width="500" class="mr-6">
                                    <span>ثبت کردن فورم</span>
                                </v-btn>
                               </v-col>
                           </v-row>
                       </v-col>
               </v-row>
               </v-form>
           </v-card-text>
       </v-card>
       </v-col>
   </v-row>
</template>

<script>
import rules from "../../validation/validationRules"
import Store from "../../store/index";
    export default {
        data() {
            return {
                InvoceType: [
                    "مواد غذایی",
                    "تجهیزات جدید",
                    "داروهای جدید",

                ],
                Invoces:{},
                rules: rules,
                invoce_form: null
            }
        },
        methods:{
            submitInvoceFrom(){
            if(this.$refs.NewInvoce_form.validate()){
               Store.dispatch("finances/add_daily_report",this.Invoces,{root:true});
               window.scrollTo(0,0);
                //this.$refs.NewInvoce_form.reset();
            }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
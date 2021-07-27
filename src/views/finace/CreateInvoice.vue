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
                           v-model="Invocies.category"
                           item-text="text"
                           item-value="value"
                           label=".انتخاب کردن نوعیت ارقام خریداری شده"
                           ></v-select>
                           </v-col>
                       </v-row>
                       </v-col>
                       <v-col cols="12" class="mt-n2 mr-md-16 pr-8 mb-2">
                        <v-dialog width="1000"  transition="dialog-bottom-transition">
                        <template v-slot:activator="{on, attrs}">
                         <v-row justify="center" class="mt-n6">
                          <v-col class="pr-md-16 mr-md-16 mr-sm-4" align="right" cols="12" md="8" lg="8" sm="12">
                        <v-btn 
                         color="primary"
                         elevation="2"
                         outlined
                         rounded
                         v-on="on"
                         v-bind="attrs"
                         class="ml-3"
                         icon
                         >
                         <v-icon>mdi-plus</v-icon>
                         </v-btn>
                        
                          
                           <v-btn  v-for="item in number_item" :key="item.index" color="warning" elevation="2" rounded icon small>
                            {{item}}
                           </v-btn>
                          </v-col>
                         </v-row>
                        </template>
                        <template v-slot:default="dialog">
                        <v-card width="1000">
                         <v-toolbar class="font-weight-bold">
                             اضافه کردن اقلام
                             <v-spacer></v-spacer>
                             <v-btn @click="dialog.value=false" icon large elevation="2" color="warning" class="ml-1">
                                 <v-icon>mdi-close</v-icon>
                             </v-btn>
                             </v-toolbar>
                         <v-card-text>
                             <v-form v-model="item_form" ref="form_item" @submit.prevent="AddItem">
                             <v-row justify="center" class="mt-8">
                    <v-col cols="12">
                     <v-row  justify="center" >
                           <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                            <v-text-field
                            rounded
                            outlined
                            label=".اسم نوعیت ارقام که خریداری کرده اید وارد کنید"
                            placeholder=".اسم نوعیت جنس که خریداری کرده اید وارد کنید"
                            :rules="rules.rules.required_text"
                            prepend-icon="mdi-rename-box"
                            v-model="item.name"
                            hint=".وارد کردن این فیلد الزامی می باشد"
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
                               label=".تعداد ارقام خریداری شده را وارد کنید"
                               :rules="rules.rules.required_number"
                               hint=".وارد کردن این فیلد الزامی می باشد"
                               prepend-icon="mdi-counter"
                               v-model="item.number"
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
                               placeholder=".قیمت فی واحد رقم خریداری شده را وارد کنید"
                               :rules="rules.rules.required_number"
                               v-model="item.unit_price"
                               hint=".وارد کردن این فیلد الزامی می باشد"
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
                               label=".مجموعه پول پرداخته شده"
                               type="number"
                               prepend-icon="mdi-cash-multiple"
                               placeholder=".مجموعه پول که برای خریداری کردن ارقام ذکر شده مصرف شده است وارد کنید"
                               :rules="rules.rules.required_number"
                               value="item.number * item.unit_price"
                               v-model="item.total"
                               hint=".وارد کردن این فیلد الزامی می باشد"
                               />
                               </v-col>
                           </v-row>
                       </v-col>
                       <v-col cols="12">
                           <v-row>
                               <v-col cols="6" md="6" sm="6">
                                  <v-btn color="warning" outlined  @click="dialog.value= false">
                                       لغو کردن
                                  </v-btn>
                               </v-col>
                               <v-col align="left" cols="6" md="6" sm="6">
                                   <v-btn  type="submit" color="primary" outlined >
                                     ثبت کردن
                                   </v-btn>
                               </v-col>
                           </v-row>
                       </v-col>
                        </v-row>
                             </v-form>
                         </v-card-text>
                        </v-card>
                        </template>
                        </v-dialog>
                       </v-col>
                     <v-col cols="12" class="mt-n2">
                           <v-row justify="center">
                               <v-col cols="12" md="6" lg="6" xl="6" sm="12">
                               <v-file-input
                               outlined
                               rounded
                               label="اسکن از بل خریداری شده"
                               :rules="rules.rules.file"
                               show-size
                               v-model="file_image"
                               counter
                               chips
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
                               placeholder=".لطفا در باره خریداری تان توضیحات ارایه کنید"
                               :rules="rules.rules.text"
                               v-model="Invocies.description"
                               hint=".وارد کردن این فیلد اختیاری می باشد"
                               />
                               </v-col>
                           </v-row>
                       </v-col>
                       
                       <v-col cols="12">
                           <v-row justify="center">
                               <v-col justify="center" align="center" cols="12" md="12" lg="12" xl="12" sm="12">
                                <v-btn :disabled="!invoce_form" elevation="4" type="submit" width="500" color="primary" outlined class="mr-6">
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
                rules: rules,
                file_image:null,
                add_item_dialog: null,
                invoce_form: null,
                item_number:0,
                item_form: null,
                item:{},
                number_item:[],
                InvoceType: [
                    {text:"مواد غذایی",value:"food"},
                    {text:"تجهیزات جدید",value:"equipment"},
                   { text:"داروهای جدید",value:"medicines"},

                ],
                Invocies:{
                    "purchased_by": "60b9b5ef3b6ae20404ccf6c6",
                    "item":[],
                     },
                
                
            }
        },
        methods:{
            submitInvoceFrom(){
            if(this.$refs.NewInvoce_form.validate()){
                this.Invocies.invoice = JSON.stringify(this.file_image),
               Store.dispatch("finances/add_daily_report",this.Invocies,{root:true});
               window.scrollTo(0,0);
                this.$refs.NewInvoce_form.reset();
               this.file_image = null;
               this.item_number=0;
               this.number_item = [];
            }
            },
            AddItem(){
                if(this.$refs.form_item.validate())
                {
                this.Invocies.item.push({
                    "name":this.item.name,
                    "number":this.item.number,
                    "unit_price": this.item.unit_price,
                    "total": this.item.total
                });
                this.item_number +=1;
                this.number_item.push(this.item_number)
                this.$refs.form_item.reset();

                }
            },
           
        }
    }
</script>

<style lang="scss" scoped>

</style>
export const namespaced = true;
export const state = {
  services: {
    one: { name: "معاینه دهن", stag:10, icon: "mdi-tooth-outline" },
    two: { name: "کشیدن دندان", stag:4, icon: "mdi-tooth-outline" },
    three: { name: "پوش کردن دندان", stag:2, icon: "mdi-tooth-outline" },
    four: { name: "پر کردن دندان", stag:1, icon: "mdi-tooth-outline" },
    five: { name: "ارتودانسی", stag:3, icon: "mdi-tooth-outline" },
    six: { name: "جراحی لثه دندان", stag:5, icon: "mdi-tooth-outline" },
    seven: { name: "جراحی ریشه دندان",stag:6, icon: "mdi-tooth-outline" },
    eight: { name: "سفید کردن دندان", stag:8, icon: "mdi-tooth-outline" },
    ten: { name: "پروتیز دندان", stag:7, icon:"mdi-tooth-outline" },
    nine: { name: "جرم گیری دندان", stag:9, icon: "mdi-tooth-outline" },
    
  },
  services_form_item: {
    page_title: "ثبت کردن مریض",
    name: "اسم",
    lastName: "تخلص",
    fName: "اسم پدر",
    tazkrahNum: "شماره تذکره",
    age: "سن",
    bloodGroup: "گروپ خون",
    phone: "شماره تماس",
    address: "آدرس",
    occupation: "شغل",
    photo: "عکس"
  },
  caseHistory:{
    heart: "آیا مرض قلبی دارد ؟",
    dieabet:"آیا قند خون دارد؟",
    blood:"آیا  فشار خون بلند دارد؟"

  },
  finace: {
    total_amount: "مبلغ قابل برداخت",
    received: "مبلغ برداخت شده",
    receiveable_amount: "مبلغ باقی مانده"
  }
};

export const mutations = {};

export const actions = {};

export const getters = {};

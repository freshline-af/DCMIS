export default {
  rules: {
    phone: [
      v => /^[0-9]*$/.test(v) || ".شماره وارد شده باید عدد باشد",
      v => (v || " ").length == 10 || ".شماره وارد شده باید ده رقم باشد"
    ],
    required_phone: [
      v => !!v || ".وارد کردن شماره تماس الزامی می باشد ",
      v => /^[0-9]*$/.test(v) || ".شماره تماس وارد شده باید اعداد باشد",
      v => (v || " ").length == 10 || ".شماره تماس بایدعدد ده رقمی باشد"
    ],
    text: [
      v => /^[a-zA-Zا-ی 0-9,آ.?@? ]*$/.test(v) || ".متن وارد شده  باید حروف الفبا باشد"
    ],
    required_text: [
      v => !!v || ".وارد کردن این فیلد الزامی می باشد",
      v => /^[a-zA-Zآا-ی,،.?@ ]*$/.test(v) || ".متن وارد شده باید حروف الفبا باشد"
    ],
    file: [
      v => !v || v.size <= 2097152 || ".حجم فایل وارد شده باید کمتر از دو ام بی باشد"
    ],
    required_file: [
      v => !!v || ".وارد کردن این فایل الزامی می باشد",
      v => !v || v.size <= 2097152 || ".حجم فایل وارد شده باید کمتر از دو ام بی باشد"
    ],
    number: [v => /^[0-9]*$/.test(v) || "باید ارقام وارد شده عددی باشد."],
    tazkira_id: [
      v => /^[0-9]*$/.test(v) || "شماره تذکره باید عدد باشد.",
      v => (v || " ").length ==15 || "شماره تذکره باشد 15 رقم باشد."
    ],
    required_number: [
      v => !!v || ".وارد کردن این فیلد الزامی می باشد",
      v => /^[0-9]*$/.test(v) || ".باید ارقام وارد شده عددی باشد"
    ],
    select:[
      v => !!v || ".انتخاب کردن یکی از این گزینه ها الزامی می باشد"
    ]
  },
  auth_rules:{
    username:[
      v => !!v|| ".وارد کردن یوزرنیم الزامی می باشد",
      v => /^[a-zA-Z@.]*$/.test(v) || "لطفایوزرنیم درست را وارد کیند. یوزرنیم باید شامل@ و حروف از a-z .باشد",
  ],
  password:[
    v => !!v || ".وارد کردن پسورد الزامی می باشد.",
    v => /^[a-zA-Z0-9#@$%-_]*$/.test(v) || ".لطفا پسورد قابل اعتبار را وارد کنید.",
    v=> (v || " ").length >6 && (v || " ").length<20 || ".پسورد باید بزرگتر از 6 و کوچکتر از 20 رقم باشد."
  ]
  }
};

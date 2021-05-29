export default {
  rules: {
    phone: [
      v => /^[0-9]*$/.test(v) || "شماره وارد شده باید عدد باشد",
      v => (v || " ").length == 10 || "شماره وارد شده باید ده رقم باشد"
    ],
    required_phone: [
      v => !!v || "وارد کردن شماره تماس الزامی می باشد ",
      v => /^[0-9]*$/.test(v) || "شماره وارد شده باید عدد باشد",
      v => (v || " ").length == 10 || "شماره تماس باشد ده رقم باشد"
    ],
    text: [
      v => /^[a-zA-Zا-ی آ.?@? ]*$/.test(v) || "متن وارد شده  باید حروف الفبا باشد"
    ],
    required_text: [
      v => !!v || "وارد کردن این فیلد الزامی می باشد",
      v => /^[a-zA-Zآا-ی.?@ ]*$/.test(v) || "متن وارد شده باید حروف الفبا باشد"
    ],
    file: [
      v => !v || v.size <= 2097152 || "حجم فایل وارد شده باید کمتر از دو ام بی باشد"
    ],
    required_file: [
      v => !!v || "وارد کردن این فایل الزامی می باشد",
      v => !v || v.size <= 2097152 || "حجم فایل وارد شده باید کمتر از دو ام بی باشد"
    ],
    number: [v => /^[0-9]*$/.test(v) || "باید ارقام وارد شده عددی باشد"],
    required_number: [
      v => !!v || " وارد کردن این فیلد الزامی می باشد",
      v => /^[0-9]*$/.test(v) || "باید ارقام وارد شده عددی باشد"
    ],
    select:[
      v => !!v || "انتخاب کردن یکی از این گزینه ها الزامی می باشد"
    ]
  }
};

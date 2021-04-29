export default {
  rules: {
    phone: [
      v => /^[0-9]*$/.test(v) || "شماره تماس باید عدد باشد",
      v => (v || " ").length == 10 || "شماره تماس باید ده رقم باشد"
    ],
    required_phone: [
      v => !!v || "شماره تماس الزامی می باشد",
      v => /^[0-9]*$/.test(v) || "شماره تماس باید عدد باشد",
      v => (v || " ").length == 10 || "شماره تماس باشد ده رقم باشد"
    ],
    text: [
      v => /^[a-zA-Zا-ی آ.?@ ]*$/.test(v) || "متن را باید حروف الفبا باشد"
    ],
    required_text: [
      v => !!v || "وارد کردن این متن الزامی می باشد",
      v => /^[a-zA-Zآا-ی.?@ ]*$/.test(v) || "متن باید حروف الفبا باشد"
    ],
    file: [
      v => !v || v.size <= 2097152 || "حجم فایل باید کمتر از دو ام بی باشد"
    ],
    required_file: [
      v => !!v || "وارد کردن این فایل الزامی می باشد",
      v => !v || v.size <= 2097152 || "حجم فایل باید کمتر از دو ام بی باشد"
    ],
    number: [v => /^[0-9]*$/.test(v) || "باید ارقام عددی باشد"],
    required_number: [
      v => !!v || "این نمبر الزامی می باشد",
      v => /^[0-9]*$/.test(v) || "باید ارقام عددی باشد"
    ]
  }
};

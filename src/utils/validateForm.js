function isDate6(sDate) {
  if (!/^[0-9]{6}$/.test(sDate)) {
    return false;
  }
  var year, month, day;
  year = sDate.substring(0, 2);
  month = sDate.substring(2, 4);
  day = sDate.substring(4, 6);
  if (year < 1 || year > 99) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  return true;
}

function isDate8(sDate) {
  if (!/^[0-9]{8}$/.test(sDate)) {
    return false;
  }
  var year, month, day;
  year = sDate.substring(0, 4);
  month = sDate.substring(4, 6);
  day = sDate.substring(6, 8);
  var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year < 1700 || year > 2500) return false;
  if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) iaMonthDays[1] = 29;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > iaMonthDays[month - 1]) return false;
  return true;
}

//身份证号码
function isIdCardNo(num) {
  var factorArr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
  var parityBit = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
  var varArray = [];
  var lngProduct = 0;
  var intCheckDigit;
  var intStrLen = num.length;
  var idNumber = num;
  if (intStrLen !== 15 && intStrLen !== 18) {
    return false;
  }
  for (var i = 0; i < intStrLen; i++) {
    varArray[i] = idNumber.charAt(i);
    if ((varArray[i] < "0" || varArray[i] > "9") && i !== 17) {
      return false;
    } else if (i < 17) {
      varArray[i] = varArray[i] * factorArr[i];
    }
  }
  if (intStrLen === 18) {
    var date8 = idNumber.substring(6, 14);
    if (isDate8(date8) === false) {
      return false;
    }
    for (i = 0; i < 17; i++) {
      lngProduct = lngProduct + varArray[i];
    }
    intCheckDigit = parityBit[lngProduct % 11];
    if (varArray[17] !== intCheckDigit) {
      return false;
    }
  } else {
    var date6 = idNumber.substring(6, 12);
    if (isDate6(date6) === false) {
      return false;
    }
  }
  return true;
}

const validateForm = {
  // 身份证号码
  isIdCardNo: (rule, value, callback) => {
    if (!value) {
      callback();
    } else if (isIdCardNo(value)) {
      callback();
    } else {
      callback(new Error("请输入正确身份证号码"));
    }
  },
  // 电话号码
  isPhone: (rule, value, callback) => {
    let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/; //手机号前三位是固定的
    let reg2 = /^(\(\d{3,5}\)|\d{3,5}-|\s)?\d{5,14}$/;
    if (!value) {
      callback();
    } else if (reg.test(value) || reg2.test(value)) {
      callback();
    } else {
      callback(new Error("请输入正确的电话号码!"));
    }
  },
  //输入合法数字或保留两位小数
  isNumberFloat: (rule, value, callback) => {
    let reg = /(^[1-9](\d+)?(\.\d{2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
    if (!value) {
      callback();
    } else if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入合法数字或保留两位小数"));
    }
  },
  // 中文 字母 数字组合
  isChineseAlphanumeric: (rule, value, callback) => {
    let reg = /(^[\u4E00-\u9FA5A-Za-z0-9]{0,10000}$)/; //长度为 0-10000 可在页面中做长度校验
    if (!value) {
      callback();
    } else if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入中文字母数字组合"));
    }
  },
  // 字母 数字组合
  isEnglishAndNumbers: (rule, value, callback) => {
    let reg = /(^[A-Za-z0-9]+$)/;
    if (!value) {
      callback();
    } else if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入字母数字组合"));
    }
  },
  // 正整数
  isNumber: (rule, value, callback) => {
    let reg = /^[1-9]\d*$/
    if (!value) {
      callback();
    }
    else if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入正整数'));
    }
  },
  // 日期格式为 2012-12-12
  isSpecificDate: (rule, value, callback) => {
    let reg = /^\d{4}-\d{1,2}-\d{1,2}/
    if (!value) {
      callback();
    }
    else if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入格式为2012-12-12的日期'));
    }
  },

};

export { validateForm };

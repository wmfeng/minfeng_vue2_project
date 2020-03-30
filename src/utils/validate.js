export default {
  // 原系统保留
  /*大于0小于100数字*/
  validateNumber: function validateNumber(val) {
    const reg = /^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/;
    return reg.test(val)
  },
  validdateMobile: function validdateMobile(val) {
    const length = val.length;
    var mobile = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
    return length == 11 && mobile.test(val)
  },
  validPassword: function validPassword(val) {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
    return reg.test(val)
  },
  //# 字符串匹配
  //是否为 数字！整数，浮点数
  isNum: function (num) { //# 是否为数组
    return !isNaN(num);
  },
  isEmail: function (mail) {//# 是否为 邮箱
    return /^([a-z0-9]+[_\-\.]?)*[a-z0-9]+@([a-z0-9]+[_\-\.]?)*[a-z0-9]+\.[a-z]{2,5}$/i.test(mail);
  },
  isIdCard: function (card) { //# 是否为 身份证
    return /^(\d{14}|\d{17})(\d|[xX])$/.test(card);
  },
  isMobile: function (mobile) { //# 是否为 手机
    return /^0*1\d{10}$/.test(mobile);
  },
  isQQ: function (qq) { //# 是否为 QQ
    return /^[1-9]\d{4,10}$/.test(qq);
  },
  isTel: function (tel) { //# 是否为 电话
    return /^\d{3,4}-\d{7,8}(-\d{1,6})?$/.text(tel);
  },
  isUrl: function (url) { //# 是否为 URL
    return /https?:\/\/[a-z0-9\.\-]{1,255}\.[0-9a-z\-]{1,255}/i.test(url);
  },
  isColor: function (color) { //# 是否为 16进制颜色
    return /#([\da-f]{3}){1,2}$/i.test(color);
  },
  //@id ： 身份证 ，
  // @now : 当前时间 如：new Date('2013/12/12') , '2013/12/12'
  // @age ： 允许的年龄
  isAdult: function (id, allowAge, now) { //# 是否年龄是否成年
    var age = 0 // 用户 年月日
      , nowDate = 0 //当前年月日
      ;
    allowAge = parseFloat(allowAge) || 18;
    now = typeof now == 'string' ? new Date(now) : (now || new Date());


    if (!this.isIdCard(id)) {
      return false;
    }
    //15位身份证
    if (15 == id.length) {
      age = '19' + id.slice(6, 6);
    } else {
      age = id.slice(6, 14);
    }
    // 类型转换 整型
    age = ~~age;
    nowDate = ~~(Tydic.date.format('YYYYMMDD', now));
    //比较年龄
    if (nowDate - age < allowAge * 1e4) {
      return false;
    }
    return true;
  },
  //浮点数 
  isFloat: function (num, place) { //# 是否为 浮点数
    let str = "^(([1-9]\\d*)|(\\d+\\.\\d+)|0)$";
    if (place)
      str = "^(([1-9]\\d*)|(\\d+\\.\\d{0," + place + "}))$";
    let reg = new RegExp(str);
    return reg.test(num);
  },
  //正整数
  isInt: function (num) { //# 是否为 正整数
    return /^[1-9]\d*$/.test(num);
  },
  //是否全为汉字
  isChinese: function (str) { //# 是否全为 汉字
    return /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])+$/gi.test(str);
  }

}

export function validPassword2(val) {
  //必须包含字母，数字，特殊符号，并且长度最少为8,最长为50
  const reg = /^(?=.*[a-zA-Z])(?=.*[1-9])(?=.*[\W]).{8,50}$/
  return reg.test(val)
}

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
  return true
}

function isDate8(sDate) {
  if (!/^[0-9]{8}$/.test(sDate)) {
    return false;
  }
  var year, month, day;
  year = sDate.substring(0, 4);
  month = sDate.substring(4, 6);
  day = sDate.substring(6, 8);
  var iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (year < 1700 || year > 2500) return false
  if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) iaMonthDays[1] = 29;
  if (month < 1 || month > 12) return false
  if (day < 1 || day > iaMonthDays[month - 1]) return false
  return true
}

function isIdCardNo(num) {  //身份证号码
  var factorArr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
  var parityBit = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
  var varArray = [];
  var lngProduct = 0;
  var intCheckDigit;
  var intStrLen = num.length;
  var idNumber = num;
  if ((intStrLen !== 15) && (intStrLen !== 18)) {
    return false;
  }
  for (var i = 0; i < intStrLen; i++) {
    varArray[i] = idNumber.charAt(i);
    if ((varArray[i] < '0' || varArray[i] > '9') && (i !== 17)) {
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
  }
  else {
    var date6 = idNumber.substring(6, 12);
    if (isDate6(date6) === false) {
      return false;
    }
  }
  return true;
}


let validateObj = {
  passWord: (rule, value, callback) => {
    if (!value) {
      callback();
    }
    if (!validPassword2(value)) {
      callback(new Error("密码须同时包含字母,数字,符号,如(!@#$%^&*等),且长度至少8位!"));
    } else {
      callback();
    }
  },
  isPhone: (rule, value, callback) => {
    let reg = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;//手机号前三位是固定的
    let reg2 = /^(\(\d{3,5}\)|\d{3,5}-|\s)?\d{5,14}$/
    if (!value) {
      callback();
    }
    else if (reg.test(value) || reg2.test(value)) {
      callback();
    } else {
      callback(new Error('请输入正确的电话号码!'));
    }
  },
  isIdCardNo: (rule, value, callback) => {
    if (!value) {
      callback();

    }
    else if (isIdCardNo(value)) {
      callback();
    }
    else {
      callback(new Error('请输入正确身份证号码'));
    }
  },
  isNumber: (rule, value, callback) => {
    //let reg = /^([1-9]\d{0,8}|0)(\.\d{2})$/
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
  isNumber2: (rule, value, callback) => {
    //let reg = /^([1-9]\d{0,8}|0)(\.\d{2})$/
    let reg = /(^[1-9]\d*$)|(^0$)/
    if (!value) {
      callback();
    }
    else if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入正整数'));
    }
  },
  // 大于零的正整数
  isNumber3: (rule, value, callback) => {
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
  // 保留一位小数
  isNumber4: (rule, value, callback) => {
    let reg = /^(\d+|\d+\.\d{1,1})$/
    if (!value) {
      callback();
    }
    else if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('只能保留一位小数'));
    }
  }, 
  // 大于0小于100
  isNumber5: (rule, value, callback) => {
    let reg = /^100$|^(\d|[1-9]\d)(\.\d+)*$/;
    if (!value) {
      callback();
    }
    else if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入大于等于0且小于等于100的数'));
    }
  },
  // 大于0小于90
  isNumber5: (rule, value, callback) => {
    let reg = /^90$|^(\d|[1-9]\d)(\.\d+)*$/;
    if (!value) {
      callback();
    }
    else if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入大于等于0且小于等于90的正整数'));
    }
  },
  // 大于0小于等于100(不可以有小数)
  isNumber5: (rule, value, callback) => {
    let reg = /^100$|^(\d|[1-9]\d)$/;
    if (!value) {
      callback();
    }
    else if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入大于等于0且小于等于100的正整数'));
    }
  },
  isChinese: (rule, value, callback) => {
    //let reg = /^([1-9]\d{0,8}|0)(\.\d{2})$/
    let reg = /^[\u4E00-\u9FA5]/
    if (!value) {
      callback();
    }
    else if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入汉字！'));
    }
  },
  isNumberFloat: (rule, value, callback) => {
    //let reg = /^([1-9]\d{0,8}|0)(\.\d{2})$/
    let reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/
    if (!value) {
      callback();
    }
    else if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入合法数字并且保留两位小数'));
    }
  },
  isEmail: (rule, value, callback) => {
    let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    //  if(!value){
    //    callback(new Error('必填'));
    //  }
    if (!value) {
      callback();
    }
    else if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入正确邮箱格式'));
    }
  },
}

export { validateObj }

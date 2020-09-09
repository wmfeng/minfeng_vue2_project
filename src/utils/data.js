export function formatDate(date, fmt) {
  if (date === null || date === undefined) return '';
  date = new Date(date);
  fmt = fmt || "yyyy-MM-dd";
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};

// 获取年月日或时分秒 时间戳
export function getYearTimestamp(timeFormat) {
  if(timeFormat){//时间格式为 2020-05-27
    let date = new Date(timeFormat);
    date = new Date(timeFormat.replace(/-/g, '/'));
    let time1 = date.getTime();
    let time2 = date.valueOf();
    let time3 = Date.parse(date);
    return time1;
  }else{
    let strtime = new Date().getFullYear() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getDate();
    let date = new Date(strtime);
    let time1 = date.getTime();
    let time2 = date.valueOf();
    let time3 = Date.parse(date);
    return time2;
  }
}


//获取当前年月日
export function getMonthWeek(data) {

  /**
 3         * a = d = 当前日期
 4         * b = 6 - w = 当前周的还有几天过完(不算今天)
 5         * a + b 的和在除以7 就是当天是当前月份的第几周
 6         */
  let spliceData = data.split('-');
  let a = spliceData[0];
  let b = spliceData[1];
  let c = spliceData[2];
  var date = new Date(a, parseInt(b) - 1, c),
    w = date.getDay(),
    d = date.getDate();
  if (w == 0) {
    w = 7;
  }
  var config = {
    getMonth: date.getMonth() + 1,
    getYear: date.getFullYear(),
    getWeek: Math.ceil((d + 6 - w) / 7),
  }
  return config;
}




export function getYearDate() {
  let tempDate = null;
  var d = new Date; var year = d.getFullYear();
  var month = (d.getMonth() + 1) >= 10 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
  var date = d.getDate() >= 10 ? d.getDate() : "0" + d.getDate();
  return tempDate = year + "-" + month + "-" + date;
}

function getWeek(dt) {
  let d1 = new Date(dt);
  let d2 = new Date(dt);
  d2.setMonth(0);
  d2.setDate(1);
  let rq = d1 - d2;
  let days = Math.ceil(rq / (24 * 60 * 60 * 1000));
  let num = Math.ceil(days / 7) + 1;
  return num;
}
export function getYearWeek(data) {
  let yearWeek = null;
  if (data) {
    let spliceData = data.split('-');
    return yearWeek = spliceData[0] + "第" + getWeek(new Date(data)) + "周";
  } else {
    let endDate = new Date();
    //本年的第一天
    var beginDate = new Date(endDate.getFullYear(), 0, 1);
    //星期从0-6,0代表星期天，6代表星期六
    var endWeek = endDate.getDay();
    if (endWeek == 0) endWeek = 7;
    var beginWeek = beginDate.getDay();
    if (beginWeek == 0) beginWeek = 7;
    //计算两个日期的天数差
    var millisDiff = endDate.getTime() - beginDate.getTime();
    var dayDiff = Math.floor((millisDiff + (beginWeek - endWeek) * (24 * 60 * 60 * 1000)) / 86400000);
    var year = endDate.getFullYear();
    var week = Math.ceil(dayDiff / 7) + 1;
    return yearWeek = year + "第" + (week > 9 ? week : "0" + week) + "周";
  }
}



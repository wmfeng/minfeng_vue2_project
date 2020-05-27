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



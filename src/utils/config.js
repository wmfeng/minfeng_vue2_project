let dicMap = window.sessionStorage;
let obj = {};
import {
  dictionaries
} from "@/api/config";



function diction(resolve, reject, key, val) {
  return new Promise((resolve, reject) => {
    dictionaries(key).then(res => {
      let data = res.data;
      if (data.success) {
        data.data.map(i => {
          i.label = i.dictname;
          i.value = i.dictcode;
          return i
        });
        dicMap.setItem(key, JSON.stringify(data.data));
        if (val) {
          let res;
          res = data.data.filter(i => {
            return i.value == val
          });
          if (res.length) {
            res = res[0].label
          } else {
            res = val
          }
          resolve(res);
        } else {
          resolve(data.data);
        }
      } else {
        reject();
      }
    }).catch(res => {
      console.log("失败'")
    })
  })
}

export function doCreate(key) {
  return new Promise((resolve, reject) => {
    if (dicMap.getItem(key)) {
      resolve(JSON.parse(dicMap.getItem(key)));
    } else {
      diction(resolve, reject, key);
    }
  });
}

export function getDicTab(key, val) {
  return new Promise((resolve, reject) => {
    let res;
    if (val === null || val === undefined) resolve("");
    if (dicMap.getItem(key)) {
      res = JSON.parse(dicMap.getItem(key)).filter(i => {
        return i.value == val
      });
      if (res.length) {
        res = res[0].label
      } else {
        res = val
      }
      resolve(res);
    } else {
      diction(resolve, reject, key, val);
    }
  });
}

//数字金额转化为大写
export function moneyText(money) {
  let list = money.split(".");
  if (list.length > 2) {
    return ""
  }
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  let unit = ['亿', '万', '仟', '佰', '拾', ''];
  let text = getText(+list[0] + "") + "元";
  if (list.length == 2 && list[1].substring(0, 2) != "00") {
    if (list[1].charAt(0) != "0") {
      text += digit[list[1].charAt(0)] + "角"
    }
    if (list[1].charAt(1) != "0") {
      text += digit[list[1].charAt(1)] + "分"
    }
  } else {
    text += "整"
  }
  return text;

  function getText(m) {
    let str = "";
    let start = 0;
    let num = [9, 5, 4, 3, 2, 1];
    if (m.length == 1) {
      return digit[m]
    }
    num.map((n, i) => {
      if (m.length >= n) {
        let dig = m.substring(start, m.length - n + 1);
        //为0时，不加单位，避免出现类似壹佰零拾贰元的情况
        str += getText(dig) + unit[+dig ? i : 5];
        start += m.length - n + 1 - start;
      }
    })
    return str;
  }
}
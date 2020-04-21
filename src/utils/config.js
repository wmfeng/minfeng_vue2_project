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

// 行政区划过滤children为空
export function handleEmpty(data) {
  data.map(i => {
    if (i.children) {
      if (i.children.length) {
        handleEmpty(i.children)
      } else {
        delete i.children;
      }
    }
  })
  return data;
}

export function handleNextCode(code, myCode, data) {
  if (code.length == 12) {
    return;
  }
  let data2 = [];
  if (code == myCode.substring(0, 2) && code.length < myCode.length) { //省级
    data.map(d => {
      if (d.code == myCode.substring(0, 4)) {
        data2.push(d);
        console.log(data2)
        return data2;
      }
    });
  } else if (code == myCode.substring(0, 4) && code.length < myCode.length) { //市级
    data.map(d => {
      if (d.code == myCode.substring(0, 6)) {
        data2.push(d);
        return data2;
      }
    });
  } else if (code == myCode.substring(0, 6) && code.length < myCode.length) { //县级
    data.map(d => {
      if (d.code == myCode.substring(0, 9)) {
        data2.push(d);
        return data2;
      }
    });
  } else if (code == myCode.substring(0, 9) && code.length < myCode.length) { //镇级
    data.map(d => {
      if (d.code == myCode.substring(0, 12)) {
        data2.push(d);
        return data2;
      }
    });
  } //点击区划小于等于登录人区划，直接赋值
  else {
    data2 = data;
  }
  return data2;
}

//打印
export function printExcel(id) {
  // let Print = document.getElementById(id);
  // let arr = Array.prototype.slice.call(Print.getElementsByClassName('el-table__body')[0].getElementsByClassName('cell'));
  // let tab = Array.prototype.slice.call(Print.querySelectorAll('table'));
  // debugger
  // arr.map(i=>{
  //     i.setAttribute("style","width:100%!important");
  // })
  // tab.map(j=>{
  //   j.setAttribute("style","width:100%!important");
  // })
  // let newContent = Print.innerHTML;
  // let oldContent = document.body.innerHTML;
  // document.body.innerHTML = newContent;
  // window.print();
  // document.body.innerHTML = oldContent;
  // window.location.reload();
  // return false
  let printStr = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head>";
  const tabStyle = `<style>
  table{width:100%;display:table-cell!important;box-sizing:border-box;}
  .el-table__header,.el-table__body,.el-table__footer{width:100%!important;border-collapse: collapse;text-align:center;}
  table,table tr th, table tr td { border:1px solid #ddd;color:#606266;word-wrap:break-word}
  table tr th,table tr td{padding:4mm 0mm;word-wrap:break-word }
  .el-table__body, tr td .cell{width:100%!important}
  .el-table th.gutter{display: none;}
  .el-table colgroup.gutter{display: none;}
  </style><body>`;
  let content = "";
  let str = document.getElementById(id).innerHTML;
  content = content + str;
  printStr = printStr + tabStyle + content + "</body></html>";
  let pwin = window.open("_blank");
  pwin.document.write(printStr);
  pwin.document.close();
  pwin.focus();
  setTimeout(() => {
    pwin.print();
    pwin.close();
  }, 500);

}

//导出
import FileSaver from 'file-saver'
import XLSX from 'xlsx';
export function exportExcel(id) {
  // var arr = Array.prototype.slice.call(document.getElementsByClassName('has-gutter')[1].getElementsByClassName('is-leaf'));
  // arr.map(i => {
  //   i.setAttribute("rowspan", "1");
  // })
  /* generate workbook object from table */
  var wb = XLSX.utils.table_to_book(document.querySelector('#' + id))
  /* get binary string as output */
  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  try {
    FileSaver.saveAs(new Blob([wbout], {
      type: 'application/octet-stream'
    }), id + '.xlsx')
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout)
  }
  return wbout
}
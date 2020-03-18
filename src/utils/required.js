
// import validate from "@/utils/validate.js"
// export function proof(n) {
//     if (n == '') {
//         return '输入不能为空'
//     }
//     else if (!validate.isFloat(n,2)) {
//         return "只能输入阿拉伯数字和小数点后两位";
//     }
//     else if (parseFloat(n) < 0) {
//         return "数字超出界限";
//     }
//     else if (parseFloat(n) > 9999999999999999.99) {
//         return "数字超出界限";
//     }

// }
export  function required(n) {
    var unit = "仟佰拾万仟佰拾亿仟佰拾万仟佰拾圆角分", str = "";
    n += "00";
    var p = n.indexOf('.');
    if (p >= 0)
        n = n.substring(0, p) + n.substr(p + 1, 2);
    unit = unit.substr(unit.length - n.length);
    for (var i = 0; i < n.length; i++){
        str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
    }
    // str = str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|圆)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^圆零?|零分/g, "").replace(/圆$/g, "圆整");
    str = str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|圆)/g, "$1").replace(/(亿)万/g, "$1$2").replace(/^圆零?|零分/g, "").replace(/圆$/g, "圆整");
    return str;
}


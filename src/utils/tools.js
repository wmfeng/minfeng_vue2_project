export function FchangeC(data) {
    // 华氏温度转换为摄氏温度
    let C = (data - 32) / 1.8;
    return C;
}

export let changeArr = (baseArray, n) => {
    let len = baseArray.length;
    // let n = 8; //假设每行显示4个
    let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1);
    let res = [];
    for (let i = 0; i < lineNum; i++) {
        // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
        let temp = baseArray.slice(i * n, i * n + n);
        res.push(temp);
    }
    return res;
}
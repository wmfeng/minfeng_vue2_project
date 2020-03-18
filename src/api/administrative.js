import request from '@/utils/request'
//行政区划树查询
export function treeQuery(obj) {
  return request({
    url: '/xzqh/findAll',
    method: 'post',
    data:obj
  })
}
//根据当前行政区划获取树
export function xzqhtreeQuery(obj) {
  return request({
    url: '/xzqh/selectByLength',
    method: 'post',
    data:obj
  })
}
//添加修改
export function formSave(url, obj) {
  return request({
    url: '/xzqh/' + url,
    method: 'post',
    data: obj
  })
}
//树删除
export function deleteTree(option) {
  return request({
    url: '/xzqh/deleteAll',
    method: 'post',
    data: option
  })
}
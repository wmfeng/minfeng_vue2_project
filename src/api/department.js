import request from '@/utils/request'
//查询部门树
export function treeQueryBm(obj) {
  return request({
    url: '/dept/findAll',
    method: 'post',
    data:obj
  })
}
//查询部门树
export function QueryBmList(obj) {
  return request({
    url: '/dept/findBmList',
    method: 'post',
    data:obj
  })
}
//树删除
export function deleteTree(option) {
  return request({
    url: '/dept/deleteAll',
    method: 'post',
    data: option
  })
}
//部门添加，修改
export function formSave(url, obj) {
  return request({
    url: '/dept/' + url,
    method: 'post',
    data: obj
  })
}
//部门用户查询
export function findRoles(obj){
  return request({
    url:'/deptNumber/select',
    method:'post',
    data:obj
  })
}
//部门成员添加，修改
export function addMember(obj,method){
  return request({
    url:'/deptNumber/' + method,
    method:'post',
    data:obj
  })
}
//部门成员删除
export function delMember(obj){
  return request({
    url:'/deptNumber/delete',
    method:'post',
    data:obj
  })
}
//根据传参查询部门
export function findBmList(obj){
  return request({
    url:'/dept/findBmList',
    method:'post',
    data:obj
  })
}

//部门规则设置查询
// export function xtszSelect(obj){
//   return request({
//     url:'/xtsz/selectXtszByType',
//     method:'post',
//     data:obj
//   })
// }
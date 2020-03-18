import request from '@/utils/request'

export function roleAdd(url, obj) {
  return request({
    url: '/role/' + url,
    method: 'post',
    data: obj
  })
}

export function roleSearch(pageSize, pageNo) {
  return request({
    url: '/role/findAll',
    method: 'get',
    data: {
      pageSize,
      pageNo
    }
  })
}
export function roleSearchPage(pageSize, pageNo) {
  return request({
    url: '/role/selectURole',
    method: 'post',
    data: {
      pageSize,
      pageNo
    }
  })
}

export function roleDel(obj) {
  return request({
    url: '/role/dels',
    method: 'post',
    data: obj
  })
}

export function treeQuery() {
  return request({
    url: '/permissionOne/findAllPermission',
    method: 'post',
    data:{}
  })
}

export function accrQuery(id) {
  return request({
    url: '/urolepermission/queryByRole/' + id,
    method: 'get'
  })
}

export function accrSave(obj) {
  return request({
    url: '/urolepermission/addrelated',
    method: 'post',
    data: obj
  })
}

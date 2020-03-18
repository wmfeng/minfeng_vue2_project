import request from '@/utils/request'

export function dictSelect(zdb) {
  return request({
    url: '/udict/findBydicttype/' + zdb,
    method: 'get'
  })
}

export function dictAdd(url, obj) {
  return request({
    url: '/udict/' + url,
    method: 'post',
    data: obj
  })
}

export function dictDel(ids) {
  return request({
    url: '/udict/dels',
    method: 'post',
    data: ids
  })
}
export function hdztDict(obj) {
  return request({
    url: '/zhgrxx/selectXxztDict',
    method: 'post',
    data: obj
  })
}

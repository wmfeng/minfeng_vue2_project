import request from '@/utils/request'

//全部的字典项接口
export function dictionaries(key) {
  return request({
    url: "/udict/findBydicttype/" + key,
    method: 'get'
  })
}
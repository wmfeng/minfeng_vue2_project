import request from '@/utils/request'

export function loginSecurity(name, passwd, captcha) {
  return request({
    url: '/security/login',
    method: 'get',
    params: {
      name,
      passwd,
      captcha
    }
  })
}

export function loginByCode(userinfo) {
  return request({
    url: '/OauthAccessToken/oauth',
    method: 'post',
    data: userinfo
  })
}

export function loginByUsername(name, passwd) {
  return request({
    url: '/user/login',
    method: 'get',
    params: {
      name,
      passwd
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/queryBytoken',
    method: 'get',
    params: {
      token
    }
  })
}

export function getNav(token) {
  return request({
    url: '/permission/user',
    method: 'get',
    params: {
      token
    }
  })
}

export function zcCommit(url, obj) {
  return request({
    url: url,
    method: 'post',
    data: obj
  })
}

export function getUser(url) {
  return request({
    url: url,
    method: 'get'
  })
}
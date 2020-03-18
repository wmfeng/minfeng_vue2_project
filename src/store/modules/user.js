import {
  loginSecurity,
  loginByCode,
  loginByUsername,
  logout,
  getUserInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  Message
} from 'element-ui'

const user = {
  state: {
    token: getToken(),
    nickname: "nickname",
    user: ""
  },

  mutations: {
    SET_USER: (state, user) => {
      state.nickname = user.uUser.nickname;
      state.user = user;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },

  actions: {
    // 登录
    loginSecurity({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginSecurity(username, userInfo.password, userInfo.captcha).then(response => {
          const data = response.data
          if (data.success) {
            commit('SET_TOKEN', data.data.token)
            setToken(data.data.token)
            resolve()
          } else {
            Message.error(data.msg);
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    //统一登录-code登录
    loginByCode({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByCode(userInfo).then(response => {
          const data = response.data
          if (data.success) {
            commit('SET_TOKEN', data.data.token)
            setToken(data.data.token)
            resolve()
          } else {
            Message.error(data.msg);
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    //统一登录-用户名密码登录
    loginByUsername({
      commit
    }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          if (data.success) {
            commit('SET_TOKEN', data.data.token)
            setToken(data.data.token)
            resolve()
          } else {
            Message.error(data.msg);
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          const data = response.data;
          if (data.success) {
            commit('SET_USER', data.data)
            resolve(state.token)
          } else {
            Message.error(data.msg);
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_NAVBAR', [])
          removeToken()
          location.reload();
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
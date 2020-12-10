import Cookies from 'js-cookie'
import {
  getNav
} from '@/api/login'
import {
  constantRouterMap
} from "@/router"
const app = {
  state: {
    // 中英文
    language: Cookies.get('language') || 'zh',
    navOpen: true,
    path: "",
    title: "",
    icon: "",
    // navBar: [],
    navBar: require("../../../public/common/navbar.json").data,
    //无获取菜单接口或接口报错时, 注释上句, 打开下句, 并将state中path和title修改为接口对应字段即可
    // navBar: constantRouterMap
  },
  mutations: {
    // 中英文
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_NAVOPEN: (state) => {
      state.navOpen = !state.navOpen;
    }
  },
  actions: {
    // 中英文
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    },
    //获取nav
    GetNav({
      commit
    }, token) {
      return new Promise((resolve, reject) => {
        getNav(token).then(response => {
          const data = response.data
          if (data.success) {
            commit('SET_NAVBAR', data.data.reverse());
            resolve(data.data)
          } else {
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default app
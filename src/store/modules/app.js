import {
  getNav
} from '@/api/login'
import {
  constantRouterMap
} from "@/router"
const app = {
  state: {
    navOpen: false,
    path: "",
    title: "",
    icon: "",
    // navBar: [],
    navBar: require("../../../public/common/navbar.json").data,
    //无获取菜单接口或接口报错时, 注释上句, 打开下句, 并将state中path和title修改为接口对应字段即可
    // navBar: constantRouterMap
  },
  mutations: {
    SET_NAVOPEN: (state) => {
      state.navOpen = !state.navOpen;
    }
  },
  actions: {
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
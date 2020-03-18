const mutations = {
  SET_TOKEN: (state, token) => {
    state.user.token = token
  },
  SET_NAVBAR: (state, navBar) => {
    state.app.navBar = navBar
  }
}
export default mutations

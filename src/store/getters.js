const getters = {
  token: state => state.user.token,
  nickname: state => state.user.nickname,
  // xzqh: state => state.user.user.uXzqh.bm,
  navBar: state => state.app.navBar,
  navOpen: state => state.app.navOpen,
  navPath: state => state.app.path,
  navTitle: state => state.app.title,
  navIcon: state => state.app.icon,
  keepAliveList: state => state.aliveRouter.keepAliveList,
  visitedList: state => state.aliveRouter.visitedList,
  visitedViews: state => state.tagsView.visitedViews,
  theme: state => state.changeTheme.theme,
}
export default getters

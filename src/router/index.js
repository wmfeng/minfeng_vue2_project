import Vue from "vue";
import Router from "vue-router";
const innerLayout = () => import("@/views/layout/inner_layout");
const Layout = () => import("@/views/layout/layout");
//横向nav时，打开下句
// const Layout = () =>
//   import ("@/views/layout/layout_horizontal");
import modulesRouter from "./modules";

console.log(modulesRouter);

Vue.use(Router);

export const constantRouterMap = [
  {
    path: "/login",
    component: () => import("@/views/login/login"),
    hidden: true,
  },
  {
    path: "/sso/logout",
    hidden: true,
    component: () => import("@/views/login/logout"),
  },
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    hidden: true,
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
  {
    path: "/money",
    component: () => import("@/views/widgets/money"),
  },
].concat(modulesRouter);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
export default new Router({
  // mode: "history",//浏览模式切换
  // base: "/map",//应用的基路径 http://10.1.193.200:8080/map/home/home
  scrollBehavior: () => {
    document.getElementsByClassName("el-scrollbar__wrap")[0]
      ? (document.getElementsByClassName("el-scrollbar__wrap")[0].scrollTop = 0)
      : "";
    return {
      y: 0,
    };
  },
  routes: constantRouterMap,
});

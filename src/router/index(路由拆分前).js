import Vue from "vue";
import Router from "vue-router";
const innerLayout = () => import("@/views/layout/inner_layout");
const Layout = () => import("@/views/layout/layout");
//横向nav时，打开下句
// const Layout = () =>
//   import ("@/views/layout/layout_horizontal");
import systemManageRouter from "./modules";

console.log(systemManageRouter);

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
    path: "/home",
    component: Layout,
    redirect: "/home/home",
    meta: {
      title: "",
      icon: "el-icon-star-off",
    },
    children: [
      {
        path: "home",
        component: () => import("@/views/home/home"),
        name: "home",
        meta: {
          title: "首页",
          icon: "home",
        },
      },
    ],
  },
  {
    path: "/mapgodown",
    component: Layout,
    // redirect: '/home/home',
    meta: {
      title: "",
      icon: "el-icon-star-off",
    },
    children: [
      {
        path: "mapgodown",
        component: () => import("@/views/echarts/mapGodown"),
        name: "mapgodown",
        meta: {
          title: "地图下钻",
          icon: "mapgodown",
        },
      },
    ],
  },
  {
    path: "/test",
    component: Layout,
    redirect: "/test/test",
    meta: {
      title: "",
      icon: "el-icon-star-off",
    },
    children: [
      {
        path: "test",
        component: () => import("@/views/test/test"),
        name: "test",
        meta: {
          title: "技能实践",
          icon: "test",
        },
      },
    ],
  },
  {
    path: "/print",
    component: Layout,
    redirect: "/print/print",
    meta: {
      title: "打印功能",
      icon: "el-icon-star-off",
      rid: "",
    },
    children: [
      {
        path: "lodopprint",
        component: () => import("@/views/print/cLodopPrint"),
        name: "lodopprint",
        meta: {
          title: "Lodop打印",
          icon: "",
          rid: "-1",
        },
      },
      {
        path: "browserprint",
        component: () => import("@/views/print/browserPrint"),
        name: "browserprint",
        meta: {
          title: "Browser打印",
          icon: "",
          rid: "-1",
        },
      },
    ],
  },
  {
    path: "/video",
    component: Layout,
    redirect: "/video/hikvision",
    meta: {
      title: "",
      icon: "el-icon-star-off",
    },
    children: [
      {
        path: "hikvision",
        component: () => import("@/views/video/hikvision"),
        name: "hikvision",
        meta: {
          title: "海康视频",
          icon: "hikvision",
          rid: "-1",
        },
      },
    ],
  },
  {
    path: "/edit",
    component: Layout,
    redirect: "/edit/edit",
    meta: {
      title: "",
      icon: "el-icon-edit",
    },
    children: [
      {
        path: "edit",
        component: () => import("@/views/edit/edit"),
        name: "edit",
        meta: {
          title: "富文本编辑",
          icon: "edit",
          rid: "-1",
        },
      },
    ],
  },
  {
    path: "/weatherservice",
    component: Layout,
    redirect: "/weatherservice/weatherservice",
    meta: {
      title: "",
      icon: "el-icon-receiving",
    },
    children: [
      {
        path: "weatherservice",
        component: () => import("@/views/weatherservice/weatherservice"),
        name: "weatherservice",
        meta: {
          title: "气象服务",
          icon: "weatherservice",
          rid: "-1",
        },
      },
    ],
  },
  {
    path: "/manage",
    component: Layout,
    redirect: "/manage/user",
    meta: {
      title: "系统管理",
      // icon: ['system.png', 'system-c.png'],
      icon: "el-icon-setting",
      rid: "",
    },
    children: [
      {
        path: "user",
        component: () => import("@/views/manage/user"),
        name: "user",
        meta: {
          title: "用户管理",
          icon: "",
          rid: "-1",
        },
      },
      {
        path: "role",
        component: () => import("@/views/manage/role"),
        name: "role",
        meta: {
          title: "角色管理",
          icon: "",
          rid: "-1",
        },
      },
      {
        path: "source",
        component: () => import("@/views/manage/source"),
        name: "source",
        meta: {
          title: "资源管理",
          icon: "",
          rid: "-1",
        },
      },
      {
        path: "dict",
        component: () => import("@/views/manage/dict"),
        name: "dict",
        meta: {
          title: "字典管理",
          icon: "",
          rid: "-1",
        },
      },
      {
        path: "administrative",
        component: () => import("@/views/manage/administrative"),
        name: "administrative",
        meta: {
          title: "行政区划",
          icon: "",
          rid: "-1",
        },
      },
      {
        path: "department",
        component: () => import("@/views/manage/department"),
        name: "department",
        meta: {
          title: "部门管理",
          icon: "",
          rid: "-1",
        },
      },
    ],
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
];
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
  routes: constantRouterMap.concat(systemManageRouter.systemManageRouter),
});

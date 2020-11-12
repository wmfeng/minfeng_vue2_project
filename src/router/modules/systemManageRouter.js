const innerLayout = () => import("@/views/layout/inner_layout");
const Layout = () => import("@/views/layout/layout");
//横向nav时，打开下句
// const Layout = () =>
//   import ("@/views/layout/layout_horizontal");

const systemManageRouter = [
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
];

export default systemManageRouter;

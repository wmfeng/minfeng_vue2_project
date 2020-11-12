const innerLayout = () => import("@/views/layout/inner_layout");
const Layout = () => import("@/views/layout/layout");
//横向nav时，打开下句
// const Layout = () =>
//   import ("@/views/layout/layout_horizontal");


const homeRouter = [
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
];

export default homeRouter;

const innerLayout = () => import("@/views/layout/inner_layout");
const Layout = () => import("@/views/layout/layout");
//横向nav时，打开下句
// const Layout = () =>
//   import ("@/views/layout/layout_horizontal");


const testRouter = [
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
];

export default testRouter;

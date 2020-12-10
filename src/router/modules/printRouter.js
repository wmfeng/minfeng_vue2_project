const innerLayout = () => import("@/views/layout/inner_layout");
const Layout = () => import("@/views/layout/layout");
//横向nav时，打开下句
// const Layout = () =>
//   import ("@/views/layout/layout_horizontal");


const printRouter = [
  {
    path: "/print",
    component: Layout,
    redirect: "/print/lodopprint",
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
];

export default printRouter;

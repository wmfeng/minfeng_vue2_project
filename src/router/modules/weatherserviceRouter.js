const innerLayout = () => import("@/views/layout/inner_layout");
const Layout = () => import("@/views/layout/layout");
//横向nav时，打开下句
// const Layout = () =>
//   import ("@/views/layout/layout_horizontal");


const weatherserviceRouter = [
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
];

export default weatherserviceRouter;

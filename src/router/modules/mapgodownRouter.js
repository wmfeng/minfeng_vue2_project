const innerLayout = () => import("@/views/layout/inner_layout");
const Layout = () => import("@/views/layout/layout");
//横向nav时，打开下句
// const Layout = () =>
//   import ("@/views/layout/layout_horizontal");


const mapgodownRouter = [
  {
    path: "/mapgodown",
    component: Layout,
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
];

export default mapgodownRouter;

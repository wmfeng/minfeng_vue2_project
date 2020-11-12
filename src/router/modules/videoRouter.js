const innerLayout = () => import("@/views/layout/inner_layout");
const Layout = () => import("@/views/layout/layout");
//横向nav时，打开下句
// const Layout = () =>
//   import ("@/views/layout/layout_horizontal");


const videoRouter = [
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
];

export default videoRouter;

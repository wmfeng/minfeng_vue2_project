const innerLayout = () => import("@/views/layout/inner_layout");
const Layout = () => import("@/views/layout/layout");
//横向nav时，打开下句
// const Layout = () =>
//   import ("@/views/layout/layout_horizontal");


const editRouter = [
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
];

export default editRouter;

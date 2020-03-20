import Vue from 'vue'
import Router from 'vue-router'
const innerLayout = () =>
  import("@/views/layout/inner_layout");
const Layout = () =>
  import("@/views/layout/layout");
//横向nav时，打开下句
// const Layout = () =>
//   import ("@/views/layout/layout_horizontal");

Vue.use(Router)

export const constantRouterMap = [{
    path: '/login',
    component: () =>
      import("@/views/login/login"),
    hidden: true
  },
  {
    path: '/sso/logout',
    hidden: true,
    component: () =>
      import("@/views/login/logout")
  },
  {
    path: '/404',
    component: () =>
      import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    hidden: true
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home/home',
    meta: {
      title: '',
      icon: "el-icon-star-off"
    },
    children: [{
      path: 'home',
      component: () =>
        import("@/views/home/home"),
      name: 'home',
      meta: {
        title: '首页',
        icon: 'home'
      }
    }]
  },
  {
    path: '/echarts',
    component: Layout,
    redirect: '/echarts/map',
    meta: {
      title: '',
      icon: "el-icon-star-off"
    },
    children: [{
      path: 'mapone',
      component: () =>
        import("@/views/echarts/mapone"),
      name: 'mapone',
      meta: {
        title: '地图',
        icon: 'mapone'
      }
    }]
  },
  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/user',
    meta: {
      title: '系统管理',
      // icon: ['system.png', 'system-c.png'],
      icon: "el-icon-setting",
      rid: ""
    },
    children: [{
      path: 'user',
      component: () =>
        import("@/views/manage/user"),
      name: 'user',
      meta: {
        title: '用户管理',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'role',
      component: () =>
        import("@/views/manage/role"),
      name: 'role',
      meta: {
        title: '角色管理',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'source',
      component: () =>
        import("@/views/manage/source"),
      name: 'source',
      meta: {
        title: '资源管理',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'dict',
      component: () =>
        import("@/views/manage/dict"),
      name: 'dict',
      meta: {
        title: '字典管理',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'administrative',
      component: () =>
        import("@/views/manage/administrative"),
      name: 'administrative',
      meta: {
        title: '行政区划',
        icon: '',
        rid: "-1"
      }
    }, {
      path: 'department',
      component: () =>
        import("@/views/manage/department"),
      name: 'department',
      meta: {
        title: '部门管理',
        icon: '',
        rid: "-1"
      }
    }]
  }, {
    path: '*',
    redirect: '/404',
    hidden: true
  },{
    path:"/money",
    component:()=>import("@/views/widgets/money")
  }
]
export default new Router({
  // mode: "history",//浏览模式切换
  scrollBehavior: () => {
    document.getElementsByClassName("el-scrollbar__wrap")[0] ? document.getElementsByClassName("el-scrollbar__wrap")[0].scrollTop = 0 : '';
    return {
      y: 0
    }
  },
  routes: constantRouterMap
})
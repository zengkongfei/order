import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    // name: '首页',
    hidden: true,
    icon: 'zhiyuan',
    alwaysShow: true,
    children: [{
      path: 'dashboard',
      // name: '首页',
      hidden: true,
      component: () => import('@/views/dashboard/index')
    }
    ]
  },
  {
    path: '/shopInfoList',
    component: Layout,
    redirect: '/shopInfoList',
    name: '店铺管理',
    hidden: false,
    alwaysShow: true,
    icon: 'shop',
    children: [
      {
        path: '/shopInfoList',
        name: '认证信息',
        component: () => import('@/views/shopMange/shopInfoList')
      }
    //   {
    //   path: '/approve',
    //   name: '认证信息',
    //   component: () => import('@/views/shopMange/approve')
    // }
    ]
  },
  {
    path: '/memberMag',
    component: Layout,
    redirect: '/memberMag',
    name: '会员管理',
    icon: 'memberMag',
    hidden: false,
    alwaysShow: true,
    children: [{
      path: '/memberMag/memberInfo',
      name: '会员信息',
      component: () => import('@/views/memberMag/memberInfo')
    },
    // {
    //   path: '/memberMag/generalize',
    //   name: '网点推广',
    //   component: () => import('@/views/memberMag/generalize')
    // }
    ]
  },
  {
    path: '/indent',
    component: Layout,
    redirect: '/indent/indentlist',
    name: '订单中心',
    hidden: true,
    // icon: 'banben',
    children: [{
      path: '/indent/indentlist',
      hidden: true,
      name: '订单管理',
      component: () => import('@/views/indent/indentlist')
    },
    {
      path: '/indent/addindent',
      name: '订单新增',
      hidden: true,
      component: () => import('@/views/indent/addindent')
    },
    {
      path: '/indent/editindent',
      name: '订单修改',
      hidden: true,
      component: () => import('@/views/indent/editindent')
    },
    // {
    //   path: '/salesreturn/salesreturnlist',
    //   hidden: true,
    //   name: '退货单管理',
    //   component: () => import('@/views/salesreturn/salesreturnlist')
    // },
    // {
    //   path: '/salesreturn/addsalesreturn',
    //   hidden: true,
    //   name: '新增退货单',
    //   component: () => import('@/views/salesreturn/addsalesreturn')
    // },
    // {
    //   path: '/salesreturn/editsalesreturn',
    //   hidden: true,
    //   name: '退货单管理',
    //   component: () => import('@/views/salesreturn/editsalesreturn')
    // }
  ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

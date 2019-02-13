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
    redirect: '/approve',
    name: '店铺管理',
    hidden: false,
    alwaysShow: true,
    children: [{
      path: '/approve',
      name: '认证信息',
      component: () => import('@/views/shopMange/approve')
    }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/memberMag',
    name: '会员管理',
    hidden: false,
    alwaysShow: true,
    children: [{
      path: '/memberMag/memberInfo',
      name: '会员信息',
      component: () => import('@/views/memberMag/memberInfo')
    },
    {
      path: '/memberMag/generalize',
      name: '网络推广',
      component: () => import('@/views/memberMag/generalize')
    }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

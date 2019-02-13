import { constantRouterMap } from '@/router'

import { getRoleResource } from '@/api/basic'

import lazyLoading from '@/router/lazyLoad'

import Layout from '@/views/layout/Layout'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(role, route) {
  if (route.meta && route.meta.roles) {
    if (route.meta.roles.length === 1) {
      return route.meta.roles[0] === role
    }
    return route.meta.roles.indexOf(role) >= 0
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 */
function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = Layout
      }else {
        route.component = lazyLoading(route.component)
      }
    }
    if (route.children && route.children.length > 0) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        let aRouters = []
        getRoleResource().then(res => {
          const accessedRouters = filterAsyncRouter(res.data.datas)
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default permission

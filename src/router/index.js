import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import { Message } from 'element-ui'

import { default as prependRoutes } from './routes'

import store from '@/store'
import utils from '@/utils'

Vue.use(VueRouter)

const routes = [
  {
    path: '/admin/login',
    name: 'AdminLogin',
    meta: {
      title: '登陆',
      hideMenu: true
    },
    component: () => import(/* webpackChunkName: "userLogin" */ '@/views/UserLogin.vue')
  },
  {
    path: '/error',
    name: 'SomethingError',
    component: () => import('@/components/layouts/doTopLeftLayout/index.vue'),
    redirect: '/error/404',
    children: [
      {
        path: '/error/404',
        name: 'ErrorPage',
        component: () => import('@/views/ErrorPage.vue')
      },
      {
        path: '/error/permission',
        name: 'NotPermission',
        component: () => import('@/views/NotPermission.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/error/404'
  }
]
const router = new VueRouter({
  routes
})

export function toRealPath(path) {
  if (!path) {
    return path
  }
  return path.replace('/:type', '/static')
}

export function getPermissionRoute(routeList = prependRoutes, shouldStore = true) {
  const rList = utils.deepClone(routeList)
  const result = rList.reduce((newArr, eachRoute) => {
    if (eachRoute?.meta?.permission) {
      if (!Vue.prototype.$PERMISSION.includes(eachRoute.meta.permission)) {
        return newArr
      }
    }
    if (eachRoute.children && eachRoute.children.length) {
      eachRoute.children = getPermissionRoute(eachRoute.children, false)
      return [...newArr, eachRoute]
    }
    return [...newArr, eachRoute]
  }, [])

  shouldStore && store.dispatch('setPermissionRoutes', result).then(() => {})
  return result
}

router.beforeEach((to, from, next) => {
  const token = store.state.token
  const permission = store.state.permission
  NProgress.start()
  window.scrollTo(0, 0)
  if (to.meta.title) {
    document.title = `${to.meta.title} | ${utils.getDoEnv().VITE_GLOB_APP_TITLE}`
  }
  let lastPath = ''
  if (to.path === '/admin/login') {
    if (store.state.permissionRoutes[0] && token) {
      lastPath = toRealPath(store.state.permissionRoutes[0].path)
    }
  } else if (to.meta.permission) {
    if (!token) {
      lastPath = '/admin/login'
    } else {
      if (!permission.includes(to.meta.permission)) {
        lastPath = '/error/permission'
      }
    }
  } else {
    // 没有权限和 token 的情况
    if (!token) {
      lastPath = '/admin/login'
    }
  }
  store.dispatch('setCurrentPaths', lastPath || to.path).then(() => {})
  lastPath ? next(lastPath) : next()
  NProgress.done()
})

router.afterEach((to, from, next) => {})

router.onError((err) => {
  if (err.name === 'ChunkLoadError') {
    Message({
      type: 'error',
      message: '资源加载异常, 请刷新重试'
    })
  }
})

export default router

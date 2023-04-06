import Vue from 'vue'
import qs from 'qs'
import ElementUI from 'element-ui'
import store from './store'
import router, { getPermissionRoute, toRealPath } from './router'

import App from './App.vue'

import utils from '@/utils'
import MAPS from '@/maps'
import { requestVersion } from '@/api'

import '@/components/globalComponents'

import '@/directive'
import '@/filters'
import '@/plugins/axios'
import '@/plugins/mock'

import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/index.less'
import '@/mock'

// === 调用插件
ElementUI.Dialog.props.closeOnClickModal.default = false
ElementUI.TableColumn.props.sortOrders.default = () => ['descending', 'ascending', null]
Vue.use(ElementUI)
Vue.config.productionTip = false

// import.meta.globEager('@/mock')

// === 插入全局变量
window.MS_PER_DAY = 24 * 60 * 60 * 1000 // 一天的毫秒数
Vue.prototype.$MAPS = MAPS
Vue.prototype.$isSandbox = MAPS.common.devMap[+window.location.port] || ''
Vue.prototype.$utils = utils
Vue.prototype.$qs = qs
Vue.prototype.$PERMISSION = []
Vue.prototype.$HAS_PERMISSION = () => false
Vue.prototype.$HAS_PATH_PERMISSION = () => false

if (store.state.token) {
  Promise.all([store.dispatch('getUserInfo'), requestVersion()])
    .then((res) => {
      if (res[0]) {
        Vue.prototype.$ROLE = res[0].role
        Vue.prototype.$PERMISSION = res[0].permission
        const routes = getPermissionRoute()
        Vue.prototype.$HAS_PERMISSION = (key) => {
          const isRegExpKey = key instanceof RegExp
          if (isRegExpKey) {
            return Vue.prototype.$PERMISSION.some((v) => key.test(v))
          }
          if (utils.getRealType(key) === 'array') {
            return Vue.prototype.$PERMISSION.some((v) => key.includes(v))
          }
          return Vue.prototype.$PERMISSION.includes(key)
        }
        const hasPathPermission = (path, routeList = routes) => {
          if (!routeList || !routeList.length) {
            return false
          }
          for (const eachRoute of routeList) {
            const probablyList = [eachRoute.path]
            if (eachRoute.path.includes('/:type')) {
              probablyList.push(toRealPath(eachRoute.path))
            }
            if (probablyList.includes(path)) {
              return true
            }
            if (eachRoute.children && hasPathPermission(path, eachRoute.children)) {
              return true
            }
          }
        }
        Vue.prototype.$HAS_PATH_PERMISSION = hasPathPermission
        const appendRoutes = routes[0].path
          ? [
              // 增加默认跳转页
              {
                path: '/',
                redirect: toRealPath(routes[0].path)
              },
              ...routes // 增加有权限的路由
            ]
          : [...routes]
        appendRoutes.forEach((eachRoute) => router.addRoute(eachRoute)) // 增加有权限的路由
      }
      render(App, res[1])
    })
    .catch((e) => {
      console.log('main.js catch err: ', e)
      render(App)
    })
} else {
  requestVersion().then((res) => {
    render(App, res)
  })
}
function render(instance, versionInfo = {}) {
  new Vue({
    router,
    store,
    beforeCreate() {
      Vue.prototype.$NICK_NAME = localStorage.getItem('username') || ''
      Vue.prototype.$ACCOUNT_ID = localStorage.getItem('userId') || ''
      Vue.prototype.$VERSION_INFO = versionInfo || {}
      window.$VERSION_INFO = versionInfo || {}

      const token = localStorage.getItem('token') || ''
      const tokenPayload = token.split('.')[1] || ''
      if (token && tokenPayload) {
        const { exp } = JSON.parse(window.atob(tokenPayload))
        if (exp * 1000 <= Date.now() && ![8620, 8621].includes(+window.location.port)) {
          store.commit('setToken', null)
          router.replace({ path: '/admin/login' })
        }
      } else {
        store.commit('setToken', null)
        router.replace({ path: '/admin/login' })
      }
    },
    render: (h) => h(instance)
  }).$mount('#app')
}

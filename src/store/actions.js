import {
  SET_PAGE_SIZE,
  SET_TOKEN,
  SET_USER_NAME,
  SET_ROLE,
  SET_PERMISSION,
  SET_PERMISSION_ROUTES,
  SET_CURRENT_PATHS,
  TOOGLE_ASIDE
} from './mutation-type'

import { requestLogin, requestUserInfo } from '@/api'

export default {
  setPageSize(actionContext, size) {
    actionContext.commit(SET_PAGE_SIZE, size)
  },
  doLogin(actionContext, payload) {
    return new Promise((resolve, reject) => {
      requestLogin(payload)
        .then((res) => {
          const token = res.token
          let username = ''
          try {
            username = JSON.parse(window.atob(token.split('.')[1])).username
          } catch {
            /* empty */
          }
          actionContext.commit(SET_USER_NAME, username)
          actionContext.commit(SET_TOKEN, res.token)
          actionContext.commit(SET_PERMISSION, res.permission)
          actionContext.commit(SET_ROLE, res.role)
          resolve(res)
        })
        .catch((e) => {
          actionContext.commit(SET_TOKEN, '')
          reject(e)
        })
    })
  },
  async getUserInfo(actionContext) {
    const res = await requestUserInfo()
    actionContext.commit(SET_PERMISSION, res.permission)
    actionContext.commit(SET_ROLE, res.role)
    return res
  },
  doLogout(actionContext) {
    actionContext.commit(SET_TOKEN, '')
    actionContext.commit(SET_PERMISSION, [])
    return Promise.resolve()
  },
  setPermissionRoutes(actionContext, payload) {
    actionContext.commit(SET_PERMISSION_ROUTES, payload)
  },
  setCurrentPaths(actionContext, path) {
    actionContext.commit(SET_CURRENT_PATHS, path)
  },
  toogleAside(actionContext) {
    actionContext.commit(TOOGLE_ASIDE)
  }
}

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
import maps from '@/maps'
import { toRealPath } from '@/router'
import deepClone from '@/utils/module/deepClone'

export default {
  [SET_PAGE_SIZE](state, size) {
    state.pageSize = size
    localStorage.setItem('pageSize', size)
  },
  [SET_TOKEN](state, token) {
    if (token) {
      state.token = token
      localStorage.setItem('token', token)
    } else {
      state.token = null
      localStorage.removeItem('token')
    }
  },
  [SET_USER_NAME](state, name) {
    state.username = name
    localStorage.setItem('username', name)
  },
  [SET_ROLE](state, payload) {
    state.role = payload
  },
  [SET_PERMISSION](state, payload) {
    state.permission = payload
  },
  [SET_PERMISSION_ROUTES](state, payload) {
    state.permissionRoutes = payload || []
    state.pathsMap = {}
    state.topNavRoutes = state.permissionRoutes.reduce((newArr, eachTop) => {
      const realTopPath = toRealPath(eachTop.path)
      state.pathsMap[realTopPath] = [realTopPath]
      if (eachTop.meta && eachTop.meta.isNavTab) {
        if (eachTop.children && eachTop.children.length) {
          eachTop.children.forEach((eachChild) => {
            const realChildPath = toRealPath(eachChild.path)
            state.pathsMap[realChildPath] = [...state.pathsMap[realTopPath], realChildPath]
          })
        }
        return [...newArr, { ...eachTop, path: realTopPath }]
      }
      if (eachTop.children && eachTop.children.length) {
        return [
          ...newArr,
          ...eachTop.children.reduce((childArr, eachChild) => {
            const realChildPath = toRealPath(eachChild.path)
            state.pathsMap[realChildPath] = [...state.pathsMap[realTopPath], realChildPath]
            if (eachChild.meta && eachChild.meta.isNavTab) {
              return [
                ...childArr,
                {
                  ...eachChild,
                  path: realChildPath
                }
              ]
            }
            return childArr
          }, [])
        ]
      }
      return newArr
    }, [])
  },
  [SET_CURRENT_PATHS](state, path) {
    if (!path) {
      return
    }
    state.currentPaths = state.pathsMap[path] || []

    const ret = state.topNavRoutes.find((eachTop) =>
      state.currentPaths.some((e) => e === toRealPath(eachTop.path))
    )
    if (!ret || !ret.children || !ret.children.length) {
      state.asideTree = []
      state.layoutInfo.asideCollapsed = true
      return
    }
    state.layoutInfo.asideCollapsed = false

    const tempMap = {}
    state.asideTree = ret.children.reduce((newArr, routeConfig) => {
      const newTreeItem = deepClone(
        {
          title: routeConfig?.meta?.title || routeConfig.name,
          permission: routeConfig?.meta?.permission,
          role: routeConfig?.meta?.role,
          iconClass: routeConfig?.meta?.iconClass,
          tip: routeConfig?.meta?.tip,
          routeName: routeConfig.name,
          route: routeConfig.path
        },
        true
      )
      const positionInTree = routeConfig.meta.group
      if (!positionInTree) {
        return [...newArr, newTreeItem]
      }

      let newGroup
      let i = 0
      let arr = newArr
      while (positionInTree[i]) {
        const groupKey = positionInTree[i]
        if (!tempMap[groupKey] && !positionInTree[i + 1]) {
          newGroup = {
            ...maps.aside.treeGroup[groupKey],
            permission: newTreeItem.permission ? [newTreeItem.permission] : [],
            children: [newTreeItem]
          }
          tempMap[groupKey] = newGroup
          arr.push(newGroup)
          arr = tempMap[groupKey].children
        } else if (!tempMap[groupKey] && positionInTree[i + 1]) {
          newGroup = {
            ...maps.aside.treeGroup[groupKey],
            permission: ''
          }
          tempMap[groupKey] = newGroup
          arr.push(newGroup)
          arr = tempMap[groupKey].children
        } else if (tempMap[groupKey] && positionInTree[i + 1]) {
          arr = tempMap[groupKey].children
        } else if (tempMap[groupKey] && !positionInTree[i + 1]) {
          arr = tempMap[groupKey].children
          newTreeItem.permission && tempMap[groupKey].permission.push(newTreeItem.permission)
          arr.push(newTreeItem)
        }
        i++
      }
      return newArr
    }, [])
  },
  [TOOGLE_ASIDE](state) {
    state.layoutInfo.asideCollapsed = !state.layoutInfo.asideCollapsed
  }
}

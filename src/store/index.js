import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

import sCity from './module/sCity'
import sRegion from './module/sRegion'

import sClient from '@/modules/clientManage/_store/sClient'
import sCate from '@/modules/operateManage/_store/sCate'
import sCollection from '@/modules/operateManage/_store/sCollection'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageSize: Number(localStorage.getItem('pageSize')) || 10,

    token: localStorage.getItem('token'),
    username: localStorage.getItem('username') || '',
    role: '',
    permission: [],

    permissionRoutes: [],
    pathsMap: {},
    topNavRoutes: [],
    currentPaths: [],
    asideTree: [],
    layoutInfo: {
      headerHeight: 60,
      miniAsideWidth: 0,
      fullAsideWidth: 200,
      asideCollapsed: true
    }
  },
  actions,
  getters,
  mutations,
  modules: {
    sCity,
    sRegion,

    sCate,
    sClient,
    sCollection
  }
})

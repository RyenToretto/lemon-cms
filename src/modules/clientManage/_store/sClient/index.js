import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    allClientUser: [],
    clientUserId: '',
    clientUserName: '',

    inDialog: {
      allClientUser: [],
      clientUserId: '',
      clientUserName: ''
    }
  },
  mutations,
  actions,
  getters
}

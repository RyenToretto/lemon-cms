import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    allCollection: [],
    collectionId: '',
    collectionName: '',

    inDialog: {
      allCollection: [],
      collectionId: '',
      collectionName: ''
    }
  },
  mutations,
  actions,
  getters
}

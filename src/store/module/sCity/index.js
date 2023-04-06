import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    city: localStorage.getItem('city') || '',
    allCity: [],
    inDialog: {
      city: ''
    }
  },
  mutations,
  actions,
  getters
}

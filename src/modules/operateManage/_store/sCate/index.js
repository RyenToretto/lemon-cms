import mutations from './mutations'
import actions from './actions'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    allTopCate: [],
    topCateId: '',
    topCateName: '',

    allSubCate: [],
    subCateId: '',
    subCateName: '',

    inDialog: {
      allTopCate: [],
      topCateId: '',
      topCateName: '',

      allSubCate: [],
      subCateId: '',
      subCateName: ''
    }
  },
  mutations,
  actions,
  getters
}

import { SET_ALL_REGION, SET_REGION, SET_IN_DIALOG_REGION } from './mutation-type'

export default {
  [SET_ALL_REGION](state, allRegion) {
    state.allRegion = allRegion
  },
  [SET_REGION](state, { value, syncToStore }) {
    state.region = value
    syncToStore && localStorage.setItem('region', state.region)
  },
  [SET_IN_DIALOG_REGION](state, { value }) {
    state.inDialog.region = value
  }
}

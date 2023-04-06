import { SET_ALL_CITY, SET_CITY, SET_IN_DIALOG_CITY } from './mutation-type'

export default {
  [SET_ALL_CITY](state, allCity) {
    state.allCity = allCity
  },
  [SET_CITY](state, { value, syncToStore }) {
    state.city = value
    syncToStore && localStorage.setItem('city', state.city)
  },
  [SET_IN_DIALOG_CITY](state, { value }) {
    state.inDialog.city = value
  }
}

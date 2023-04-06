import {
  SET_ALL_CLIENT_USER,
  SET_IN_DIALOG_ALL_CLIENT_USER,
  SET_CLIENT_USER,
  SET_IN_DIALOG_CLIENT_USER,
  CLEAR_IN_DIALOG_CLIENT_USER
} from './mutation-type'
import maps from '@/maps'

export default {
  [SET_ALL_CLIENT_USER](state, allClientUser) {
    state.allClientUser = allClientUser
    const labelMap = {}
    const nameToId = {}
    allClientUser.forEach((clientUser) => {
      labelMap[clientUser.id] = clientUser.name
      nameToId[clientUser.name] = clientUser.id
    })
    maps.client.user.labelMap = labelMap
    maps.client.user.nameToId = nameToId
  },
  [SET_IN_DIALOG_ALL_CLIENT_USER](state, allClientUser) {
    state.inDialog.allClientUser = allClientUser
  },
  [SET_CLIENT_USER](state, { valueKey, newValue, syncToStore }) {
    switch (valueKey) {
      case 'id': {
        state.clientUserId = newValue
        state.clientUserName = maps.client.user.labelMap[newValue] || newValue
        break
      }
      case 'name': {
        state.clientUserName = newValue
        state.clientUserId = maps.client.user.nameToId[newValue] || newValue
        break
      }
      default: {
        break
      }
    }
    syncToStore &&
      localStorage.setItem(
        'clientUser',
        JSON.stringify({
          id: state.clientUserId,
          name: state.clientUserName
        })
      )
  },
  [SET_IN_DIALOG_CLIENT_USER](state, { valueKey, newValue }) {
    switch (valueKey) {
      case 'id': {
        state.inDialog.clientUserId = newValue
        state.inDialog.clientUserName = maps.client.user.labelMap[newValue] || newValue
        break
      }
      case 'name': {
        state.inDialog.clientUserName = newValue
        state.inDialog.clientUserId = maps.client.user.nameToId[newValue] || newValue
        break
      }
      default: {
        break
      }
    }
  },

  [CLEAR_IN_DIALOG_CLIENT_USER](state) {
    state.inDialog.clientUserId = ''
    state.inDialog.clientUserName = ''
  }
}

import {
  SET_ALL_COLLECTION,
  SET_IN_DIALOG_ALL_COLLECTION,
  SET_COLLECTION,
  SET_IN_DIALOG_COLLECTION,
  CLEAR_IN_DIALOG_COLLECTION
} from './mutation-type'
import maps from '@/maps'

export default {
  [SET_ALL_COLLECTION](state, allCollection) {
    state.allCollection = allCollection
    const labelMap = {}
    const nameToId = {}
    allCollection.forEach((collection) => {
      labelMap[collection.id] = collection.name
      nameToId[collection.name] = collection.id
    })
    maps.collection.labelMap = labelMap
    maps.collection.nameToId = nameToId
  },
  [SET_IN_DIALOG_ALL_COLLECTION](state, allCollection) {
    state.inDialog.allCollection = allCollection
  },
  [SET_COLLECTION](state, { valueKey, newValue, syncToStore }) {
    switch (valueKey) {
      case 'id': {
        state.collectionId = newValue
        state.collectionName = maps.collection.labelMap[newValue] || newValue
        break
      }
      case 'name': {
        state.collectionName = newValue
        state.collectionId = maps.collection.nameToId[newValue] || newValue
        break
      }
      default: {
        break
      }
    }
    syncToStore &&
      localStorage.setItem(
        'collection',
        JSON.stringify({
          id: state.collectionId,
          name: state.collectionName
        })
      )
  },
  [SET_IN_DIALOG_COLLECTION](state, { valueKey, newValue }) {
    switch (valueKey) {
      case 'id': {
        state.inDialog.collectionId = newValue
        state.inDialog.collectionName = maps.collection.labelMap[newValue] || newValue
        break
      }
      case 'name': {
        state.inDialog.collectionName = newValue
        state.inDialog.collectionId = maps.collection.nameToId[newValue] || newValue
        break
      }
      default: {
        break
      }
    }
  },

  [CLEAR_IN_DIALOG_COLLECTION](state) {
    state.inDialog.collectionId = ''
    state.inDialog.collectionName = ''
  }
}

import {
  SET_ALL_TOP_CATE,
  SET_IN_DIALOG_ALL_TOP_CATE,
  SET_TOP_CATE,
  SET_IN_DIALOG_TOP_CATE,
  SET_ALL_SUB_CATE,
  SET_IN_DIALOG_ALL_SUB_CATE,
  SET_SUB_CATE,
  SET_IN_DIALOG_SUB_CATE,
  CLEAR_IN_DIALOG_CATE
} from './mutation-type'
import maps from '@/maps'

export default {
  [SET_ALL_TOP_CATE](state, allTopCate) {
    state.allTopCate = allTopCate
    const labelMap = {}
    const nameToId = {}
    allTopCate.forEach((topCate) => {
      labelMap[topCate.id] = topCate.name
      nameToId[topCate.name] = topCate.id
    })
    maps.topCate.labelMap = labelMap
    maps.topCate.nameToId = nameToId
  },
  [SET_IN_DIALOG_ALL_TOP_CATE](state, allTopCate) {
    state.inDialog.allTopCate = allTopCate
  },
  [SET_TOP_CATE](state, { valueKey, newValue, syncToStore }) {
    switch (valueKey) {
      case 'id': {
        state.topCateId = newValue
        state.topCateName = maps.topCate.labelMap[newValue] || newValue
        break
      }
      case 'name': {
        state.topCateName = newValue
        state.topCateId = maps.topCate.nameToId[newValue] || newValue
        break
      }
      default: {
        break
      }
    }
    syncToStore &&
      localStorage.setItem(
        'topCate',
        JSON.stringify({
          id: state.topCateId,
          name: state.topCateName
        })
      )
  },
  [SET_IN_DIALOG_TOP_CATE](state, { valueKey, newValue }) {
    switch (valueKey) {
      case 'id': {
        state.inDialog.topCateId = newValue
        state.inDialog.topCateName = maps.topCate.labelMap[newValue] || newValue
        break
      }
      case 'name': {
        state.inDialog.topCateName = newValue
        state.inDialog.topCateId = maps.topCate.nameToId[newValue] || newValue
        break
      }
      default: {
        break
      }
    }
  },

  [SET_ALL_SUB_CATE](state, allSubCate) {
    state.allSubCate = allSubCate
    const labelMap = {}
    const nameToId = {}
    allSubCate.forEach((topCate) => {
      labelMap[topCate.id] = topCate.name
      nameToId[topCate.name] = topCate.id
    })
    maps.subCate.labelMap = labelMap
    maps.subCate.nameToId = nameToId
  },
  [SET_IN_DIALOG_ALL_SUB_CATE](state, allSubCate) {
    state.inDialog.allSubCate = allSubCate
  },
  [SET_SUB_CATE](state, { valueKey, newValue, syncToStore }) {
    switch (valueKey) {
      case 'id': {
        state.subCateId = newValue
        state.subCateName = maps.subCate.labelMap[newValue] || newValue
        break
      }
      case 'name': {
        state.subCateName = newValue
        state.subCateId = maps.subCate.nameToId[newValue] || newValue
        break
      }
      default: {
        break
      }
    }
    syncToStore &&
      localStorage.setItem(
        'subCate',
        JSON.stringify({
          id: state.subCateId,
          name: state.subCateName
        })
      )
  },
  [SET_IN_DIALOG_SUB_CATE](state, { valueKey, newValue }) {
    switch (valueKey) {
      case 'id': {
        state.inDialog.subCateId = newValue
        state.inDialog.subCateName = maps.subCate.labelMap[newValue] || newValue
        break
      }
      case 'name': {
        state.inDialog.subCateName = newValue
        state.inDialog.subCateId = maps.subCate.nameToId[newValue] || newValue
        break
      }
      default: {
        break
      }
    }
  },
  [CLEAR_IN_DIALOG_CATE](state) {
    state.inDialog.topCateId = ''
    state.inDialog.topCateName = ''
    state.inDialog.subCateId = ''
    state.inDialog.subCateName = ''
  }
}

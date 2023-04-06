import { requestAllTopCate, requestAllSubCate } from '../../_api'
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
import debounce from '@/utils/module/debounce'

export default {
  async getAllTopCate(actionContext, payload = {}) {
    return new Promise((resolve) => {
      debounce(
        function () {
          requestAllTopCate(payload)
            .then((res) => {
              if (payload.inDialog) {
                actionContext.commit(SET_IN_DIALOG_ALL_TOP_CATE, res || [])
                resolve(res || [])
              } else {
                actionContext.commit(SET_ALL_TOP_CATE, res || [])
                resolve(res || [])
              }
            })
            .catch((err) => {
              /* eslint-disable no-console */
              console.log(err)
              resolve([])
            })
        },
        300,
        true
      )()
    })
  },
  setTopCate(actionContext, { valueKey, newValue, syncToStore }) {
    actionContext.commit(SET_TOP_CATE, { valueKey, newValue, syncToStore })
  },
  setInDialogTopCate(actionContext, { valueKey, newValue }) {
    actionContext.commit(SET_IN_DIALOG_TOP_CATE, { valueKey, newValue })
  },

  async getAllSubCate(actionContext, payload = {}) {
    return new Promise((resolve) => {
      debounce(
        function () {
          requestAllSubCate(payload)
            .then((res) => {
              if (payload.inDialog) {
                actionContext.commit(SET_IN_DIALOG_ALL_SUB_CATE, res || [])
                resolve(res || [])
              } else {
                actionContext.commit(SET_ALL_SUB_CATE, res || [])
                resolve(res || [])
              }
            })
            .catch((err) => {
              /* eslint-disable no-console */
              console.log(err)
              resolve([])
            })
        },
        300,
        true
      )()
    })
  },
  setSubCate(actionContext, { valueKey, newValue, syncToStore }) {
    actionContext.commit(SET_SUB_CATE, { valueKey, newValue, syncToStore })
  },
  setInDialogSubCate(actionContext, { valueKey, newValue }) {
    actionContext.commit(SET_IN_DIALOG_SUB_CATE, { valueKey, newValue })
  },

  clearInDialogCate(actionContext) {
    actionContext.commit(CLEAR_IN_DIALOG_CATE)
  }
}

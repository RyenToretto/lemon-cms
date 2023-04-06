import { requestAllCollection } from '../../_api'
import {
  SET_ALL_COLLECTION,
  SET_IN_DIALOG_ALL_COLLECTION,
  SET_COLLECTION,
  SET_IN_DIALOG_COLLECTION,
  CLEAR_IN_DIALOG_COLLECTION
} from './mutation-type'
import debounce from '@/utils/module/debounce'

export default {
  async getAllCollection(actionContext, payload = {}) {
    return new Promise((resolve) => {
      debounce(
        function () {
          requestAllCollection(payload)
            .then((res) => {
              if (payload.inDialog) {
                actionContext.commit(SET_IN_DIALOG_ALL_COLLECTION, res)
              } else {
                actionContext.commit(SET_ALL_COLLECTION, res || [])
              }
              resolve(res || [])
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
  setCollection(actionContext, { valueKey, newValue, syncToStore }) {
    actionContext.commit(SET_COLLECTION, { valueKey, newValue, syncToStore })
  },
  setInDialogCollection(actionContext, { valueKey, newValue }) {
    actionContext.commit(SET_IN_DIALOG_COLLECTION, { valueKey, newValue })
  },

  clearInDialogCollection(actionContext) {
    actionContext.commit(CLEAR_IN_DIALOG_COLLECTION)
  }
}

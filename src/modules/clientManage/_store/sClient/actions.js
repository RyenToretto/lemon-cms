import { requestAllClientUser } from '../../_api'
import {
  SET_ALL_CLIENT_USER,
  SET_IN_DIALOG_ALL_CLIENT_USER,
  SET_CLIENT_USER,
  SET_IN_DIALOG_CLIENT_USER,
  CLEAR_IN_DIALOG_CLIENT_USER
} from './mutation-type'
import debounce from '@/utils/module/debounce'

export default {
  async getAllClientUser(actionContext, payload = {}) {
    return new Promise((resolve) => {
      debounce(
        function () {
          requestAllClientUser(payload)
            .then((res) => {
              if (payload.inDialog) {
                actionContext.commit(SET_IN_DIALOG_ALL_CLIENT_USER, res || [])
                resolve(res || [])
              } else {
                actionContext.commit(SET_ALL_CLIENT_USER, res || [])
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
  setClientUser(actionContext, { valueKey, newValue, syncToStore }) {
    actionContext.commit(SET_CLIENT_USER, { valueKey, newValue, syncToStore })
  },
  setInDialogClientUser(actionContext, { valueKey, newValue }) {
    actionContext.commit(SET_IN_DIALOG_CLIENT_USER, { valueKey, newValue })
  },

  clearInDialogClientUser(actionContext) {
    actionContext.commit(CLEAR_IN_DIALOG_CLIENT_USER)
  }
}

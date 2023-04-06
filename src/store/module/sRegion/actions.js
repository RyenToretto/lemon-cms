import { SET_ALL_REGION, SET_REGION, SET_IN_DIALOG_REGION } from './mutation-type'
import maps from '@/maps'

import { requestAllRegion } from '@/api'

export default {
  async getAllRegion(actionContext) {
    return new Promise((resolve) => {
      requestAllRegion()
        .then((regionToName) => {
          const allRegion = []
          for (const [value, label] of Object.entries(regionToName)) {
            allRegion.push({ label, value })
          }
          actionContext.commit(SET_ALL_REGION, allRegion)
          maps.region.regionToName = regionToName
          resolve()
        })
        .catch((err) => {
          /* eslint-disable no-console */
          console.log(err)
          resolve()
        })
    })
  },
  setRegion(actionContext, { value, syncToStore }) {
    actionContext.commit(SET_REGION, { value, syncToStore })
  },
  setInDialogRegion(actionContext, { value }) {
    actionContext.commit(SET_IN_DIALOG_REGION, { value })
  }
}

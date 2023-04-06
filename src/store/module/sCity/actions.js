import { SET_ALL_CITY, SET_CITY, SET_IN_DIALOG_CITY } from './mutation-type'
import maps from '@/maps'

import { requestChineseMap } from '@/api'

const generateCityInfo = (originCityList, appendInfo = {}) => {
  const { codeToInfo: prevInfo, labelStr: prevStr, labelArr: prevArr } = appendInfo
  const codeToInfo = prevInfo || {}
  const labelStr = prevStr || ''
  const labelArr = prevArr || []
  for (const eachCity of originCityList) {
    const { code, level, name } = eachCity
    codeToInfo[eachCity.code] = { code, level, name }
    const noLabel = ['市辖区', '辖区', '省直辖县级', '自治区直辖县级'].includes(name)
    if (name && !noLabel) {
      codeToInfo[eachCity.code].labelStr = (labelStr ? labelStr + ' ' : labelStr) + name
      codeToInfo[eachCity.code].labelArr = [...labelArr, name]
    }
    if (name && noLabel) {
      eachCity.disabled = true
      codeToInfo[eachCity.code].labelStr = labelStr
      codeToInfo[eachCity.code].labelArr = [...labelArr]
    }
    if (eachCity.areaList) {
      generateCityInfo(eachCity.areaList, {
        codeToInfo,
        labelStr: codeToInfo[eachCity.code].labelStr,
        labelArr: codeToInfo[eachCity.code].labelArr
      })
    } else {
      eachCity.leaf = true
    }
  }
  return codeToInfo
}

export default {
  async getAllCity(actionContext) {
    return new Promise((resolve) => {
      requestChineseMap()
        .then((allCity) => {
          actionContext.commit(SET_ALL_CITY, [
            { code: maps.city.all, name: '全国', level: 0, leaf: true },
            ...allCity
          ])
          maps.city.codeToInfo = generateCityInfo(allCity)
          resolve()
        })
        .catch((err) => {
          /* eslint-disable no-console */
          console.log(err)
          resolve()
        })
    })
  },
  setCity(actionContext, { value, syncToStore }) {
    actionContext.commit(SET_CITY, { value, syncToStore })
  },
  setInDialogCity(actionContext, { value }) {
    actionContext.commit(SET_IN_DIALOG_CITY, { value })
  }
}

import maps from '@/maps'
import { mapKeyToValue } from '@/filters/common'

export const labelTopCate = (code) => mapKeyToValue(code, maps.topCate.labelMap)
export const labelTopCateStatus = (code) => mapKeyToValue(code, maps.topCate.status.labelMap)
export const labelTopCateShown = (code) => mapKeyToValue(code, maps.topCate.shown.labelMap)

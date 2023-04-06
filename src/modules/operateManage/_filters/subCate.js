import maps from '@/maps'
import { mapKeyToValue } from '@/filters/common'

export const labelSubCate = (code) => mapKeyToValue(code, maps.subCate.labelMap)
export const labelSubCateStatus = (code) => mapKeyToValue(code, maps.subCate.status.labelMap)
export const labelSubCateShown = (code) => mapKeyToValue(code, maps.subCate.shown.labelMap)

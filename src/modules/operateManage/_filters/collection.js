import maps from '@/maps'
import { mapKeyToValue } from '@/filters/common'

export const labelCollection = (code) => mapKeyToValue(code, maps.collection.labelMap)
export const labelCollectionStatus = (code) => mapKeyToValue(code, maps.collection.status.labelMap)
export const labelCollectionSource = (code) => mapKeyToValue(code, maps.collection.source.labelMap)

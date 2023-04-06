import maps from '@/maps'
import { mapKeyToValue } from '@/filters/common'

export const labelPaperDownType = (code) => mapKeyToValue(code, maps.paper.downType.labelMap)
export const labelPaperSource = (code) => mapKeyToValue(code, maps.paper.source.labelMap)
export const labelPaperStatus = (code) => mapKeyToValue(code, maps.paper.status.labelMap)

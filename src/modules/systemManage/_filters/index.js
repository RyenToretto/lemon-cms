import maps from '@/maps'
import { mapKeyToValue } from '@/filters/common'

export const labelPermission = (code) => mapKeyToValue(code, maps.permission.labelMap)

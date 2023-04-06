import maps from '@/maps'
import { mapKeyToValue } from '@/filters/common'

export const labelAuthorAccount = (code) => mapKeyToValue(code, maps.client.account.labelMap)
export const labelAuthorAuditStatus = (code) =>
  mapKeyToValue(code, maps.client.auditStatus.labelMap)
export const labelAuthorUpdateType = (code) => mapKeyToValue(code, maps.client.updateType.labelMap)
export const labelAuthorSource = (code) => mapKeyToValue(code, maps.client.source.labelMap)
export const labelCreatorStatus = (code) => mapKeyToValue(code, maps.client.creatorStatus.labelMap)
export const labelCreatorOperate = (code) => mapKeyToValue(code, maps.client.opType.labelMap)
export const labelAuthorRecommend = (code) => mapKeyToValue(code, maps.client.recommend.labelMap)
export const labelCreatorOdd = (code) => mapKeyToValue(code, maps.client.odd.labelMap)
export const labelClientUser = (code) => mapKeyToValue(code, maps.client.user.labelMap)

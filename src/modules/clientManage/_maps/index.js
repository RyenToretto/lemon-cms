import account from './account'
import auditStatus from './auditStatus'
import creatorStatus from './creatorStatus'
import odd from './odd'
import opType from './opType'
import recommend from './recommend'
import rejectReason from './rejectReason'
import source from './source'
import updateType from './updateType'
import user from './user'

const client = {
  account,
  auditStatus,
  creatorStatus,
  odd,
  opType,
  recommend,
  rejectReason,
  source,
  updateType,
  user,
  personalDesc: {
    0: '无',
    1: '有'
  }
}
export default client

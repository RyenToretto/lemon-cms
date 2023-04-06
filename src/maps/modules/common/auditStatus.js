export const COMMON_AUDIT_STATUS_REJECT = 'reject'
export const COMMON_AUDIT_STATUS_REJECT_LABEL = '拒绝'

export const COMMON_AUDIT_STATUS_APPROVED = 'approved'
export const COMMON_AUDIT_STATUS_APPROVED_LABEL = '通过'

const status = {
  COMMON_AUDIT_STATUS_REJECT,
  COMMON_AUDIT_STATUS_APPROVED,
  labelMap: {
    [COMMON_AUDIT_STATUS_APPROVED]: COMMON_AUDIT_STATUS_APPROVED_LABEL,
    [COMMON_AUDIT_STATUS_REJECT]: COMMON_AUDIT_STATUS_REJECT_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case COMMON_AUDIT_STATUS_REJECT:
        className = 'info'
        break
      case COMMON_AUDIT_STATUS_APPROVED:
        className = 'success'
        break
      default:
    }
    return className
  }
}

export default status

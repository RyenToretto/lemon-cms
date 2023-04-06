export const AUTHOR_AUDIT_REJECT = 'reject'
export const AUTHOR_AUDIT_REJECT_LABEL = '拒绝'

export const AUTHOR_AUDIT_APPROVED = 'approved'
export const AUTHOR_AUDIT_APPROVED_LABEL = '通过'

const auditStatus = {
  AUTHOR_AUDIT_REJECT,
  AUTHOR_AUDIT_APPROVED,
  labelMap: {
    [AUTHOR_AUDIT_APPROVED]: AUTHOR_AUDIT_APPROVED_LABEL,
    [AUTHOR_AUDIT_REJECT]: AUTHOR_AUDIT_REJECT_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case AUTHOR_AUDIT_REJECT:
        className = 'danger'
        break
      case AUTHOR_AUDIT_APPROVED:
        className = 'success'
        break
      default:
    }
    return className
  }
}

export default auditStatus

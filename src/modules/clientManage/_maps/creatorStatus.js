export const CREATOR_STATUS_NORMAL = 'NORMAL'
export const CREATOR_STATUS_NORMAL_LABEL = '正常'

export const CREATOR_STATUS_LIMIT = 'LIMIT'
export const CREATOR_STATUS_LIMIT_LABEL = '限流中'

export const CREATOR_STATUS_SUSPEND = 'SUSPEND'
export const CREATOR_STATUS_SUSPEND_LABEL = '禁传中'

export const CREATOR_STATUS_BAN = 'BAN'
export const CREATOR_STATUS_BAN_LABEL = '封号中'

const creatorStatus = {
  CREATOR_STATUS_BAN,
  CREATOR_STATUS_BAN_LABEL,
  CREATOR_STATUS_LIMIT,
  CREATOR_STATUS_LIMIT_LABEL,
  CREATOR_STATUS_SUSPEND,
  CREATOR_STATUS_SUSPEND_LABEL,
  CREATOR_STATUS_NORMAL,
  CREATOR_STATUS_NORMAL_LABEL,
  labelMap: {
    [CREATOR_STATUS_NORMAL]: CREATOR_STATUS_NORMAL_LABEL,
    [CREATOR_STATUS_LIMIT]: CREATOR_STATUS_LIMIT_LABEL,
    [CREATOR_STATUS_SUSPEND]: CREATOR_STATUS_SUSPEND_LABEL,
    [CREATOR_STATUS_BAN]: CREATOR_STATUS_BAN_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case CREATOR_STATUS_NORMAL:
        className = 'success'
        break
      case CREATOR_STATUS_LIMIT:
        className = 'primary'
        break
      case CREATOR_STATUS_SUSPEND:
        className = 'warning'
        break
      case CREATOR_STATUS_BAN:
        className = 'danger'
        break
      default:
    }
    return className
  }
}

export default creatorStatus

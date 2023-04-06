export const CREATOR_OP_LIMIT = 'LIMIT'
export const CREATOR_OP_LIMIT_LABEL = '限流'

export const CREATOR_OP_SUSPEND = 'SUSPEND'
export const CREATOR_OP_SUSPEND_LABEL = '禁传'

export const CREATOR_OP_BAN = 'BAN'
export const CREATOR_OP_BAN_LABEL = '封号'

const opType = {
  CREATOR_OP_BAN,
  CREATOR_OP_BAN_LABEL,
  CREATOR_OP_LIMIT,
  CREATOR_OP_LIMIT_LABEL,
  CREATOR_OP_SUSPEND,
  CREATOR_OP_SUSPEND_LABEL,
  labelMap: {
    [CREATOR_OP_LIMIT]: CREATOR_OP_LIMIT_LABEL,
    [CREATOR_OP_SUSPEND]: CREATOR_OP_SUSPEND_LABEL,
    [CREATOR_OP_BAN]: CREATOR_OP_BAN_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case CREATOR_OP_LIMIT:
        className = 'purple'
        break
      case CREATOR_OP_SUSPEND:
        className = 'warning'
        break
      case CREATOR_OP_BAN:
        className = 'danger'
        break
      default:
    }
    return className
  }
}

export default opType

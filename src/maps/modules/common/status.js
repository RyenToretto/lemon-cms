export const COMMON_STATUS_WAIT = 'disabled'
export const COMMON_STATUS_WAIT_LABEL = '未上线'

export const COMMON_STATUS_ONLINE = 'enable'
export const COMMON_STATUS_ONLINE_LABEL = '已上线'

const status = {
  COMMON_STATUS_WAIT,
  COMMON_STATUS_ONLINE,
  labelMap: {
    [COMMON_STATUS_ONLINE]: COMMON_STATUS_ONLINE_LABEL,
    [COMMON_STATUS_WAIT]: COMMON_STATUS_WAIT_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case COMMON_STATUS_WAIT:
        className = 'info'
        break
      case COMMON_STATUS_ONLINE:
        className = 'success'
        break
      default:
    }
    return className
  }
}

export default status

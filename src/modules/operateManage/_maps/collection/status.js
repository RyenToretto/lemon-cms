export const COLLECTION_STATUS_WAIT = 'disabled'
export const COLLECTION_STATUS_WAIT_LABEL = '未上线'

export const COLLECTION_STATUS_ONLINE = 'enable'
export const COLLECTION_STATUS_ONLINE_LABEL = '已上线'

const status = {
  COLLECTION_STATUS_WAIT,
  COLLECTION_STATUS_ONLINE,
  labelMap: {
    [COLLECTION_STATUS_ONLINE]: COLLECTION_STATUS_ONLINE_LABEL,
    [COLLECTION_STATUS_WAIT]: COLLECTION_STATUS_WAIT_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case COLLECTION_STATUS_WAIT:
        className = 'info'
        break
      case COLLECTION_STATUS_ONLINE:
        className = 'success'
        break
      default:
    }
    return className
  }
}

export default status

export const TOP_CATE_STATUS_WAIT = 'disabled'
export const TOP_CATE_STATUS_WAIT_LABEL = '未上线'

export const TOP_CATE_STATUS_ONLINE = 'enable'
export const TOP_CATE_STATUS_ONLINE_LABEL = '已上线'

const status = {
  TOP_CATE_STATUS_WAIT,
  TOP_CATE_STATUS_ONLINE,
  labelMap: {
    [TOP_CATE_STATUS_ONLINE]: TOP_CATE_STATUS_ONLINE_LABEL,
    [TOP_CATE_STATUS_WAIT]: TOP_CATE_STATUS_WAIT_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case TOP_CATE_STATUS_WAIT:
        className = 'info'
        break
      case TOP_CATE_STATUS_ONLINE:
        className = 'success'
        break
      default:
    }
    return className
  }
}

export default status

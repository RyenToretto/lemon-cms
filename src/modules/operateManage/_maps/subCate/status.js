export const SUB_CATE_STATUS_WAIT = 'disabled'
export const SUB_CATE_STATUS_WAIT_LABEL = '未上线'

export const SUB_CATE_STATUS_ONLINE = 'enable'
export const SUB_CATE_STATUS_ONLINE_LABEL = '已上线'

const status = {
  SUB_CATE_STATUS_WAIT,
  SUB_CATE_STATUS_ONLINE,
  labelMap: {
    [SUB_CATE_STATUS_ONLINE]: SUB_CATE_STATUS_ONLINE_LABEL,
    [SUB_CATE_STATUS_WAIT]: SUB_CATE_STATUS_WAIT_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case SUB_CATE_STATUS_WAIT:
        className = 'info'
        break
      case SUB_CATE_STATUS_ONLINE:
        className = 'success'
        break
      default:
    }
    return className
  }
}

export default status

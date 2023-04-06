export const USUAL_PAPER_STATUS_WAIT = 'disabled'
export const USUAL_PAPER_STATUS_WAIT_LABEL = '未上线'

export const USUAL_PAPER_STATUS_ONLINE = 'enable'
export const USUAL_PAPER_STATUS_ONLINE_LABEL = '已上线'

const status = {
  USUAL_PAPER_STATUS_WAIT,
  USUAL_PAPER_STATUS_ONLINE,
  labelMap: {
    [USUAL_PAPER_STATUS_ONLINE]: USUAL_PAPER_STATUS_ONLINE_LABEL,
    [USUAL_PAPER_STATUS_WAIT]: USUAL_PAPER_STATUS_WAIT_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case USUAL_PAPER_STATUS_WAIT:
        className = 'info'
        break
      case USUAL_PAPER_STATUS_ONLINE:
        className = 'success'
        break
      default:
    }
    return className
  }
}

export default status

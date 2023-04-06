export const PAPER_DOWN_TYPE_FREE = 'free'
export const PAPER_DOWN_TYPE_FREE_LABEL = '免费'

export const PAPER_DOWN_TYPE_VIP = 'vip'
export const PAPER_DOWN_TYPE_VIP_LABEL = '会员'

export const PAPER_DOWN_TYPE_AD = 'ad'
export const PAPER_DOWN_TYPE_AD_LABEL = '广告'

const downType = {
  PAPER_DOWN_TYPE_FREE,
  PAPER_DOWN_TYPE_VIP,
  PAPER_DOWN_TYPE_AD,
  labelMap: {
    [PAPER_DOWN_TYPE_FREE]: PAPER_DOWN_TYPE_FREE_LABEL,
    [PAPER_DOWN_TYPE_VIP]: PAPER_DOWN_TYPE_VIP_LABEL,
    [PAPER_DOWN_TYPE_AD]: PAPER_DOWN_TYPE_AD_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case PAPER_DOWN_TYPE_FREE:
        className = 'info'
        break
      case PAPER_DOWN_TYPE_VIP:
        className = 'danger'
        break
      case PAPER_DOWN_TYPE_AD:
        className = 'primary'
        break
      default:
    }
    return className
  }
}

export default downType

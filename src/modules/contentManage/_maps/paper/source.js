export const PAPER_SOURCE_PLATFORM = 0
export const PAPER_SOURCE_PLATFORM_LABEL = '平台'

export const PAPER_SOURCE_CLIENT = 1
export const PAPER_SOURCE_CLIENT_LABEL = '用户'

const source = {
  PAPER_SOURCE_PLATFORM,
  PAPER_SOURCE_CLIENT,
  labelMap: {
    [PAPER_SOURCE_PLATFORM]: PAPER_SOURCE_PLATFORM_LABEL,
    [PAPER_SOURCE_CLIENT]: PAPER_SOURCE_CLIENT_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case PAPER_SOURCE_PLATFORM:
        className = 'primary'
        break
      case PAPER_SOURCE_CLIENT:
        className = 'warning'
        break
      default:
    }
    return className
  }
}

export default source

export const COLLECTION_SOURCE_PLATFORM = 0
export const COLLECTION_SOURCE_PLATFORM_LABEL = '平台'

export const COLLECTION_SOURCE_CLIENT = 1
export const COLLECTION_SOURCE_CLIENT_LABEL = '用户'

const source = {
  COLLECTION_SOURCE_PLATFORM,
  COLLECTION_SOURCE_CLIENT,
  labelMap: {
    [COLLECTION_SOURCE_PLATFORM]: COLLECTION_SOURCE_PLATFORM_LABEL,
    [COLLECTION_SOURCE_CLIENT]: COLLECTION_SOURCE_CLIENT_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case COLLECTION_SOURCE_PLATFORM:
        className = 'primary'
        break
      case COLLECTION_SOURCE_CLIENT:
        className = 'warning'
        break
      default:
    }
    return className
  }
}

export default source

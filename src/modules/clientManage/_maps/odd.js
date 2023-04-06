export const CREATOR_NOT_OK = 1
export const CREATOR_NOT_OK_LABEL = '禁用'

export const CREATOR_IS_OK = 0
export const CREATOR_IS_OK_LABEL = '取消禁用'

const odd = {
  CREATOR_NOT_OK,
  CREATOR_IS_OK,
  labelMap: {
    [CREATOR_IS_OK]: CREATOR_IS_OK_LABEL,
    [CREATOR_NOT_OK]: CREATOR_NOT_OK_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case CREATOR_NOT_OK:
        className = 'danger'
        break
      case CREATOR_IS_OK:
        className = 'success'
        break
      default:
    }
    return className
  }
}

export default odd

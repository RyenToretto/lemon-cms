export const AUTHOR_SOURCE_NORMAL = 'normal'
export const AUTHOR_SOURCE_NORMAL_LABEL = '普通用户'

export const AUTHOR_SOURCE_INVITED = 'invited'
export const AUTHOR_SOURCE_INVITED_LABEL = '邀请入驻'

const source = {
  AUTHOR_SOURCE_NORMAL,
  AUTHOR_SOURCE_INVITED,
  labelMap: {
    [AUTHOR_SOURCE_INVITED]: AUTHOR_SOURCE_INVITED_LABEL,
    [AUTHOR_SOURCE_NORMAL]: AUTHOR_SOURCE_NORMAL_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case AUTHOR_SOURCE_NORMAL:
        className = 'info'
        break
      case AUTHOR_SOURCE_INVITED:
        className = 'success'
        break
      default:
    }
    return className
  }
}

export default source

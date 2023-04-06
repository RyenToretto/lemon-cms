export const UPDATE_TYPE_NAME = 1
export const UPDATE_TYPE_NAME_LABEL = '用户昵称'

export const UPDATE_TYPE_AVATAR = 2
export const UPDATE_TYPE_AVATAR_LABEL = '头像'

export const UPDATE_TYPE_DES = 3
export const UPDATE_TYPE_DES_LABEL = '个人简介'

const updateType = {
  UPDATE_TYPE_NAME,
  UPDATE_TYPE_AVATAR,
  UPDATE_TYPE_DES,
  labelMap: {
    [UPDATE_TYPE_AVATAR]: UPDATE_TYPE_AVATAR_LABEL,
    [UPDATE_TYPE_NAME]: UPDATE_TYPE_NAME_LABEL,
    [UPDATE_TYPE_DES]: UPDATE_TYPE_DES_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case UPDATE_TYPE_NAME:
        className = 'warning'
        break
      case UPDATE_TYPE_AVATAR:
        className = 'primary'
        break
      case UPDATE_TYPE_DES_LABEL:
        className = 'info'
        break
      default:
    }
    return className
  }
}

export default updateType

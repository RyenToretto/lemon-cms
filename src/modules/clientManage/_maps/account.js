export const AUTHOR_ACCOUNT_LOGOFF = 1
export const AUTHOR_ACCOUNT_LOGOFF_LABEL = '已注销'

export const AUTHOR_ACCOUNT_OK = 0
export const AUTHOR_ACCOUNT_OK_LABEL = '正常'

const account = {
  AUTHOR_ACCOUNT_LOGOFF,
  AUTHOR_ACCOUNT_LOGOFF_LABEL,
  AUTHOR_ACCOUNT_OK,
  AUTHOR_ACCOUNT_OK_LABEL,
  labelMap: {
    [AUTHOR_ACCOUNT_OK]: AUTHOR_ACCOUNT_OK_LABEL,
    [AUTHOR_ACCOUNT_LOGOFF]: AUTHOR_ACCOUNT_LOGOFF_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case AUTHOR_ACCOUNT_LOGOFF:
        className = 'danger'
        break
      case AUTHOR_ACCOUNT_OK:
        className = 'success'
        break
      default:
    }
    return className
  }
}

export default account

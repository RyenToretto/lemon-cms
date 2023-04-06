export const SUB_CATE_SHOWN_FALSE = false
export const SUB_CATE_SHOWN_FALSE_LABEL = '不展示'

export const SUB_CATE_SHOWN_TRUE = true
export const SUB_CATE_SHOWN_TRUE_LABEL = '展示'

const shown = {
  SUB_CATE_SHOWN_FALSE,
  SUB_CATE_SHOWN_TRUE,
  labelMap: {
    [SUB_CATE_SHOWN_FALSE]: SUB_CATE_SHOWN_FALSE_LABEL,
    [SUB_CATE_SHOWN_TRUE]: SUB_CATE_SHOWN_TRUE_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case SUB_CATE_SHOWN_FALSE:
        className = 'danger'
        break
      case SUB_CATE_SHOWN_TRUE:
        className = 'primary'
        break
      default:
    }
    return className
  }
}

export default shown

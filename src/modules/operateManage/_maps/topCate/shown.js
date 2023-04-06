export const TOP_CATE_SHOWN_FALSE = false
export const TOP_CATE_SHOWN_FALSE_LABEL = '不展示'

export const TOP_CATE_SHOWN_TRUE = true
export const TOP_CATE_SHOWN_TRUE_LABEL = '展示'

const shown = {
  TOP_CATE_SHOWN_FALSE,
  TOP_CATE_SHOWN_TRUE,
  labelMap: {
    [TOP_CATE_SHOWN_FALSE]: TOP_CATE_SHOWN_FALSE_LABEL,
    [TOP_CATE_SHOWN_TRUE]: TOP_CATE_SHOWN_TRUE_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case TOP_CATE_SHOWN_FALSE:
        className = 'danger'
        break
      case TOP_CATE_SHOWN_TRUE:
        className = 'primary'
        break
      default:
    }
    return className
  }
}

export default shown

export const AUTHOR_IS_RECOMMEND = true
export const AUTHOR_IS_RECOMMEND_LABEL = '推荐关注'

export const AUTHOR_NOT_RECOMMEND = false
export const AUTHOR_NOT_RECOMMEND_LABEL = '非推荐关注'

const recommend = {
  AUTHOR_IS_RECOMMEND,
  AUTHOR_NOT_RECOMMEND,
  labelMap: {
    [AUTHOR_NOT_RECOMMEND]: AUTHOR_NOT_RECOMMEND_LABEL,
    [AUTHOR_IS_RECOMMEND]: AUTHOR_IS_RECOMMEND_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case AUTHOR_IS_RECOMMEND:
        className = 'danger'
        break
      case AUTHOR_NOT_RECOMMEND:
        className = 'info'
        break
      default:
    }
    return className
  }
}

export default recommend

export const REGION_INNER = 0
export const REGION_INNER_LABEL = '国内'

export const REGION_OUTER = 1
export const REGION_OUTER_LABEL = '国外'

const area = {
  REGION_INNER,
  REGION_OUTER,
  labelMap: {
    [REGION_INNER]: REGION_INNER_LABEL,
    [REGION_OUTER]: REGION_OUTER_LABEL
  },
  classMap(type) {
    let className = ''
    switch (type) {
      case REGION_INNER:
        className = 'primary'
        break
      case REGION_OUTER:
        className = 'info'
        break
      default:
    }
    return className
  }
}

export default area

import calculator from './module/calculator'
import convertTimeRange from './module/convertTimeRange'
import debounce from './module/debounce'
import dedent from './module/dedent'
import deepClone from './module/deepClone'
import getRealType from './module/getRealType'
import sortArrayByDateField from './module/sortArrayByDateField'
import throttled from './module/throttled'
import validator from './module/validator'
import * as doEnv from './module/doEnv'
import * as helpers from './module/helpers'
import * as filters from '@/filters/common'

const utils = {
  calculator,
  convertTimeRange,
  debounce,
  dedent,
  deepClone,
  getRealType,
  sortArrayByDateField,
  throttled,
  validator,

  ...doEnv,
  ...helpers
}

/**
 * 将 filters/modules 中的方法动态加入到 utils 里。
 * 命名规范：dateFormat -> utils.transferDateFormat
 */
for (const key in filters) {
  const prefix = 'transfer'
  const suffix = key.replace(/(\w){1}/, ($1) => {
    return $1.toUpperCase()
  })
  const functionName = prefix + suffix
  if (utils[functionName]) {
    console.warn(functionName, '已存在')
  }
  utils[functionName] = filters[key]
}

export default utils

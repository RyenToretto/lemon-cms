import qs from 'qs'
import dayjs from 'dayjs'
import maps from '@/maps'

/**
 *
 * @param {number} timeNumber 时间戳
 * @returns {string} 对应的时间文案
 */
export const formatCommentTime = (timeNumber) => {
  const nowTimeNumber = new Date().getTime()
  const nowYear = new Date(nowTimeNumber).getFullYear()
  const commentYear = new Date(timeNumber).getFullYear()

  if (nowYear > commentYear) {
    return dayjs(timeNumber).format('YYYY-MM-DD')
  }
  let diff = (nowTimeNumber - timeNumber) / 1000 // 差秒
  if (diff <= 60) {
    return '刚刚'
  }
  diff /= 60 // 分钟
  if (diff < 60) {
    return `${Math.floor(diff)}分钟前`
  }
  diff /= 60 // 小时
  if (diff < 24) {
    return `${Math.floor(diff)}小时前`
  }

  return dayjs(timeNumber).format('MM-DD')
}

/**
 *
 * @param {String | Number} code maps对象中的key值
 * @param {Object} obj 枚举对象
 * @returns {String} 枚举对象中的value
 */
export function mapKeyToValue(code, obj) {
  const codeList = Object.keys(obj)
  const _code = String(code)
  if (codeList.includes(_code)) {
    return obj[_code]
  } else {
    return code
  }
}

/**
 * 给数字加千位分隔符
 * @param {String | Number} num 原始数字
 * @returns {String} 逗号分割的字符串
 * @example 1234567.89 => 1,234,567.89
 */
export function thousandSeparator(num = '') {
  const strNum = String(num).split('.')
  const integerArray = []
  const _num = {
    sign: Number(num) >= 0 ? '' : '-',
    integer: `${Math.abs(strNum[0])}` || '',
    decimal: strNum[1] || ''
  }
  if (!/^(-)?\d+(\.\d+)?$/.test(num)) {
    return ''
  }
  for (let s = _num.integer.length; s >= 0; s -= 3) {
    const start = s - 3 >= 0 ? s - 3 : 0
    const end = s
    end > start && integerArray.unshift(_num.integer.slice(start, end))
  }
  return `${_num.sign}${integerArray.join(',')}${_num.decimal ? '.' + _num.decimal : ''}`
}

// 金额转化
export const money = (amount, decimalLength = 2, separator = false) => {
  const num = Number(amount)
  if (!/^-?\d+(.\d+)?$/.test(amount)) {
    return amount
  }
  let formatAmount = num.toFixed(decimalLength)
  if (separator) {
    formatAmount = thousandSeparator(formatAmount)
  }
  return formatAmount
}

export const toJson = (obj) => qs.stringify(obj)

export const numbers = (num, decimalLength, separator) => money(num, decimalLength, separator)

export const percent = (value, decimalLength = 2, showPercentSign = false) => {
  const num = Number(value)
  if (isNaN(num) || [null, undefined, ''].includes(value)) {
    return ''
  }
  return (num * 100).toFixed(decimalLength) + `${showPercentSign ? '%' : ''}`
}

// 替换空值
export const emptyReplace = (value, replaceText = '-') => {
  if (value === '' || value === null || value === undefined || value === 'NaN') {
    return replaceText
  }
  return value
}

// 日期
export const date = (str, format = 'date') => {
  const date = new Date(str)
  let dateStr = ''
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  if (new Date(date).toString() === 'Invalid Date' || !str) {
    return ''
  }
  month < 10 && (month = '0' + month)
  day < 10 && (day = '0' + day)
  hour < 10 && (hour = '0' + hour)
  minute < 10 && (minute = '0' + minute)
  second < 10 && (second = '0' + second)
  switch (format) {
    case 'dateTime':
      dateStr = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      break
    default:
      dateStr = `${year}-${month}-${day}`
  }
  return dateStr
}
// 按指定格式输出日期
export const dateFormat = (str, format = 'YYYY-MM-dd') => {
  const date = new Date(str)
  let dateStr = ''
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  if (date.toString() === 'Invalid Date' || !str) {
    return ''
  }
  month < 10 && (month = '0' + month)
  day < 10 && (day = '0' + day)
  hour < 10 && (hour = '0' + hour)
  minute < 10 && (minute = '0' + minute)
  second < 10 && (second = '0' + second)

  dateStr = format
    .replace(/Y{1,4}/i, year)
    .replace(/M{1,2}/, month)
    .replace(/d{1,2}/i, day)
    .replace(/h{1,2}/i, hour)
    .replace(/m{1,2}/, minute)
    .replace(/s{1,2}/i, second)
  return dateStr
}
export const labelCommonStatus = (code) => mapKeyToValue(code, maps.common.status.labelMap)
export const labelCommonAuditStatus = (code) =>
  mapKeyToValue(code, maps.common.auditStatus.labelMap)
export const language = (code) => mapKeyToValue(code, maps.language)
export const labelCityCode = (code) => {
  if (code === maps.city.all) {
    return '全国'
  }
  if (code === maps.city.other) {
    return '其他地区'
  }
  const cityInfo = maps.city.codeToInfo[code]
  return cityInfo ? cityInfo.name || code : code
}
export const labelCityStr = (code) => {
  if (code === maps.city.all) {
    return '全国'
  }
  if (code === maps.city.other) {
    return '其他地区'
  }
  const cityInfo = maps.city.codeToInfo[code]
  return cityInfo ? cityInfo.labelStr || code : code
}

export const labelArea = (code) => mapKeyToValue(code, maps.area.labelMap)
export const labelRegion = (code) =>
  mapKeyToValue(code, {
    ...maps.region.regionToName,
    [maps.region.all]: '全部',
    [maps.region.other]: '其他国家'
  })

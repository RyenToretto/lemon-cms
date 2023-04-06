import getRealType from './getRealType'

function isObjectLike(value) {
  return value !== null && typeof value === 'object'
}

function baseGetTag(value) {
  const objectProto = Object.prototype
  const hasOwnProperty = objectProto.hasOwnProperty
  const toString = objectProto.toString
  const symToStringTag = typeof Symbol !== 'undefined' ? Symbol.toStringTag : undefined

  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  if (!(symToStringTag && symToStringTag in Object(value))) {
    return toString.call(value)
  }
  const isOwn = hasOwnProperty.call(value, symToStringTag)
  const tag = value[symToStringTag]
  let unmasked = false
  try {
    value[symToStringTag] = undefined
    unmasked = true
  } catch (e) {
    /* empty */
  }

  const result = toString.call(value)
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag
    } else {
      delete value[symToStringTag]
    }
  }
  return result
}

export function toFriendlyArray(value) {
  if (!value && value !== 0) {
    return []
  }
  return [value, '' + value]
}

export function isArray(value) {
  return value && baseGetTag(value) === '[object Array]'
}

export function isObject(value) {
  const type = typeof value
  return !!value && (type === 'object' || type === 'function')
}

export function isNumber(value) {
  return (
    typeof value === 'number' || (isObjectLike(value) && baseGetTag(value) === '[object Number]')
  )
}

export function isString(value) {
  return (
    typeof value === 'string' ||
    (!isArray(value) && isObjectLike(value) && baseGetTag(value) === '[object String]')
  )
}

export function isJSON(value) {
  if (!value) {
    return false
  }
  let ret = true
  try {
    JSON.parse(value)
  } catch (e) {
    ret = false
  }
  return ret
}

export function isUndefined(value) {
  return value === undefined
}

export function isNull(value) {
  return value === null
}

export function isUndefinedOrNull(value) {
  return isUndefined(value) || isNull(value)
}

export function isNumberValue(value) {
  return !isNaN(parseFloat(value)) && !isNaN(Number(value))
}

export function coerceNumberValue(value, fallbackValue) {
  return isNumberValue(value) ? Number(value) : fallbackValue
}

export const strReplaceAll = (originStr, oldStr, newStr) => {
  if (baseGetTag(originStr) === '[object String]') {
    return originStr.replace(new RegExp(oldStr, 'gm'), newStr)
  }
  return originStr
}

export function replaceHttpPrefix(value) {
  if (isString(value)) {
    return value.replace(/http.*:\/\/.+?\//g, '')
  } else {
    return value
  }
}

export function strArrToCommaStr(arr) {
  if (isArray(arr)) {
    return arr.join(',')
  } else {
    return arr
  }
}

export function commaStrToStrArr(str) {
  if (isString(str)) {
    return [...str.split(',')]
  } else {
    return str
  }
}

export function mapToKeyLabel(obj) {
  if (!obj || !isObject(obj)) {
    return []
  }

  let keyLabel = []
  for (const [key, value] of Object.entries(obj)) {
    keyLabel = [...keyLabel, { value: key, label: value }]
  }
  return keyLabel
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

export const formatOnlyMin = (endTime) => {
  let secondTime = parseInt(endTime) // 将传入的秒的值转化为Number
  let min = 0 // 初始化分
  if (secondTime > 60) {
    // 如果秒数大于60，将秒数转换成整数
    min = parseInt('' + secondTime / 60) // 获取分钟，除以60取整数，得到整数分钟
    secondTime = parseInt('' + (secondTime % 60)) // 获取秒数，秒数取佘，得到整数秒数
  }
  if (secondTime) {
    min = min + +(secondTime / 60).toFixed(1)
  }
  return `${min}min`
}

export const formatSeconds = (endTime, showH = true, hideZero = false) => {
  let secondTime = parseInt(endTime) // 将传入的秒的值转化为Number
  let min = 0 // 初始化分
  let h = 0 // 初始化小时
  if (secondTime > 60) {
    // 如果秒数大于60，将秒数转换成整数
    min = parseInt('' + secondTime / 60) // 获取分钟，除以60取整数，得到整数分钟
    secondTime = parseInt('' + (secondTime % 60)) // 获取秒数，秒数取佘，得到整数秒数
    if (min > 60) {
      // 如果分钟大于60，将分钟转换成小时
      h = parseInt('' + min / 60) // 获取小时，获取分钟除以60，得到整数小时
      min = parseInt('' + (min % 60)) // 获取小时后取佘的分，获取分钟除以60取佘的分
    }
  }
  if (showH) {
    const realH = h > 0 ? h + 'h' : ''
    const realMin = (!hideZero && (min > 0 || h > 0)) || (hideZero && min > 0) ? min + 'min' : ''
    const realS =
      (!hideZero && (secondTime > 0 || min > 0 || h > 0)) || (hideZero && secondTime > 0)
        ? secondTime + 's'
        : ''
    return realH + realMin + realS
  } else {
    return `${min.toString().padStart(2, '0')}:${secondTime.toString().padStart(2, '0')}`
  }
}

export const clearBaiduPlayerStorage = () => {
  window.setTimeout(() => {
    for (const key of Object.keys(window.localStorage)) {
      if (key.includes('baiducyberplayer.filePostion')) {
        window.localStorage.removeItem(key)
      }
    }
  }, 300)
}

export const generatePlayerConfig = (videoUrl, controls = true, pic = '', logo = '') => {
  return {
    width: '100%', // 宽度，也可以支持百分比(不过父元素宽度要有)
    height: '100%', // 高度，也可以支持百分比
    title: '', // 标题
    file: videoUrl, // 播放地址
    image: pic, // 预览图
    autostart: false, // 是否自动播放
    repeat: true, // 是否重复播放
    stretching: 'uniform', // 拉伸设置
    volume: 0, // 音量
    controls, // controlbar 是否显示
    starttime: 0, // 视频开始播放时间点(单位s)，如果不设置，则可以从上次播放时间点续播
    logo: {
      // logo 设置
      linktarget: '_blank',
      margin: 8,
      hide: false,
      position: 'top-right', // 位置
      file: logo // 图片地址
    },
    ak: 'c1c7d2270f514c4cac24f87a9c09323d' // 公有云平台注册即可获得 accessKey  密钥可自行申请
  }
}

export const doDownload = (url, payload = {}, method = 'GET') => {
  const body = document.getElementsByTagName('body')[0]
  const form = document.createElement('form') // <form method='GET' action='https://www.baidu.com'>
  form.method = method
  form.action = url
  const data = { ...payload, t: new Date().getTime() }
  for (const key in data) {
    const param = document.createElement('input') // <input name="startTime" value="2019-07-15" />
    param.type = 'hidden'
    param.name = key
    param.value = data[key]
    form.appendChild(param)
  }
  body.appendChild(form)
  form.submit() // 发请求
  body.removeChild(form)
  // </form> => submit() => 发送请求 url ?{startTime: '2019-07-15'} => 返回响应 文件流，浏览器自动下载
}

export const filenameByUrl = (url, index = 0) => {
  if (!url || !url.split) {
    return 'file_' + index
  }
  const strArr = url.split('/')
  return strArr[strArr.length - 1]
}

export const openFileUrl = (imgSrc, isDownload = false, callback, name = 'file') => {
  if (!isDownload) {
    return window.open(imgSrc, '_blank')
  }
  const image = new Image()
  // 解决跨域 Canvas 污染问题
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const context = canvas.getContext('2d')
    context.drawImage(image, 0, 0, image.width, image.height)
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.download = name
      a.href = url
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    })
  }
  image.src = imgSrc
  image.onerror = (e) => callback(e)
}

export const initDoImages = (data) => {
  return !data
    ? []
    : isArray(data)
    ? isString(data[0])
      ? data.map((url) => {
          return { url }
        })
      : data.map((item) => {
          return { url: item.url }
        })
    : [{ url: data }]
}

export const doImageToString = (data) => {
  return !data ? '' : isArray(data) ? data.map((item) => item.url).join(',') : data
}

export const doImageToStringArray = (data) => {
  return !data ? [] : isArray(data) ? data.map((item) => item.url) : [data]
}

export const transferTF = (str) => {
  // 驼峰体转匈牙利
  if (!isString(str)) {
    return str
  }
  let newStr = ''
  for (let i = 0; i < str.length; i++) {
    if (/^[A-Z]$/.test(str[i])) {
      newStr = newStr + '_' + str[i].toLowerCase()
    } else {
      newStr = newStr + str[i]
    }
  }
  return newStr.startsWith('_') ? newStr.slice(1) : newStr
}

export const toTF = (str) => {
  // 匈牙利转驼峰体
  if (isString(str)) {
    let result = []
    str.split('_').forEach((e) => {
      e = `${e.charAt(0).toUpperCase()}${e.slice(1)}`
      result.push(e)
    })
    result = result.join('')
    return result
  } else {
    return str
  }
}

export const booleanPropComputed = (propValue) => {
  if (getRealType(propValue) === 'string') {
    return propValue !== 'false'
  }
  return !!propValue
}

export const sortArrayByDateField = (objectArr, field = 'date', descending = true) => {
  if (getRealType(objectArr) === 'array') {
    return objectArr.sort((a, b) => {
      const value1 = a[field]
      const value2 = b[field]
      if (descending) {
        // 降序
        return value2 - value1
      } else {
        // 升序
        return value1 - value2
      }
    })
  }
  return objectArr
}

export const getReasonHistory = (key) => {
  let ret = localStorage.getItem(key)
  ret = ret && JSON.parse(ret)
  let reasonHistory = []
  if (ret && getRealType(ret) === 'array') {
    reasonHistory = ret
  }
  return reasonHistory
}

export const saveToReasonHistory = (key, originValue) => {
  return new Promise((resolve) => {
    try {
      const value =
        getRealType(originValue) === 'string' ? originValue : JSON.stringify(originValue)
      let reasonHistory = getReasonHistory(key)
      const oldIndex = reasonHistory.findIndex((each) => each.content === value)
      if (oldIndex >= 0) {
        reasonHistory[oldIndex].date = Date.now()
      } else {
        reasonHistory.push({ content: value, date: Date.now() })
      }
      reasonHistory = sortArrayByDateField(reasonHistory)
      localStorage.setItem(key, JSON.stringify(reasonHistory.slice(0, 10)))
      resolve(reasonHistory)
    } catch (e) {
      resolve([])
    }
  })
}

// 校验规则
const validator = {
  bundleId(rule, value, callback) {
    if (/^\d+$/.test(value)) {
      callback()
    } else {
      callback(new Error('格式不符！BundleID为纯数字'))
    }
  },
  nullOrInteger(rule, value, callback) {
    if (!value) {
      return callback()
    }
    if (!Number.isInteger(+value)) {
      callback(new Error('请输入数字值'))
    } else {
      callback()
    }
  },
  bZeroInteger(rule, value, callback) {
    if (!value) {
      return callback()
    }
    if (!Number.isInteger(+value)) {
      callback(new Error('请输入数字值'))
    } else if (+value <= 0) {
      callback(new Error('请输入大于0的数字值'))
    } else {
      callback()
    }
  },
  bnZeroInteger(rule, value, callback) {
    if (!value) {
      return callback()
    }
    if (!Number.isInteger(+value)) {
      callback(new Error('请输入大于等于0的整数'))
    } else if (+value < 0) {
      callback(new Error('请输入大于等于0的整数'))
    } else {
      callback()
    }
  },
  gp(rule, value, callback) {
    const reg = /^(https:\/\/play\.google\.com\/store\/apps\/details\?)(.)*(id=).+/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('Google Play市场地址错误'))
    }
  },
  appStore(rule, value, callback) {
    const reg = /^(https:\/\/itunes\.apple\.com\/)(.)*(\/id).+/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('appStore地址错误'))
    }
  },
  eventKey(rule, value, callback) {
    const reg = /^[0-9a-zA-Z_-]+$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('只能使用数字、大小写字母、下划线、中划线'))
    }
  },
  email(rule, value, callback) {
    const reg = /^[0-9a-zA-Z_\-.]+@[0-9a-zA-Z-]+(.\w{2,})+$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('邮箱格式错误'))
    }
  },
  userName(rule, value, callback) {
    const reg = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,28}[a-zA-Z0-9]$/
    if (reg.test(value)) {
      callback()
    } else {
      callback(new Error('3~30位由大小写字母、数字和中划线组成,且中划线不能在头尾'))
    }
  },
  password(rule, value, cb) {
    const reg = [/[0-9]/, /[a-z]/, /[A-Z]/]
    let comparedTypes = 0
    const rangeLength = [6, 30]
    let result = false
    for (var i = 0; i < reg.length; i++) {
      if (reg[i].test(value)) {
        comparedTypes++
      }
    }
    if (comparedTypes >= 2 && value.length >= rangeLength[0] && value.length <= rangeLength[1]) {
      result = true
    }
    if (result) {
      cb()
    } else {
      cb(new Error('必须包含大小写字母和数字，长度为6-30字符'))
    }
  },
  money(rule, value, callback) {
    if (!value) {
      callback()
      return
    }
    if (!/((^[1-9]\d*)|^0)(\.\d{1,2})?$/.test(value)) {
      callback(new Error('请输入正确的金额'))
    } else {
      callback()
    }
  },
  generateArrayValid(errMsg) {
    return (rule, value, callback) => {
      if (!value) {
        callback()
        return
      }
      if (value.length === 0) {
        callback(new Error(errMsg))
      } else {
        callback()
      }
    }
  }
}
export default validator

import { Message, MessageBox } from 'element-ui'
import utils from '../../utils'
import errorList from './errorList'
import router from '@/router'
import store from '@/store'

function normalHandler(response) {
  // 判断是否为mock数据
  const isMock = response.request.match
  const _dataKey = ['post', 'put', 'patch'].includes(response.config.method) ? 'data' : 'params'
  let reqData = response.config[_dataKey]
  const _type = utils.getRealType(reqData)
  if (_type === 'string') {
    try {
      reqData = JSON.parse(reqData)
    } catch (e) {
      /* empty */
    }
  }
  // 控制台输出模拟数据
  isMock &&
    console.log(
      `%c${response.config.method.toUpperCase()}%c ${response.config.url}`,
      'background:#666;color:#fff;padding:3px 5px; border-radius:5px;',
      'color: #09f;',
      reqData,
      response.data
    )
  return new Promise((resolve, reject) => {
    let CODE = null
    const isFileStream =
      response.headers['content-type'] ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'

    if (isFileStream) {
      resolve(response)
      return
    }

    // 判断接口返回格式是否为Object
    if (Object.prototype.toString.call(response.data) !== '[object Object]') {
      reject(new Error('contentType error!'))
    }
    // 是否包含code字段
    if (!('ret' in response.data)) {
      const error = new Error('code params inExistence !')
      Message({
        type: 'error',
        message: '数据异常'
      })
      reject(error)
    }
    CODE = response.data.ret
    if (CODE === 200) {
      // 正常返回
      resolve(response.data.result)
    } else {
      // 其它错误
      let errorMsg = `${CODE}:${response.data.extra || response.data.message || '未知错误'}`
      if (CODE && String(CODE) in errorList) {
        errorMsg = errorList[String(CODE)]
      }
      !response.config.url.includes('/data/version.json') &&
        Message({
          type: 'error',
          message: errorMsg
        })
      reject(response.data.ret)
    }
  })
}
function errorHandler(err) {
  if (err.response && err.response.status === 401) {
    store.commit('setToken', '')
    MessageBox.alert('您当前的登录状态已失效，请重新登录！', '登录状态失效', {
      type: 'warning',
      callback: () => {
        router.push({ path: '/admin/login' })
      }
    }).then(() => {})
    return
  }
  if (err.message === 'canceled') {
    // 主动取消的
    return Promise.reject(err)
  }
  Message({
    type: 'error',
    message: '服务异常: ' + err?.response?.status
  })
  return Promise.reject(err)
}

export { normalHandler, errorHandler }

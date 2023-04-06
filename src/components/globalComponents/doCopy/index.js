import Clipboard from 'clipboard'
import { Message } from 'element-ui'

function clipboardSuccess(e, text) {
  Message({
    type: 'success',
    message: '复制成功'
  })
}
function clipboardError(e, text) {
  Message({
    type: 'warning',
    message: '复制失败'
  })
}

const doCopy = {}
doCopy.install = function (Vue) {
  // 注册
  /**
   * 挂载在vue原型上
   */
  Vue.prototype.$doCopy = (text, event, onSuccess, onError) => {
    event = event || {}
    const clipboard = new Clipboard(event.target, {
      text: () => text
    })
    clipboard.on('success', (e) => {
      onSuccess ? onSuccess(e, text) : clipboardSuccess(e, text)
      clipboard.off('error')
      clipboard.off('success')
      clipboard.destroy()
    })
    clipboard.on('error', (e) => {
      onError ? onError(e, text) : clipboardError(e, text)
      clipboard.off('error')
      clipboard.off('success')
      clipboard.destroy()
    })
    clipboard.onClick(event)
  }
}

export default doCopy

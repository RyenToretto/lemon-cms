export default function (fn, delay) {
  let timeout = null
  let preTime = 0
  const context = this
  const args = arguments
  const later = function () {
    preTime = +new Date()
    timeout = null
    fn.apply(context, args)
  }
  const throttled = function () {
    const now = +new Date()
    // 下次触发fn剩余的时间
    const remaining = delay - (now - preTime)
    // 如果没有剩余的时间了或者系统时间变更
    if (remaining <= 0 || remaining > delay) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      preTime = now
      fn.apply(context, args)
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
  }
  throttled.cancel = function () {
    clearTimeout(timeout)
    preTime = 0
    timeout = null
  }
  return throttled
}

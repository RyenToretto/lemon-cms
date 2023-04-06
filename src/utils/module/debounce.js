export default function debounce(fn, delay, isImmediate = false) {
  let timeout = null
  let result
  const debounced = function () {
    const context = this
    const args = arguments

    if (timeout) clearTimeout(timeout)
    if (isImmediate) {
      // 判断是否已经执行过，不要重复执行
      // setTimeout也是一直在更新的
      const callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, delay)
      if (callNow) {
        result = fn.apply(context, args)
      }
    } else {
      timeout = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
    return result
  }
  debounced.prototype.cancel = function () {
    clearTimeout(timeout)
    timeout = null
  }
  return debounced
}

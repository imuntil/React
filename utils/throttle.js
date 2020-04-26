function throttle(fn, wait, options) {
  let timeout, result, context, args
  let previous = 0
  // leading：false 表示禁用第一次执行
  // trailing: false 表示禁用停止触发的回调
  const { leading = true, trailing = true } = options || {}
  if (!leading && !trailing) {
    throw new Error('leading and trailing can not both pass false')
  }
  const throttled = function () {
    args = arguments
    context = this
    const now = Date.now()
    // 禁用第一次执行
    if (!leading && !previous) {
      previous = now
    }
    const remain = wait - (now - previous)
    // remain <= 0: 第一次执行
    // remain > wait: 手动修改设备时间可能发生
    if (remain <= 0 || remain > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      result = fn.apply(context, args)
      if (!timeout) {
        // 垃圾回收？
        args = context = null
      }
      // trailing 为true，才执行结束后的回调
    } else if (!timeout && trailing) {
      timeout = setTimeout(() => {
        timeout = null
        // 重置previous
        previous = leading ? Date.now() : 0
        fn.apply(context, args)
        if (!timeout) {
          // 垃圾回收？
          args = context = null
        }
      }, wait)
    }
    return result
  }
  throttled.cancel = function () {
    clearTimeout(timeout)
    timeout = null
    previous = 0
  }
  return throttled
}

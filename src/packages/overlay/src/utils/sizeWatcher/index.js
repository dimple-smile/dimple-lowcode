// 第三方的polyfill方案，可以支持到 FF44+，IE9+，Edge 10+ ，Safari 11+
import ResizeObserver from 'resize-observer-polyfill'

/**
 * domsize变化的监听器
 * @param { (e: DOMRectReadOnly)=>any } cb 回调函数，默认监听documentElement
 * @param {*} dom 本次监听的dom，默认监听documentElement
 * @returns {ResizeObserver}
 */
const SizeWatcher = (cb, dom) => {
  const watchDom = dom || document.documentElement
  const objResizeObserver = new ResizeObserver((entries) => {
    const entry = entries[0]
    cb(entry.contentRect)
  })
  objResizeObserver.observe(watchDom)
  return objResizeObserver
}

export { SizeWatcher }

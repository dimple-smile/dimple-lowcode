/**
 *
 * @param { (e: DOMRectReadOnly) => any } cb dom大小变化的回调
 * @param {HTMLElement} dom 检测的dom
 * @returns { ResizeObserver } 返回的监视器实例
 */
const resizeObserver = (cb, dom) => {
  const watchDom = dom || document.documentElement
  const objResizeObserver = new ResizeObserver((entries) => {
    const entry = entries[0]
    cb(entry.contentRect)
  })
  objResizeObserver.observe(watchDom)
  return objResizeObserver
}

export { resizeObserver }

import { SizeWatcher } from '../sizeWatcher'

let clientWidth = document.documentElement.clientWidth
let clientHeight = document.documentElement.clientHeight
let sizeWatcher
if (sizeWatcher) sizeWatcher.disconnect()
sizeWatcher = SizeWatcher((e) => {
  clientWidth = e.width
  clientHeight = e.height
})

/**
 * 把px转换为响应的px单位
 * @type { import('./type').RpxFun<string | number> }
 */
const rpx = (pxValue, opt = {}) => {
  if (!pxValue) return pxValue.toString()
  if (pxValue.toString().indexOf('%') > -1) return pxValue.toString()
  if (pxValue.toString().indexOf('vw') > -1) return pxValue.toString()
  const options = {
    type: opt.type || 'width',
    base: opt.base,
    currentBase: opt.currentBase || clientWidth,
    precision: opt.precision || 3,
  }
  if (options.type === 'width') {
    if (!options.base) options.base = 1920
    options.currentBase = clientWidth
  }
  if (options.type === 'height') {
    if (!options.base) options.base = 1080
    options.currentBase = clientHeight
  }

  const pxNumber = Number(pxValue.toString().replace('px', ''))
  const res = Number(Number((pxNumber / options.base) * options.currentBase).toFixed(options.precision))
  if (pxValue.toString().indexOf('px') > -1) return res + 'px'
  return res
}

export { rpx }

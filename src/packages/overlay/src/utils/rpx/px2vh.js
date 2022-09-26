/**
 * px转为vh的工具函数
 * @type { import('./type').Px2vwFun<string> }
 */
const px2vh = (pxValue, opt = {}) => {
  if (!pxValue) return pxValue.toString()
  if (pxValue.toString().indexOf('%') > -1) return pxValue.toString()
  if (pxValue.toString().indexOf('vh') > -1) return pxValue.toString()
  const options = {
    baseClientHeight: opt.baseClientHeight || 1080,
    precision: opt.precision || 3,
  }
  const pxNumber = Number(pxValue.toString().replace('px', ''))

  let res = Number(((pxNumber * 100) / options.baseClientHeight).toFixed(options.precision))
  return res + 'vh'
}

export { px2vh }

/**
 * px转为vw的函数
 * @type { import('./type').Px2vwFun<string> }
 */
const px2vw = (pxValue, opt = {}) => {
  if (!pxValue) return pxValue.toString()
  if (pxValue.toString().indexOf('%') > -1) return pxValue.toString()
  if (pxValue.toString().indexOf('vw') > -1) return pxValue.toString()
  if (pxValue.toString().indexOf('vh') > -1) return pxValue.toString()
  const options = {
    baseClientWidth: opt.baseClientWidth || 1920,
    precision: opt.precision || 3,
  }
  const pxNumber = Number(pxValue.toString().replace('px', ''))

  let res = Number(((pxNumber * 100) / options.baseClientWidth).toFixed(options.precision))
  return res + 'vw'
}

export { px2vw }

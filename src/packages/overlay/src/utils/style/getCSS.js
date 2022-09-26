/**
 * 根据style对象获取style文本进行设置
 * @param {CSSStyleDeclaration} styleObj -样式对象
 */
const getCSS = (styleObj = {}) => {
  return Object.keys(styleObj)
    .map((key) => `${key}:${styleObj[key] !== '' ? styleObj[key] : '""'}`)
    .join(';')
}

export { getCSS }

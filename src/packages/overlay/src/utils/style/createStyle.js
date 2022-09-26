import { getCSS } from './getCSS'

/**
 * @param {string} id 样式表id
 * @param {[{className:string, style: CSSStyleDeclaration}]} data 样式对象
 */
const createStyle = (id, data) => {
  if (document.getElementById(id)) return

  return new Promise((resolve, reject) => {
    const styleSheet = document.createElement('style')
    styleSheet.rel = 'text/css'
    styleSheet.id = id
    for (const item of data) {
      styleSheet.appendChild(document.createTextNode(`${item.className}{${getCSS(item.style)}}`))
    }
    const head = document.getElementsByTagName('head')[0]
    head.appendChild(styleSheet)

    styleSheet.onload = () => resolve('load success')
    styleSheet.onerror = () => reject('load error')
  })
}

export { createStyle }

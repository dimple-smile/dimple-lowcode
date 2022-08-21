const path = require('path')
const fs = require('fs-extra')
const fg = require('fast-glob')

const { camelCase, upperFirst } = require('lodash')
const components = require('./components')

const generateTemplate = (resloves = []) => {
  const utils = ['Loading', 'MessageBox', 'Notification', 'Message']
  const components = resloves.filter((item) => !utils.includes(item)).map((item) => `[${item}.name]: ${item}`)

  return `
    import { ${resloves.filter((item) => !utils.includes(item)).join(',')} } from 'element-ui'
    import './element-variables.scss'
    export { ${utils.join(',')} } from 'element-ui'
    export const ElComponents = {${components.join(',')}};
  `
}

const main = async () => {
  const packages = await fg(['packages/**/index.js'], { cwd: path.resolve(__dirname, '../../node_modules/element-ui') })
  let resloves = packages
    .map((item) => item.replace('packages/', '').replace('/index.js', '').replace('/src', ''))
    .filter((item) => !!components[item])
    .map((item) => upperFirst(camelCase(item)))
  resloves = [...new Set(resloves)]
  const res = generateTemplate(resloves)
  const elementIndexPath = path.resolve(__dirname, '../../src/packages/dimple-lowcode-form/src/components/element-ui/index.js')
  fs.ensureFileSync(elementIndexPath)
  fs.removeSync(elementIndexPath)
  fs.writeFile(elementIndexPath, res)
}

main()

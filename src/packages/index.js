export { DimpleLowcodeLayout } from './dimple-lowcode-layout'
export { DimpleLowcodeForm, valueTypes, editTypes, filterTypes, componentConfig } from './dimple-lowcode-form'

export default {
  install: (Vue) => {
    Vue.use(DimpleLowcodeLayout)
    Vue.use(DimpleLowcodeForm)
  },
}

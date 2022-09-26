export { DimpleLowcodeLayout } from './dimple-lowcode-layout'
export { DimpleLowcodeForm, valueTypes, editTypes, filterTypes, componentConfig } from './dimple-lowcode-form'
export { overlay } from './overlay'
console.log(overlay);
export default {
  install: (Vue) => {
    Vue.use(DimpleLowcodeLayout)
    Vue.use(DimpleLowcodeForm)
    Vue.use(overlay)
  },
}

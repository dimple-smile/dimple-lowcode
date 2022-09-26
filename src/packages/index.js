import { DimpleLowcodeLayout } from './dimple-lowcode-layout'
import { DimpleLowcodeForm, valueTypes, editTypes, filterTypes, componentConfig } from './dimple-lowcode-form'
import { overlay } from './overlay'

export { DimpleLowcodeLayout, DimpleLowcodeForm, valueTypes, editTypes, filterTypes, componentConfig, overlay }

export default {
  install: (Vue) => {
    Vue.use(DimpleLowcodeLayout)
    Vue.use(DimpleLowcodeForm)
    Vue.use(overlay)
  },
}

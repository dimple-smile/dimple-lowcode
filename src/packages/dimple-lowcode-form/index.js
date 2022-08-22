import DimpleLowcodeForm from './src/DimpleLowcodeForm.vue'
export { valueTypes } from './src/utils/valueTypes'
export { editTypes } from './src/utils/editTypes'
export { filterTypes } from './src/utils/filterTypes'
export { componentConfig } from './src/utils/componentConfig'
export { formConfig, buttonOperateTypes, requestParamModeTypes } from './src/utils/formConfig'

DimpleLowcodeForm.install = (Vue) => {
  Vue.component(DimpleLowcodeForm.name, DimpleLowcodeForm)
}
export { DimpleLowcodeForm }
export default DimpleLowcodeForm

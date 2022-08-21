import DimpleLowcodeForm from './src/DimpleLowcodeForm.vue'
import { valueTypes } from './src/utils/valueTypes'
import { editTypes } from './src/utils/editTypes'
import { filterTypes } from './src/utils/filterTypes'
import { componentConfig } from './src/utils/componentConfig'

DimpleLowcodeForm.install = (Vue) => {
  Vue.component(DimpleLowcodeForm.name, DimpleLowcodeForm)
}
export { DimpleLowcodeForm, valueTypes, editTypes, filterTypes, componentConfig }
export default DimpleLowcodeForm

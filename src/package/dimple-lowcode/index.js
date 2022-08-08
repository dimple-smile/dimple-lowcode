import DimpleLowcode from './src/DimpleLowcode.vue'
import { valueTypes } from './src/utils/valueTypes'
import { editTypes } from './src/utils/editTypes'

// import ElementUI from '../../plugins/element-ui';
DimpleLowcode.install = (Vue) => {
  // Vue.use(ElementUI)
  Vue.component(DimpleLowcode.name, DimpleLowcode)
}
export { DimpleLowcode, valueTypes, editTypes }
export default DimpleLowcode

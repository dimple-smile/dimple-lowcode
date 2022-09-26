import { overlay } from './src/overlay'

overlay.install = (Vue, options) => {
  Vue.directive('dimple-overlay', overlay)
}

export default overlay
export { overlay }

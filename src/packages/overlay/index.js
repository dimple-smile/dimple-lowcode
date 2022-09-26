import { overlay } from './src/overlay'

export default {
  install: (Vue, options) => {
    Vue.directive('dimple-overlay', overlay)
  },
}

export { overlay }

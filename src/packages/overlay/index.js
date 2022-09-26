import { overlay } from './src/overlay'

export default {
  install: (Vue, options) => {
    Vue.directive('overlay', overlay)
  },
}

export { overlay }

import Vue from 'vue'
import App from './App.vue'

// 自动加载插件形式拓展vue
const pluginsDoc = require.context('./plugins', true, /index\.js$/)
pluginsDoc
  .keys()
  .map((key) => pluginsDoc(key).default)
  .map((item) => Vue.use(item))

new Vue({ render: (h) => h(App) }).$mount('#app')
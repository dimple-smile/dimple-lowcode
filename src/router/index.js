import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routesDoc = require.context('../packages', true, /router\.js$/)
const routes = routesDoc
  .keys()
  .map((key) => routesDoc(key).default || [])
  .flat()

const router = new VueRouter({ mode: 'hash', routes })

export { router }

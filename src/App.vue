<template>
  <div id="app">
    <dimple-lowcode></dimple-lowcode>
  </div>
</template>

<script>
import { DimpleLowcode } from './package/dimple-lowcode'
export default {
  name: 'App',
  components: { DimpleLowcode },
}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', Helvetica, Tahoma, Arial, 'Microsoft YaHei', 微软雅黑, 黑体, Heiti, sans-serif, SimSun, 宋体, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  padding: 0;
  margin: 0;
}

#app {
  height: 100vh;
}
</style>

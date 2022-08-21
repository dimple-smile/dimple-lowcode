<template>
  <div id="app">
    <router-view style="height: 100%"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
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

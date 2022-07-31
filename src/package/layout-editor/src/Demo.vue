<template>
  <div class="container">
    <LayoutEditor :components="components"></LayoutEditor>
  </div>
</template>

<script>
import LayoutEditor from './LayoutEditor.vue'
console.log(LayoutEditor);

// 组件内容需要自行组织
const componentsDoc = require.context('./modules', true, /index\.js$/)
const components = componentsDoc.keys().map((key) => componentsDoc(key).default)

export default {
  components: {
    LayoutEditor,
  },
  data() {
    return {
      components,
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
}
</style>

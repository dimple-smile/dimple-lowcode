<template>
  <div class="dimple-lowcode-form-configs">
    <div class="tabs">
      <Tabs v-model="activeTab" :options="tabs"></Tabs>
    </div>
    <div class="main" v-overlay v-if="activeTab">
      <!-- 表单基本配置 -->
      <FormConfigsBase v-if="activeTab.key === 'base'" v-model="value" />

      <!-- 表单按钮配置 -->
      <FormConfigsButtons v-if="activeTab.key === 'submit'" v-model="value" />

      <!-- 表单保存配置 -->
      <FormConfigsSave v-if="activeTab.key === 'save'" v-model="value" />
    </div>
  </div>
</template>

<script>
import { Tabs } from '../tabs'
import FormConfigsBase from './FormConfigsBase.vue'
import FormConfigsButtons from './FormConfigsButtons.vue'
import FormConfigsSave from './FormConfigsSave.vue'

export default {
  components: { Tabs, FormConfigsBase, FormConfigsButtons, FormConfigsSave },
  props: {
    value: {},
  },
  data() {
    return {
      activeTab: null,
    }
  },
  computed: {
    tabs() {
      return [
        { key: 'base', name: '基本配置' },
        { key: 'submit', name: '操作按钮配置' },
        { key: 'save', name: '保存配置' },
      ]
    },
  },
}
</script>

<style scoped>
.dimple-lowcode-form-configs {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}
.tabs {
  border-top: 1px solid #ddd;
}
.main {
  flex: 1;
  padding: 20px 0;
}
</style>

<template>
  <div class="dimple-lowcode-configs">
    <template v-if="value">
      <div class="tabs">
        <Tabs v-model="activeTab" :options="tabs"></Tabs>
      </div>

      <div class="main" v-if="activeTab">
        <Form :label-length="8">
          <!-- 组件基本配置 -->
          <ConfigsBase v-if="activeTab.key === 'base'" v-model="value" :materials="materials" />

          <!-- 组件数据校验配置 -->
          <ConfigsValidate v-if="activeTab.key === 'validate'" v-model="value" />

          <!-- 组件数据收集配置 -->
          <ConfigsFilter v-if="activeTab.key === 'filter'" v-model="value" />
        </Form>
      </div>
    </template>

    <div v-else class="no-data">请选择一个组件进行编辑</div>
  </div>
</template>

<script>
import { Tabs } from '../tabs'
import { Form, FormItem } from '../form'
import { Render } from '../render'
import ConfigsBase from './ConfigsBase.vue'
import ConfigsValidate from './ConfigsValidate.vue'
import ConfigsFilter from './ConfigsFilter.vue'

export default {
  components: { Tabs, Form, FormItem, Render, ConfigsBase, ConfigsValidate, ConfigsFilter },
  props: {
    value: { type: Object, default: () => null },
    materials: {},
  },
  data() {
    return {
      activeTab: null,
    }
  },
  computed: {
    tabs() {
      if (!this.value) return []
      return Object.keys(this.value.config).map((key) => ({ key, ...this.value.config[key] }))
    },
  },
}
</script>

<style scoped>
.dimple-lowcode-configs {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.no-data {
  padding: 20px;
  text-align: center;
  color: #909399;
  font-size: 13px;
  flex: 1;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.main {
  flex: 1;
  overflow: overlay;
  padding: 20px;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
</style>

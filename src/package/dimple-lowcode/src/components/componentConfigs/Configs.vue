<template>
  <div class="dimple-lowcode-configs">
    <template v-if="value">
      <el-tabs v-model="activeTab" stretch>
        <template v-for="(item, index) in tabs">
          <el-tab-pane :label="item.name" :name="item.key || index"> </el-tab-pane>
        </template>
      </el-tabs>
      <div class="main">
        <Form label-length="7">
          <!-- 组件基本配置 -->
          <ConfigsBase v-if="activeTab === 'base'" v-model="value" :materials="materials" />

          <!-- 组件数据校验配置 -->
          <ConfigsValidate v-if="activeTab === 'validate'" v-model="value" />

          <!-- 组件数据收集配置 -->
          <ConfigsFilter v-if="activeTab === 'filter'" v-model="value" />
        </Form>
      </div>
    </template>

    <div v-else class="no-data">请选择一个组件进行编辑</div>
  </div>
</template>

<script>
import { Form, FormItem } from '../form'
import { Render } from '../render'
import ConfigsBase from './ConfigsBase.vue'
import ConfigsValidate from './ConfigsValidate.vue'
import ConfigsFilter from './ConfigsFilter.vue'

export default {
  components: { Form, FormItem, Render, ConfigsBase, ConfigsValidate, ConfigsFilter },
  props: {
    value: { type: Object, default: () => null },
    materials: {},
  },
  data() {
    return {
      activeTab: 'base',
    }
  },
  computed: {
    tabs() {
      return Object.keys(this.value.config)
        .map((key) => {
          return { key, ...this.value.config[key] }
        })
        .filter((item) => !!item.show)
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
}

.main {
  flex: 1;
  overflow: overlay;
  padding: 0px 20px;
}
</style>

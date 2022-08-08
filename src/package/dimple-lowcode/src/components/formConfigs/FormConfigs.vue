<template>
  <div class="dimple-lowcode-form-configs">
    <el-tabs v-model="activeTab" stretch>
      <template v-for="(item, index) in tabs">
        <el-tab-pane :label="item.name" :name="item.key || index"> </el-tab-pane>
      </template>
    </el-tabs>
    <div class="main">
      <!-- 表单基本配置 -->
      <FormConfigsBase v-if="activeTab === 'base'" v-model="value" />

      <!-- 表单提交配置 -->
      <FormConfigsSubmit v-if="activeTab === 'submit'" v-model="value" />

      <!-- 表单保存配置 -->
      <FormConfigsSave v-if="activeTab === 'save'" v-model="value" />
    </div>
  </div>
</template>

<script>
import FormConfigsBase from './FormConfigsBase.vue'
import FormConfigsSubmit from './FormConfigsSubmit.vue'
import FormConfigsSave from './FormConfigsSave.vue'

export default {
  components: { FormConfigsBase, FormConfigsSubmit, FormConfigsSave },
  props: {
    value: {},
  },
  data() {
    return {
      activeTab: 'base',
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
}
.main {
  flex: 1;
  overflow: overlay;
  padding: 0px 20px;
}
</style>

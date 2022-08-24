<template>
  <el-tabs class="dimple-lowcode-tabs" v-model="innerValue" stretch type="card" @tab-click="handleChange">
    <template v-for="(item, index) in options">
      <el-tab-pane :label="item.name" :name="item[valueKey]"> </el-tab-pane>
    </template>
  </el-tabs>
</template>

<script>
import { ElComponents } from '../element-ui'

export default {
  components: {  ...ElComponents },
  props: {
    value: { type: Object, default: null },
    options: { type: Array, default: () => [] },
    valueKey: { type: String, default: 'key' },
  },
  data() {
    return {
      innerValue: '',
    }
  },
  watch: {
    value: {
      handler: function (newValue) {
        if (!newValue) return (this.innerValue = '')
        if (!newValue[this.valueKey]) return (this.innerValue = '')
        if (newValue[this.valueKey] === this.innerValue) return
        this.innerValue = newValue[this.valueKey]
      },
      immediate: true,
    },
  },
  methods: {
    handleChange(tab) {
      const item = this.options[Number(tab.index)]
      this.$emit('input', item)
      this.$emit('change', item)
    },
  },
  mounted() {
    if (!this.value) {
      const firstItem = this.options[0]
      if (!firstItem) return
      this.$emit('input', firstItem)
      this.innerValue = firstItem[this.valueKey]
    }
  },
}
</script>

<style>
.dimple-lowcode-tabs {
  width: 100%;
}
.dimple-lowcode-tabs.el-tabs .el-tabs__nav {
  border-radius: 0px !important;
  border-top: none !important;
  border-color: #ddd !important;
}

.dimple-lowcode-tabs .el-tabs__header {
  margin-bottom: 0 !important;
}

.dimple-lowcode-tabs .el-tabs__nav-prev {
  border-left: 1px solid #ddd;
  box-sizing: border-box;
}

.dimple-lowcode-tabs .el-tabs__nav-next {
  border-right: 1px solid #ddd;
  box-sizing: border-box;
}
</style>

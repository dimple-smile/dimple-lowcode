<template>
  <div style="height: 100vh">
    <DimpleLowcodeForm v-model="data" :materials="materials">
      <!-- <template #header><div></div> </template>
      <template #panel><div></div> </template>
      <template #render-item-mask="{ data, index }">
        <div class="mask">
          <el-button size="mini" type="text" @click="setSize(data, index, 'small')">小</el-button>
          <el-button size="mini" type="text" @click="setSize(data, index, 'normal')">中</el-button>
          <el-button size="mini" type="text" @click="setSize(data, index, 'large')">大</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="remove(index)"></el-button>
        </div>
      </template> -->
    </DimpleLowcodeForm>
  </div>
</template>

<script>
import { DimpleLowcodeForm } from '../index'
import { ElComponents } from '../src/components/element-ui'
import Test from './Test.vue'

export default {
  components: { ...ElComponents, DimpleLowcodeForm },
  data() {
    return {
      data: [],
      materials: [
        {
          key: 'AppCockpit',
          name: '驾驶舱组件',
          components: [
            {
              name: '首页1',
              key: 'test',
              component: Test,
              renderType: 'mobile-form-item',
            },
          ],
        },
      ],
    }
  },
  methods: {
    setSize(item, index, size) {
      item.defaultProps.size = size
      this.$set(this.data, index, item)
    },
    remove(index) {
      this.data.splice(index, 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.mask {
  text-align: right;
}
</style>

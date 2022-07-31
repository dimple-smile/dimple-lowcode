<template>
  <div class="dimple-lowcode-configs">
    <Form v-if="value" label-length="7">
      <el-tabs v-if="value" v-model="activeTab" stretch>
        <template v-for="item in collapses">
          <el-tab-pane :label="item.name" :name="item.key" v-if="!item.visible">
            <div class="config-item">
              <template v-for="contentItem in item.items">
                <template v-if="contentItem.component">
                  <Render :props="{ 'lowcode-data': value }"></Render>
                </template>
                <template v-else>
                  <template v-if="contentItem.key === 'name'">
                    <FormItem :label="contentItem.name">{{ value.name }}</FormItem>
                  </template>
                  <template v-else-if="contentItem.key === 'label'">
                    <FormItem v-model="value.props.label" :label="contentItem.name" type="input"></FormItem>
                  </template>
                  <template v-else-if="contentItem.key === 'options'">
                    <FormItem :label="contentItem.name" alignItems="flex-start">
                      <template v-for="(item, index) in value.props[contentItem.modelKey]">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px">
                          value: <el-input v-model="item.value" size="mini"></el-input>
                          <div style="width: 10px"></div>
                          label: <el-input v-model="item.label" size="mini"></el-input>
                          <div style="flex: 1"></div>
                          <div style="width: 10px"></div>
                          <el-button icon="el-icon-delete" circle size="mini" type="danger" @click="value.props[contentItem.modelKey].splice(index, 1)"></el-button>
                        </div>
                      </template>
                      <div style="text-align: center">
                        <el-button icon="el-icon-plus" circle size="mini" type="primary" @click="value.props[contentItem.modelKey].push({ label: '', value: '' })"></el-button>
                      </div>
                    </FormItem>
                  </template>

                  <template v-else-if="contentItem.key === 'vilidate'">
                    <FormItem :label="contentItem.name"> </FormItem>
                  </template>
                </template>
              </template>
            </div>
          </el-tab-pane>
        </template>

        <!-- <template v-if="['select', 'radio', 'checkbox-group'].includes(value.props.type)">
          <FormItem label="选项配置" alignItems="flex-start">
            <template v-for="(item, index) in value.props.options">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px">
                value: <el-input v-model="item.value" size="mini"></el-input>
                <div style="width: 10px"></div>
                label: <el-input v-model="item.label" size="mini"></el-input>
                <div style="flex: 1"></div>
                <div style="width: 10px"></div>
                <el-button icon="el-icon-delete" circle size="mini" type="danger" @click="value.props.options.splice(index, 1)"></el-button>
              </div>
            </template>
            <div style="text-align: center">
              <el-button icon="el-icon-plus" circle size="mini" type="primary" @click="value.props.options.push({ label: '', value: '' })"></el-button>
            </div>
          </FormItem>
        </template> -->
      </el-tabs>
    </Form>

    <div v-else style="padding: 20px">请选择一个组件进行编辑</div>
  </div>
</template>

<script>
import { Form, FormItem } from '../form'
import { Render } from '../render'
export default {
  components: { Form, FormItem, Render },
  props: {
    value: { type: Object, default: () => null },
  },
  data() {
    return {
      activeTab: 'props',
    }
  },
  computed: {
    collapses() {
      let collapses = (this.value && this.value.config && this.value.config.collapses) || []
      let propsItem = collapses.find((item) => item.key === 'props')
      if (!propsItem) {
        propsItem = { name: '组件配置', key: 'props', items: [] }
        collapses.unshift(propsItem)
      }
      if (!propsItem.items) propsItem.items = []
      if (!propsItem.items.find((item) => item.key === 'vilidate')) {
        propsItem.items.unshift({ key: 'vilidate', name: '校验配置', modelKey: 'value' })
      }
      // if (!propsItem.items.find((item) => item.key === 'options')) propsItem.items.unshift({ key: 'options', name: '选项配置', modelKey: 'options' })
      if (!propsItem.items.find((item) => item.key === 'label')) propsItem.items.unshift({ key: 'label', name: '表单文本' })
      if (!propsItem.items.find((item) => item.key === 'name')) propsItem.items.unshift({ key: 'name', name: '组件名称' })

      return collapses
    },
  },
}
</script>

<style scoped>
.dimple-lowcode-configs {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.config-item {
  padding: 0px 20px;
}
</style>

<style>
.dimple-lowcode-configs .el-tabs {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
</style>

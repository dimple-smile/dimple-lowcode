<template>
  <div>
    <Form :label-length="10">
      <FormItem label="表单ID">{{ value.id }}</FormItem>
      <FormItem label="表单名称" type="input" v-model="value.name" required></FormItem>
      <FormItem label="表单标签长度" type="input" v-model="value.formProps.labelLength"></FormItem>
      <FormItem label="标签方向" type="select" v-model="value.formProps.labelPosition" :options="labelPositionOptions" tip="组件内的标签方向优先"></FormItem>
      <FormItem label="标签对齐方式" type="select" v-model="value.formProps.alignItems" :options="labelAlignItemsOptions" tip="组件内的对齐方式优先"></FormItem>
      <FormItem label="单页满屏模式" type="switch" v-model="value.isColumn" tip="使用单列布局模式时可设置，会使当前页面无法滚动，保持组件在当前页面，可以实现组件自动铺满高度"></FormItem>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem } from '../form'

export default {
  components: { Form, FormItem },
  props: {
    value: {},
  },
  data() {
    return {
      labelPositionOptions: [
        { value: 'left', label: '左对齐' },
        { value: 'right', label: '右对齐' },
      ],
      labelAlignItemsOptions: [
        { value: 'center', label: '居中对齐' },
        { value: 'flex-start', label: '顶部对齐' },
        { value: 'flex-end', label: '底部对齐' },
      ],
    }
  },
}
</script>

<style lang="scss" scoped></style>

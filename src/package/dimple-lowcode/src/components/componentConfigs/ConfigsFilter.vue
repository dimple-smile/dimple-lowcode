<template>
  <div>
    <FormItem label="启用搜索" v-model="value.config.filter.visible" type="switch"> </FormItem>
    <FormItem label="搜索方式" v-model="value.config.filter.type" type="select" :options="filterOptions"> </FormItem>
  </div>
</template>

<script>
import { FormItem } from '../form'

export default {
  components: { FormItem },
  props: {
    value: {},
  },
  computed: {
    filterOptions() {
      let res = [
        {
          label: '按文本模糊搜索',
          value: 'text',
        },
        {
          label: '按文本准确搜索',
          value: 'strict-text',
        },
        {
          label: '按日期格式搜索',
          value: 'date',
        },
        {
          label: '按日期范围格式搜索',
          value: 'daterange',
        },
        {
          label: '按手机号格式搜索',
          value: 'mobile',
        },
        {
          label: '按选项搜索',
          value: 'select',
        },
      ]
      return res
    },
  },
}
</script>

<style scoped></style>

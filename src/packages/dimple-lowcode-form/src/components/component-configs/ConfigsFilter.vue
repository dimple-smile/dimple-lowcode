<template>
  <div>
    <FormItem label="启用搜索" v-model="value.config.filter.visible" type="switch"> </FormItem>
    <FormItem label="搜索方式" v-model="value.config.filter.type" type="select" :options="filterOptions"> </FormItem>
  </div>
</template>

<script>
import { FormItem } from '../form'
import { filterTypes } from '../../utils/filterTypes'
export default {
  components: { FormItem },
  props: {
    value: {},
  },
  computed: {
    filterOptions() {
      let res = Object.values(filterTypes)
      return res
    },
  },
}
</script>

<style scoped></style>

<template>
  <div>
    <FormItem contentWidth="100%" v-bind="value.formItemDefaultProps">
      <RenderComponent v-if="customComponent" :component="customComponent" v-model="value.value" :props="componentProps"></RenderComponent>
    </FormItem>
  </div>
</template>

<script>
import { FormItem } from '../form'
import RenderComponent from './RenderComponent.vue'

export default {
  components: { FormItem, RenderComponent },
  props: {
    value: {},
    materials: {},
  },
  computed: {
    customComponent() {
      let res = null
      const materials = this.materials || []
      for (const materialItem of materials) {
        const components = materialItem.components || []
        const componentItem = components.find((item) => item.key === this.value.key)
        res = componentItem && componentItem.component
        if (res) break
      }
      return res
    },
    componentProps() {
      let res = {}
      Object.keys(this.value.props).forEach((key) => {
        res[key] = this.value.props[key].value
      })
      const defaultProps = this.value.defaultProps || {}
      return { ...defaultProps, ...res }
    },
  },
}
</script>

<style lang="scss" scoped></style>

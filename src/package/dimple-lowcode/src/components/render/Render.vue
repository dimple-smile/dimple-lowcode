<script>
export default {
  props: {
    materials: {},
    component: {},
    componentName: {},
    props: {},
  },
  render(h) {
    let component = this.component
    if (!component) {
      const materials = this.materials || []
      for (const materialItem of materials) {
        const components = materialItem.components || []
        const componentItem = components.find((item) => item.key === this.componentName)
        component = componentItem && componentItem.component
        if (component) break
      }
    }
    if (!component) return
    return h(component, { props: this.props || {} })
  },
}
</script>

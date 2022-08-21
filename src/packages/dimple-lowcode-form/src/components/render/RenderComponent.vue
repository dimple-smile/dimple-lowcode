<script>
export default {
  props: {
    value: {},
    component: {},
    props: {},
  },
  render(h) {
    const self = this
    if (!this.component) return
    const props = this.props || {}
    return h(this.component, {
      props: { value: this.value, ...props },
      on: {
        input: function (data) {
          self.$emit('input', data)
        },
      },
    })
  },
}
</script>

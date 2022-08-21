<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    size: { type: String, default: '' },
    labelLength: { type: [String, Number], default: '5' },
    contentWidth: { type: [String, Number], default: '100%' },
    labelPosition: { type: String, default: '' },
    alignItems: { type: String, default: '' },
    marginBottom: { type: String, default: '' },
  },
}
</script>

<style scoped></style>

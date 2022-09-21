<template>
  <div>
    {{size}}
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'small',
    },
  },
}
</script>

<style lang="scss" scoped></style>

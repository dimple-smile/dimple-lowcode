<template>
  <div class="dimple-title-divider">
    <div class="border" :style="{ background: color }"></div>
    <div class="title">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    color: { type: String, default: '#4066E2' },
  },
}
</script>

<style scoped>
.dimple-title-divider {
  display: flex;
  align-items: center;
  padding:10px 18px;
}

.dimple-title-divider .border {
  height: 14px;
  width: 4px;
  margin-right: 4px;
}
.dimple-title-divider .title {
  font-size: 14px;
  color: #333333;
  font-weight: 700;
}
</style>

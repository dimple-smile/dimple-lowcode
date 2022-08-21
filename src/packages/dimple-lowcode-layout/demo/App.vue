<template>
  <div>
    <DimpleLowcodeLayout v-model="layout" />
  </div>
</template>

<script>
import { DimpleLowcodeLayout } from '../index'
export default {
  components: { DimpleLowcodeLayout },
  data() {
    return {
      layout: [],
    }
  },
}
</script>

<style scoped></style>

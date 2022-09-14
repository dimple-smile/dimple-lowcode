<template>
  <div style="height: 100vh">
    <DimpleLowcodeForm :conatinerStyle="{ background: '#F7F8FA' }" />
  </div>
</template>

<script>
import { DimpleLowcodeForm } from '../index'
export default {
  name: 'App',
  components: { DimpleLowcodeForm },
}
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <div class="options-editor">
      <div class="no-data" v-if="!value.value.length">暂无选项</div>
      <template v-for="(item, index) in value.value">
        <div class="options-editor-item">
          显示标签:
          <el-input class="options-editor-item-input" v-model="item.label" size="mini"></el-input>
          代表实值:
          <el-input class="options-editor-item-input" v-model="item.value" size="mini"></el-input>

          <el-button icon="el-icon-delete" circle size="mini" type="danger" @click="value.value.splice(index, 1)"></el-button>
        </div>
      </template>
    </div>
    <div class="options-editor-add-btn">
      <el-button icon="el-icon-plus" circle size="mini" type="primary" @click="value.value.push({ label: '', value: '' })"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
  },
}
</script>

<style scoped>
.options-editor {
  max-height: 50vh;
  overflow: overlay;
}

.options-editor-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.options-editor-item-input {
  flex: 1;
  margin: 0 5px;
}

.options-editor-add-btn {
  text-align: center;
  margin-top: 10px;
}

.no-data {
  text-align: center;
  padding: 10px;
}
</style>

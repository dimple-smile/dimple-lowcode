<template>
  <div class="dimple-lowcode-options-editor">
    <el-table class="table" size="mini" :data="value.value" :max-height="350">
      <el-table-column label="显示标签">
        <template #default="{ row }">
          <el-input style="width: 100%;" v-model="row.label" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="代表实值">
        <template #default="{ row }">
          <el-input style="width: 100%;" v-model="row.value" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row, $index }">
          <el-button size="mini" type="text" @click="value.value.splice($index, 1)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-btn">
      <el-button icon="el-icon-plus" size="mini" @click="value.value.push({ label: '', value: '' })">添加</el-button>
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
.dimple-lowcode-options-editor .table {
  border: 1px solid #EBEEF5;
  border-bottom: none;
  margin-bottom: 20px;
}
</style>

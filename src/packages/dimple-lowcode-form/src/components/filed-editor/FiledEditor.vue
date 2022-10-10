<template>
  <div>
    <div @click="visible = true">
      <slot></slot>
    </div>
    <el-dialog :close-on-click-modal="false" :title="title" :visible.sync="visible" append-to-body width="1000px">
      <Form class="dimple-lowcode-filed-editor" margin-bottom="0" :label-length="0">
        <el-table class="table" size="mini" :data="value" :max-height="350">
          <el-table-column label="字段名称">
            <template #default="{ row }">
              <FormItem type="autocomplete" v-model="row.name" :options="urlParamNameOptions"> </FormItem>
            </template>
          </el-table-column>
          <el-table-column label="录入模式">
            <template #default="{ row }">
              <FormItem type="select" v-model="row.mode" :options="modeOptions"> </FormItem>
            </template>
          </el-table-column>
          <el-table-column label="字段值">
            <template #default="{ row }">
              <FormItem v-if="row.mode === 'input'" type="input" v-model="row.value"> </FormItem>
              <span v-else>录入时从地址栏自动获取</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="100">
            <template #default="{ row, $index }">
              <el-button size="mini" type="text" @click="value.splice($index, 1)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="add-btn">
          <el-button icon="el-icon-plus" size="mini" @click="value.push(valueItem)">添加</el-button>
        </div>
        <div style="text-align: right">
          <el-button size="mini" @click="visible = false">取消</el-button>
          <el-button size="mini" type="primary" @click="visible = false">确定</el-button>
        </div>
      </Form>
    </el-dialog>
  </div>
</template>

<script>
import { Form, FormItem } from '../form'
import { requestParamModeTypes, requestParamItem } from '../../utils/formConfig'
export default {
  components: { Form, FormItem },
  props: {
    value: { type: Array, default: () => [] },
    title: {},
  },
  data() {
    return {
      visible: false,
      modeOptions: Object.values(requestParamModeTypes),
      valueItem: requestParamItem,
      urlParamNameOptions: [
        { value: 'accessToken', label: 'accessToken（认证令牌）' },
        { value: 'token', label: 'token（认证令牌）' },
        { value: 'mobile', label: 'mobile（手机号）' },
        { value: 'username', label: 'username（用户名）' },
        { value: 'projectId', label: 'projectId（项目id）' },
        { value: 'projectName', label: 'projectName（项目名）' },
        { value: 'projectCode', label: 'projectCode（项目编号）' },
      ],
    }
  },
}
</script>

<style scoped>
.dimple-lowcode-filed-editor .table {
  border: 1px solid #ebeef5;
  border-bottom: none;
  margin-bottom: 20px;
}
</style>

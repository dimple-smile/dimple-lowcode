<template>
  <div>
    <!-- <FormItem v-if="!value.hideFiledName" label="字段名">{{value.filedName}}</FormItem> -->
    <FormItem label="数据类型" v-model="value.valueType" type="select" :options="valueTypeOptions"> </FormItem>
    <FormItem label="必填" v-model="value.formItemDefaultProps.required" type="switch"> </FormItem>
    <FormItem label="必填校验提示" v-model="value.config.validate.requiredValidateMsg" type="input"> </FormItem>
    <FormItem label="min" v-model="value.config.validate.min" type="number" tip="最小长度或最小值"> </FormItem>
    <FormItem label="min校验提示" v-model="value.config.validate.minValidateMsg" type="input"> </FormItem>
    <FormItem label="max" v-model="value.config.validate.max" type="number" tip="最大长度或最大值"> </FormItem>
    <FormItem label="max校验提示" v-model="value.config.validate.maxValidateMsg" type="input"> </FormItem>

    <FormItem label="校验规则">
      <el-button size="mini" style="width: 100%" icon="el-icon-edit" @click="rulesEditorDialogVisible = true">{{ value.config.validate.rules.length }}条校验规则</el-button>
    </FormItem>
    <FormItem label="禁用校验" v-model="value.config.validate.disabled" type="switch"> </FormItem>

    <el-dialog append-to-body :close-on-click-modal="false" :title="`校验规则列表(共${value.config.validate.rules.length}条)`" :visible.sync="rulesEditorDialogVisible">
      <Form class="rules-editor" :label-length="0" margin-bottom="0">
        <el-table class="table" size="mini" :data="value.config.validate.rules" :max-height="350">
          <el-table-column label="校验规则">
            <template #default="{ row }">
              <FormItem type="select" v-model="row.key" :options="validateRules"></FormItem>
            </template>
          </el-table-column>
          <el-table-column label="代表实值">
            <template #default="{ row }">
              <FormItem tip="校验提示文本前会自动加上当前标签">
                <el-autocomplete style="width: 100%" v-model="row.validateMsg" size="mini" :fetch-suggestions="querySearch" clearable>
                  <template #default="{ item }">
                    <span>{{ item.value }}</span>
                  </template>
                </el-autocomplete>
              </FormItem>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template #default="{ row, $index }">
              <el-button size="mini" type="text" @click="value.config.validate.rules.splice($index, 1)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="add-btn">
          <el-button icon="el-icon-plus" size="mini" @click="addValidateRule">添加</el-button>
        </div>
      </Form>

      <div style="text-align: right">
        <el-button size="mini" @click="rulesEditorDialogVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="rulesEditorDialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Form, FormItem } from '../form'
import { valueTypes } from '../../utils/valueTypes'
import { validateRegExps } from '../../utils/validateRegExps'

export default {
  components: { Form, FormItem },
  props: {
    value: {},
    materials: {},
  },
  data() {
    return {
      rulesEditorDialogVisible: false,
      validateModeOptions: [{ label: '与模式（全部规则满足）', value: 'and' }, { label: '或模式（任一规则满足）' }],
    }
  },
  computed: {
    valueTypeOptions() {
      return Object.values(valueTypes)
    },
    validateRules() {
      return Object.values(validateRegExps)
    },
  },
  methods: {
    validateRuleChange(key) {
      const item = this.validateRules.find((item) => item.value === key)
    },
    addValidateRule() {
      this.value.config.validate.rules.push({ key: '', validateMsg: '' })
    },
    querySearch(queryString, cb) {
      const options = (this.validateRules || []).map((item) => ({ value: `必须是${item.label}格式` }))
      const text = queryString.toLowerCase()
      const results = queryString
        ? options.filter((item) => {
            const value = item.value.toLowerCase()
            return value.indexOf(text) > -1
          })
        : options
      cb(results)
    },
  },
}
</script>

<style scoped>
.rules-editor .table {
  border: 1px solid #ebeef5;
  border-bottom: none;
  margin-bottom: 20px;
}
</style>

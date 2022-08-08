<template>
  <div>
    <FormItem label="字段名" type="input" v-model="value.filedName"></FormItem>
    <FormItem label="数据类型" v-model="value.valueType" type="select" :options="valueTypeOptions"> </FormItem>
    <FormItem label="必填" v-model="value.formItemDefaultProps.required" type="switch"> </FormItem>
    <FormItem label="必填校验提示" v-model="value.config.validate.requiredValidateMsg" type="input"> </FormItem>
    <FormItem label="min" v-model="value.config.validate.min" type="number" :min="0" tip="最小长度或最小值"> </FormItem>
    <FormItem label="min校验提示" v-model="value.config.validate.minValidateMsg" type="input"> </FormItem>
    <FormItem label="max" v-model="value.config.validate.max" type="number" :min="0" tip="最大长度或最大值"> </FormItem>
    <FormItem label="max校验提示" v-model="value.config.validate.maxValidateMsg" type="input"> </FormItem>

    <FormItem label="校验规则">
      <el-button size="mini" style="width: 100%" icon="el-icon-edit" @click="rulesEditorDialogVisible = true">{{ value.config.validate.rules.length }}条校验规则</el-button>
    </FormItem>
    <FormItem label="禁用校验" v-model="value.config.validate.disabled" type="switch"> </FormItem>

    <el-dialog :title="`校验规则列表(共${value.config.validate.rules.length}条)`" :visible.sync="rulesEditorDialogVisible">
      <Form margin-bottom="0" label-length="6">
        <FormItem v-if="value.config.validate.rules.length" label="校验模式" v-model="value.config.validate.mode" type="select" :options="validateModeOptions" margin-bottom="20px" />
        <div class="rules-editor">
          <div class="no-data" v-if="!value.config.validate.rules.length">暂无校验规则</div>
          <template v-for="(item, index) in value.config.validate.rules">
            <div class="rules-editor-item">
              <FormItem class="rules-editor-item-type" label="校验规则" type="select" v-model="item.key" :options="validateRules"></FormItem>
              <FormItem class="rules-editor-item-input" label="校验提示" tip="校验提示文本前会自动加上当前标签">
                <el-autocomplete style="width: 100%" v-model="item.validateMsg" size="mini" :fetch-suggestions="querySearch" clearable>
                  <template #default="{ item }">
                    <span>{{ item.value }}</span>
                  </template>
                </el-autocomplete>
              </FormItem>
              <el-button icon="el-icon-delete" circle size="mini" type="danger" @click="value.config.validate.rules.splice(index, 1)"></el-button>
            </div>
          </template>
        </div>
        <div class="rules-editor-add-btn">
          <el-button icon="el-icon-plus" circle size="mini" type="primary" @click="addValidateRule"></el-button>
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
.rules-editor {
  max-height: 50vh;
  overflow: overlay;
}

.rules-editor-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.rules-editor-item-type {
  width: 30%;
  margin-right: 5px;
}

.rules-editor-item-input {
  flex: 1;
  margin-right: 5px;
}

.rules-editor-add-btn {
  text-align: center;
  margin-top: 10px;
}

.no-data {
  text-align: center;
  padding: 10px;
}
</style>

<template>
  <div class="dimple-lowcode-configs">
    <Form v-if="value" label-length="7">
      <el-tabs v-if="value" v-model="activeTab" stretch>
        <!-- 表达基本配置 -->
        <el-tab-pane v-if="propsConfig.show" :label="propsConfig.name" :name="propsConfig.key">
          <div class="config-item">
            <FormItem v-if="propsConfig.nameConfig.show" :label="propsConfig.nameConfig.name">{{ value.name }}</FormItem>
            <FormItem v-if="propsConfig.labelConfig.show" v-model="value.props[propsConfig.labelConfig.propsKey]" :label="propsConfig.labelConfig.name" type="input"></FormItem>

            <template v-if="propsConfig.optionsEditorConfig.show">
              <FormItem
                v-if="propsConfig.valueConfig.show"
                v-model="value.props[propsConfig.valueConfig.propsKey]"
                :label="propsConfig.valueConfig.name"
                :type="value.props[propsConfig.valueConfig.typePropsKey]"
                :options="value.props[propsConfig.optionsEditorConfig.propsKey]"
              ></FormItem>
            </template>
            <template v-else>
              <FormItem
                v-if="propsConfig.valueConfig.show"
                v-model="value.props[propsConfig.valueConfig.propsKey]"
                :label="propsConfig.valueConfig.name"
                :type="value.props[propsConfig.valueConfig.typePropsKey]"
              ></FormItem>
            </template>

            <template v-if="propsConfig.optionsEditorConfig.show">
              <FormItem :label="propsConfig.optionsEditorConfig.name" alignItems="flex-start">
                <div class="options-editor">
                  <template v-for="(item, index) in value.props[propsConfig.optionsEditorConfig.propsKey]">
                    <div class="options-editor-item">
                      value:
                      <el-input class="options-editor-item-input" v-model="item.value" size="mini"></el-input>
                      label:
                      <el-input class="options-editor-item-input" v-model="item.label" size="mini"></el-input>
                      <el-button icon="el-icon-delete" circle size="mini" type="danger" @click="value.props[propsConfig.optionsEditorConfig.propsKey].splice(index, 1)"></el-button>
                    </div>
                  </template>
                </div>
                <div style="text-align: center">
                  <el-button icon="el-icon-plus" circle size="mini" type="primary" @click="value.props[propsConfig.optionsEditorConfig.propsKey].push({ label: '', value: '' })"></el-button>
                </div>
              </FormItem>
            </template>
          </div>
        </el-tab-pane>

        <!-- 数据校验配置 -->
        <el-tab-pane v-if="validateConfig.show" :label="validateConfig.name" :name="validateConfig.key">
          <div class="config-item">
            <FormItem label="必填" v-model="value.props[validateConfig.requiredPropsKey]" type="switch"> </FormItem>
            <FormItem label="必填校验提示" v-model="validateConfig.requiredValidateMsg" type="input"> </FormItem>
            <FormItem label="最小长度" v-model="validateConfig.minLength" type="number" :min="0"> </FormItem>
            <FormItem label="最小长度校验提示" v-model="validateConfig.minLengthValidateMsg" type="input"> </FormItem>
            <FormItem label="最大长度" v-model="validateConfig.maxLength" type="number" :min="0"> </FormItem>
            <FormItem label="最大长度校验提示" v-model="validateConfig.maxLengthValidateMsg" type="input"> </FormItem>

            <FormItem label="校验模式" v-model="validateConfig.validateType" type="select" :options="[{ label: '与模式（全部规则满足）', value: 'and' }, { label: '或模式（任一规则满足）' }]">
            </FormItem>
            <FormItem label="校验规则" alignItems="flex-start">
              <template v-for="(item, index) in validateConfig.rules">
                <div class="validate-rule-item">
                  <div>
                    <div>校验规则：{{ item.label }}</div>
                    <div class="">校验提示：{{ item.validateMsg }}</div>
                  </div>
                  <div style="width: 10px"></div>
                  <el-button icon="el-icon-delete" circle size="mini" type="danger" @click="removeValidateRule(index)"></el-button>
                </div>
              </template>
              <el-popover placement="top" width="300" v-model="validateRulePopovervisible">
                <div>
                  <FormItem label="校验规则" v-model="validateReadyRule.ruleType" type="select" :options="validateRules" @change="validateRuleChange"> </FormItem>
                  <FormItem label="校验失败提示" v-model="validateReadyRule.validateMsg" type="input"> </FormItem>
                  <FormItem margin-bottom="0">
                    <el-button size="mini" type="text" @click="validateRulePopovervisible = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="addValidateRule">确定</el-button>
                  </FormItem>
                </div>
                <template #reference>
                  <el-button size="mini" style="width: 100%" icon="el-icon-plus">添加</el-button>
                </template>
              </el-popover>
            </FormItem>
          </div>
        </el-tab-pane>

        <!-- 数据收集配置 -->
        <el-tab-pane v-if="filterConfig.show" :label="filterConfig.name" :name="filterConfig.key">
          <div class="config-item">
            <FormItem label="需要搜索" v-model="filterConfig.needFilter" type="switch"> </FormItem>
            <FormItem label="搜索方式" v-model="filterConfig.filterType" type="select" :options="filterOptions"> </FormItem>
          </div>
        </el-tab-pane>
      </el-tabs>
    </Form>

    <div v-else class="no-data">请选择一个组件进行编辑</div>
  </div>
</template>

<script>
import { Form, FormItem } from '../form'
import { Render } from '../render'
export default {
  components: { Form, FormItem, Render },
  props: {
    value: { type: Object, default: () => null },
  },
  data() {
    return {
      activeTab: 'props',
      propsConfig: {},
      validateConfig: {},
      filterConfig: {},
      validateRulePopovervisible: false,
      validateReadyRule: { ruleType: '', validateMsg: '' },
    }
  },
  watch: {
    value: {
      handler: function (value) {
        if (!value) return
        this.propsConfig = this.getPropsConfig(value)
        this.validateConfig = this.getValidateConfig(value)
        this.filterConfig = this.getFilterConfig(value)
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    validateRules() {
      let res = [
        {
          label: '纯数字',
          regExp: /^[0-9]*$/,
        },
        {
          label: '纯字母',
          regExp: /^[A-Za-z]+$/,
        },
        {
          label: '纯汉字',
          regExp: /^[\u4e00-\u9fa5]{0,}$/,
        },
        {
          label: '数字英文',
          regExp: /^[A-Za-z0-9]+$/,
        },
        {
          label: '手机号码',
          regExp: /^\d{11}$/,
        },
        {
          label: '邮箱',
          regExp: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        },
        {
          label: '车牌号',
          regExp: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
        },
        {
          label: '网址',
          regExp: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
        },
      ]

      res = res.map((item, index) => {
        return { ...item, value: index, validateMsg: `必须是${item.label}格式` }
      })

      return res
    },
    filterOptions() {
      let res = [
        {
          label: '按文本模糊搜索',
          value: 'text',
        },
        {
          label: '按文本准确搜索',
          value: 'strict-text',
        },
        {
          label: '按日期格式搜索',
          value: 'date',
        },
        {
          label: '按日期范围格式搜索',
          value: 'daterange',
        },
        {
          label: '按手机号格式搜索',
          value: 'mobile',
        },
        {
          label: '按选项搜索',
          value: 'select',
        },
      ]
      return res
    },
  },
  methods: {
    emitValidateConfig() {
      const value = this.value
      if (!value.config) value.config = {}
      value.config.validateConfig = this.validateConfig
      this.$emit('input', value)
    },
    getPropsConfig(value) {
      let propsConfig = (value && value.config && value.config.propsConfig) || {}
      if (propsConfig.show === false) return { show: false, key: 'props' }
      let { show = true, key = 'props', name = '组件配置', nameConfig = {}, labelConfig = {}, valueConfig = {}, optionsEditorConfig = {} } = propsConfig

      if (nameConfig.show === undefined) nameConfig.show = true
      if (nameConfig.name === undefined) nameConfig.name = '组件名称'

      if (labelConfig.show === undefined) labelConfig.show = true
      if (labelConfig.name === undefined) labelConfig.name = '表单文本'
      if (labelConfig.propsKey === undefined) labelConfig.propsKey = 'label'

      if (valueConfig.show === undefined) valueConfig.show = true
      if (valueConfig.name === undefined) valueConfig.name = '表单值'
      if (valueConfig.propsKey === undefined) valueConfig.propsKey = 'value'
      if (valueConfig.typePropsKey === undefined) valueConfig.typePropsKey = 'type'

      if (optionsEditorConfig.show === undefined) optionsEditorConfig.show = false
      if (optionsEditorConfig.name === undefined) optionsEditorConfig.name = '选项配置'
      if (optionsEditorConfig.propsKey === undefined) optionsEditorConfig.propsKey = 'options'
      return { show, key, name, nameConfig, labelConfig, valueConfig, optionsEditorConfig }
    },
    getValidateConfig(value) {
      let validateConfig = (value && value.config && value.config.validateConfig) || {}
      if (validateConfig.show === false) return { show: false }
      let {
        show = true,
        key = 'validate',
        name = '数据校验配置',
        requiredPropsKey = 'required',
        requiredValidateMsg = value.name + '必填',
        minLength = '',
        maxLength = '',
        rules = [],
        validateType = 'and',
      } = validateConfig
      return { show, key, name, requiredPropsKey, requiredValidateMsg, minLength, maxLength, rules, validateType }
    },

    getFilterConfig(value) {
      let filterConfig = (value && value.config && value.config.filterConfig) || {}
      if (filterConfig.show === false) return { show: false }
      let { show = true, key = 'filter', name = '数据收集配置', needFilter = false, filterType = 'text' } = filterConfig
      return { show, key, name, needFilter, filterType }
    },
    validateRuleChange(key) {
      const item = this.validateRules.find((item) => item.value === key)
      this.validateReadyRule = { label: item.label, validateMsg: item.validateMsg, regExp: item.regExp }
    },
    addValidateRule() {
      this.validateConfig.rules.push(this.validateReadyRule)
      this.validateRulePopovervisible = false
      this.$set(this, 'validateReadyRule', { ruleType: '', validateMsg: '' })

      this.emitValidateConfig()
    },
    removeValidateRule(index) {
      this.validateConfig.rules.splice(index, 1)
      this.emitValidateConfig()
    },
  },
}
</script>

<style scoped>
.dimple-lowcode-configs {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.no-data {
  padding: 20px;
  text-align: center;
  color: #909399;
  font-size: 13px;
}

.config-item {
  padding: 0px 20px;
}

.options-editor {
  max-height: 50vh;
  overflow: auto;
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

.vilidate {
}
.vilidate-item {
  margin-bottom: 10px;
}
.validate-rule-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 4px;
  padding: 10px;
  font-size: 13px;
  color: #606266;
}

.flex {
  display: flex;
  align-items: center;
}
.flex-1 {
  flex: 1;
}
</style>

<style>
.dimple-lowcode-configs .el-tabs {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
</style>

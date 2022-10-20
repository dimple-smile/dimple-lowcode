<template>
  <div class="dimple-lowcode-form-conatiner">
    <Form v-bind="formConfig.formProps" style="height: 100%; width: 100%">
      <DimpleLowcodeLayout
        ref="dimpleLayout"
        v-model="layout"
        :current-component.sync="currentComponent"
        :preview="isPreview"
        :component-list="(currentMaterial && currentMaterial.components) || []"
        aside-class="dimple-lowcode-form-aside"
        :container-style="formConfig.style"
        component-list-class="dimple-lowcode-form-component-list"
        component-item-class="dimple-lowcode-form-component-item-cotainer"
        :column-width="$attrs.columnWidth !== undefined ? $attrs.columnWidth : formConfig.columnWidth"
        :dragDataAdapter="dragDataAdapter"
        :isColumn="formConfig.isColumn"
        v-bind="$attrs"
        v-on="$listeners"
      >
        <template #header>
          <slot name="header"></slot>
          <Form v-if="!$slots.header" class="header" margin-bottom="0">
            <slot name="logo">
              <div class="logo">DIMPLE表单设计器</div>
            </slot>
            <slot name="header-content">
              <div class="header-content">
                <div class="header-content-item">
                  <FormItem
                    style="flex: 1"
                    label="布局模式"
                    type="select"
                    v-model="formConfig.columnWidth"
                    :options="[
                      { label: '单列布局（移动端）', value: '100%' },
                      { label: '双列布局', value: '50%' },
                      { label: '四列布局', value: '25%' },
                    ]"
                  ></FormItem>
                </div>
              </div>
            </slot>
            <slot name="header-append">
              <el-button class="header-append" size="mini" @click="drawer = true">表单配置</el-button>
            </slot>
          </Form>
        </template>

        <template #component-header>
          <Tabs v-model="currentMaterial" :options="innerMaterials" />
          <div v-if="currentMaterial" style="border-right: 1px solid #ddd">
            <TitleDividev>
              组件列表
              <el-tooltip v-if="currentMaterial && currentMaterial.tip" effect="dark" :content="currentMaterial.tip" placement="top">
                <i class="el-icon-warning" style="color: #aaa"></i>
              </el-tooltip>
            </TitleDividev>
          </div>
        </template>

        <template #component-list="{ data }">
          <div v-for="item in data" class="dimple-lowcode-form-component-item-cotainer" :key="item.key">
            <div class="component-item dimple-lowcode-form-component-item">
              {{ item.name }}
            </div>
          </div>
        </template>

        <template #component-item="{ data }">
          <div :key="data.key" class="dimple-lowcode-form-component-item">
            {{ data.name }}
          </div>
        </template>

        <template #render-item="{ data, index }">
          <Render v-if="isPreview ? !data.config.hidden : true" :type="data.renderType || renderType" :value="data" :materials="innerMaterials" :is-last="index === layout.length - 1" />
        </template>

        <template #render-item-custom="{ data, index }">
          <slot name="render-item-custom" :data="data" :index="index"></slot>
        </template>

        <template #render-item-mask="{ data, index }">
          <slot name="render-item-mask" :data="data" :index="index"></slot>
        </template>

        <template #render-footer>
          <FormItem v-if="!formConfig.isMoibileButtons && layout.length && formConfig.buttons.length">
            <template v-for="item in formConfig.buttons">
              <el-button :type="item.btnType" size="mini" @click="onOprateClick(item)">{{ item.text }}</el-button>
            </template>
          </FormItem>
        </template>

        <template #render-container-footer v-if="formConfig.isMoibileButtons && layout.length && formConfig.buttons.length">
          <div style="height: 10px; width: 100%; background: #eeeeee"></div>
          <div class="mobile-buttons">
            <template v-for="(item, index) in formConfig.buttons">
              <el-button :key="index + 'button'" class="mobile-buttons-item" :class="[item.btnType]" :type="item.btnType" size="mini" @click="onOprateClick(item)">{{ item.text }}</el-button>
              <div v-if="index !== formConfig.buttons.length - 1" :key="index + 'button-padding'" style="width: 10px"></div>
            </template>
          </div>
          <div class="safearea"></div>
        </template>

        <template #panel>
          <slot name="panel">
            <div class="options" v-dimple-overlay>
              <ComponentConfigs v-model="currentComponent" :materials="innerMaterials" />
            </div>
          </slot>
        </template>

        <template #footer>
          <slot name="footer">
            <div class="footer">
              <el-button type="primary" size="mini" :type="formConfig.save.btnType" @click="save">{{ formConfig.save.text }}</el-button>
              <el-button size="mini" @click="toPreview">预览</el-button>
            </div>
          </slot>
        </template>
      </DimpleLowcodeLayout>
    </Form>

    <el-drawer title="表单配置" :visible.sync="drawer">
      <FormConfigs v-model="formConfig" />
    </el-drawer>
  </div>
</template>

<script>
import { Loading, Message } from 'element-ui'

import { DimpleLowcodeLayout } from '../../dimple-lowcode-layout'
import { Tabs } from './components/tabs'
import { TitleDividev } from './components/title-divider'
import { ComponentConfigs } from './components/component-configs'
import { FormConfigs } from './components/form-configs'
import { Render } from './components/render'
import { Form, FormItem } from './components/form'
import { systemMaterials } from './materials/system'
import { formConfig } from './utils/formConfig'
import { getQueryByKey } from './utils/getQueryByKey'
import { is } from './utils/is'
import { validate } from './utils/validate'
import { mergeUrl } from './utils/url'
import { overlay } from '../../overlay/'

import axios from 'axios'
import merge from 'lodash/merge'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'

import defaultComponentConfig from './utils/componentConfig'
const ajax = axios.create()

const customMessage = (type, message) => {
  return Message({
    type,
    message,
    // duration: 0,
    // dangerouslyUseHTMLString: true,
    // message: `<span style="color: red">${message}</span>`,
    customClass: 'dimple-lowcode-form-message',
  })
}
const _message = {
  success: (m) => customMessage('success', m),
  warning: (m) => customMessage('warning', m),
  error: (m) => customMessage('error', m),
}

export default {
  name: 'DimpleLowcodeForm',
  components: {
    DimpleLowcodeLayout,
    Tabs,
    TitleDividev,
    ComponentConfigs,
    FormConfigs,
    Render,
    Form,
    FormItem,
  },
  props: {
    value: { type: Array, default: () => [] },
    systemMaterials: { type: Array, default: () => systemMaterials() },
    materials: { type: Array, default: () => [] },
    config: { type: Object, default: () => {} },
    data: { type: Array, default: () => [] },
    preview: { type: Boolean, default: null },
    saveRequestConfig: { type: Function, default: null },
    btnRequestConfig: { type: Function, default: null },
    saveHandler: { type: Function, default: null },
    btnHandler: { type: Function, default: null },
    renderType: { type: String, default: 'form-item' },
  },
  data() {
    return {
      currentMaterial: null,
      layout: [],
      formConfig: formConfig(),
      currentComponent: null,
      drawer: false,
      innerPreview: false,
    }
  },
  directives: {
    'dimple-overlay': overlay,
  },
  computed: {
    isPreview() {
      if (this.preview === true) return true
      if (this.preview === false) return false
      return this.innerPreview
    },
    innerMaterials() {
      return [...this.systemMaterials, ...this.materials]
    },
  },
  watch: {
    data: {
      handler: function (value) {
        this.setLayout(value)
      },
      deep: true,
      immediate: true,
    },
    value: {
      handler: function (value) {
        if (isEqual(this.value, this.layout)) return
        this.setLayout(value)
      },
      deep: true,
      immediate: true,
    },
    layout: {
      handler: function (value) {
        if (isEqual(this.value, this.layout)) return
        this.$emit('input', value)
      },
      deep: true,
      immediate: true,
    },
    config: {
      handler: function (value) {
        if (isEqual(value, this.formConfig)) return
        this.$set(this, 'formConfig', merge(cloneDeep(this.formConfig), value))
      },
      deep: true,
      immediate: true,
    },
    formConfig: {
      handler: function (value) {
        if (isEqual(value, this.config)) return
        this.$emit('update:config', value)
      },
      deep: true,
    },
  },
  methods: {
    dragDataAdapter(data) {
      let res = merge(defaultComponentConfig(), data)
      res.formItemDefaultProps.label = data.name
      return res
    },
    removeItem(item) {
      const index = this.layout.findIndex((v) => v.i === item.i)
      if (index < 0) return
      this.layout.splice(index, 1)
    },
    componentItemClickHandle(item) {
      if (this.currentComponent && this.currentComponent.i === item.i) return (this.currentComponent = null)
      this.currentComponent = item
    },
    toPreview() {
      this.innerPreview = true
      this.$emit('update:preview', true)
      _message.success('按下ESC键可以退出预览')
      this.setDefaultValue(this.layout)
    },
    async save() {
      if (this.saveHandler) return this.saveHandler({ layout: this.layout, config: this.formConfig })
      let api = ''
      const headers = {}
      const body = {}
      let successMsg = ''
      let errorMsg = ''
      const formConfig = this.formConfig
      if (!formConfig.name) return _message.error('表单名称必填')
      try {
        const config = this.formConfig.save
        api = config.api
        successMsg = config.successMsg
        errorMsg = config.errorMsg
        if (!is.http(api)) return _message.warning('保存的接口地址不符合网络接口格式，无法发起保存操作')
        for (const item of config.headers) {
          headers[item.name] = item.mode === 'urlParam' ? getQueryByKey(item.name) : item.value
        }
        for (const item of config.body) {
          body[item.name] = item.mode === 'urlParam' ? getQueryByKey(item.name) : item.value
        }

        body.data = this.layout
        body.config = this.formConfig
      } catch (error) {
        console.error('保存配置填写错误', error)
        return _message.error('保存配置填写错误')
      }
      const loadingInstance = Loading.service({ fullscreen: true })
      let req = { url: api, method: 'post', headers, data: body }
      try {
        if (this.saveRequestConfig) req = await this.saveRequestConfig(req)
        if (typeof req !== 'object') return loadingInstance.close()
      } catch (error) {
        console.error('自定义保存配置填写错误', error)
        return _message.error('保存配置填写错误')
      }
      ajax(req)
        .then((res) => {
          if(successMsg) _message.success(successMsg || '保存成功')
          this.$emit('afterSave', res, { _message, config: this.formConfig.save })
        })
        .catch((err) => {
          if(err) _message.error(errorMsg || '保存失败')
          this.$emit('afterSaveError', err, { _message, config: this.formConfig.save })
        })
        .finally(() => {
          loadingInstance.close()
        })
    },

    async onOprateClick(config) {
      if (!this.isPreview) return
      if (this.btnHandler) return this.btnHandler({ layout: this.layout, config: this.formConfig, btnConfig: config })
      let operateType = ''
      let api = ''
      const headers = {}
      const body = {}
      let successMsg = ''
      let errorMsg = ''
      let link = ''
      let isLink = false
      let isRequest = false
      const formData = {}
      try {
        operateType = config.operateType
        link = config.link
        api = config.api
        successMsg = config.successMsg
        errorMsg = config.errorMsg
        isLink = operateType === 'link'
        isRequest = operateType === 'request'
        body.id = this.formConfig.id
        if (isLink) {
          if (!is.http(link)) return _message.warning('跳转地址不符合网络地址格式，无法执行跳转操作')
          window.location.href = mergeUrl(link, window.location.href)
          return
        }
        if (isRequest && !is.http(api)) return _message.warning('请求的接口地址不符合网络接口格式，无法发起网络请求操作')
        for (const item of config.headers) {
          headers[item.name] = item.mode === 'urlParam' ? getQueryByKey(item.name) : item.value
        }
        for (const item of config.body) {
          body[item.name] = item.mode === 'urlParam' ? getQueryByKey(item.name) : item.value
        }
        let validateMsg = ''
        for (const item of this.layout) {
          if (!item.config.validate.disabled) {
            if (item.formItemDefaultProps.required) {
              if (!validate.required(item.value, item.valueType)) validateMsg = item.config.validate.requiredValidateMsg || '必填'
            }
            if (!validate.min(item.value, item.config.validate.min, item.valueType)) validateMsg = item.config.validate.minValidateMsg
            if (!validate.max(item.value, item.config.validate.max, item.valueType)) validateMsg = item.config.validate.maxValidateMsg

            // 校验自定义添加的规则
            let validateRuleMsg = ''
            let validateRuleResults = []

            for (const ruleitem of item.config.validate.rules) {
              validateRuleResults.push({
                validateMsg: ruleitem.validateMsg,
                result: validate.regExp(item.value, ruleitem.key),
              })
            }
            if (validateRuleResults.length > 0) {
              const validateSuccessItem = validateRuleResults.find((o) => !!o.result)
              const validateFailItem = validateRuleResults.find((o) => !o.result)
              if (item.config.validate.mode === 'or') {
                if (!validateSuccessItem) validateRuleMsg = validateFailItem.validateMsg
              }
              if (item.config.validate.mode === 'and') {
                if (validateFailItem) validateRuleMsg = validateFailItem.validateMsg
              }
            }

            if (!validateMsg) validateMsg = validateRuleMsg

            if (validateMsg) {
              validateMsg = item.formItemDefaultProps.label + validateMsg
              break
            }
          }
          formData[item.filedName] = item.value
        }
        if (validateMsg) return _message.error(validateMsg)
        body[config.formDataFiledName || 'form'] = formData
      } catch (error) {
        console.error('按钮配置填写错误', error)
        return _message.error('按钮配置填写错误')
      }

      if (isRequest) {
        const loadingInstance = Loading.service({ fullscreen: true })

        let req = { url: api, method: 'post', headers, data: body }
        try {
          if (this.btnRequestConfig) req = await this.btnRequestConfig(req, config)
          if (typeof req !== 'object') return loadingInstance.close()
        } catch (error) {
          console.error('自定义按钮配置填写错误', error)
          return _message.error('自定义按钮配置填写错误')
        }
        ajax(req)
          .then((res) => {
            if (successMsg) _message.success(successMsg || '发送成功')
            this.$emit('afterBtnRequest', res, { _message, config })
          })
          .catch((err) => {
            if (errorMsg) _message.error(errorMsg || '发送失败')
            this.$emit('afterBtnRequestError', err, { _message, config })
          })
          .finally(() => {
            loadingInstance.close()
          })
      }
    },
    setLayout(data) {
      let layout = cloneDeep(data || [])
      this.setDefaultValue(layout)
      // this.$set(this, 'layout', layout)
    },
    setDefaultValue(layout) {
      for (const item of layout) {
        if (item?.config?.base?.defaultValue?.inputMode === 'urlParam') {
          let urlParamValue = getQueryByKey(item?.config?.base?.defaultValue?.urlParamName)
          if (urlParamValue === undefined || urlParamValue === null || urlParamValue === 'null') urlParamValue = ''
          item.value = urlParamValue
        }
      }
      this.$set(this, 'layout', layout)
    },
  },
  mounted() {
    this.escHandle = (e) => {
      const isEsc = e.keyCode === 27
      if (!isEsc) return
      this.innerPreview = false
      this.$emit('update:preview', false)
    }
    document.addEventListener('keydown', this.escHandle, false)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.escHandle, false)
  },
}
</script>

<style scoped>
.dimple-lowcode-form-conatiner {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.header {
  background: #fff;
  border: 1px solid #dddddd;
  border-top: none;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}

.header .logo {
  font-weight: 500;
  padding-left: 18px;
  margin-right: 20px;
}

.header-content {
  height: 69px;
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.header-content-item {
  width: 220px;
}

.header-append {
  margin-left: 18px;
  margin-right: 18px;
}

.footer {
  height: 69px;
  padding: 0 18px;
  background: #fff;
  border: 1px solid #dddddd;
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.material {
  width: 24vw;
  height: 100%;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.options {
  width: 24vw;
  height: 100%;
  overflow: auto;
  background: #fff;
  /* border-left: 1px solid #ddd;
  border-right: 1px solid #ddd; */
}

.mobile-buttons {
  padding: 10PX 16PX !important;
  display: flex;
}
.mobile-buttons-item {
  flex: 1;
  height: 44PX !important;
  line-height: 44PX !important;
  padding-top: 0;
  padding-bottom: 0;
  border-radius: 4PX !important;
  font-size: 17PX !important;
}

.mobile-buttons-item.primary {
  background: #006df1;
}

.mobile-buttons-item.secondary {
  border: 1px solid #006df1;
  color: #006df1;
}

.safearea {
  height: 0px; /* 兼容 iOS < 11.2 */
  height: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  height: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
  background: #fff;
}
</style>

<style>
.dimple-lowcode-form-aside {
  width: 24vw;
}

.dimple-lowcode-form-component-list {
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-top: none;
  border-bottom: none;

  display: flex;
  flex-wrap: wrap;
  padding-left: 20px;
  height: 100%;
  align-content: flex-start;
  justify-content: space-between;
  padding-right: 4px;
}

.dimple-lowcode-form-component-item-cotainer {
  width: 50%;
  margin-bottom: 20px;
  padding-right: 16px;

  box-sizing: border-box;
}

.dimple-lowcode-form-component-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #333333;
  font-size: 14px;
  text-align: center;
  background: #ffffff;
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  transition: all 0.3s;
  cursor: move;
}

.dimple-lowcode-form-component-item:hover {
  box-shadow: 0 6px 16px 0 rgb(0 0 0 / 15%);
}
</style>

<style>
.dimple-lowcode-form-message {
  min-width: 300PX !important;
  border-radius: 4PX !important;
  top: 20PX !important;
  padding: 15PX 15PX 15PX 20PX !important;
}

.dimple-lowcode-form-message.is-closable .el-message__content {
  padding-right: 16PX !important;
}

.dimple-lowcode-form-message .el-message__icon {
  margin-right: 10PX !important;
}

.dimple-lowcode-form-message .el-message__content {
  font-size: 14PX !important;
}

.dimple-lowcode-form-message .el-message__closeBtn {
  right: 15PX !important;
  font-size: 16PX !important;
}

.dimple-lowcode-form-message .el-message__icon {
  font-size: 16PX !important;
}
</style>

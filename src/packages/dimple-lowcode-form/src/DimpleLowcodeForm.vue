<template>
  <div class="dimple-lowcode-form-conatiner">
    <Form v-bind="formConfig.formProps" style="height: 100%">
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
        :column-width="formConfig.columnWidth"
        :dragDataAdapter="dragDataAdapter"
      >
        <template #header>
          <Form class="header" margin-bottom="0">
            <slot name="logo">
              <div class="title">DIMPLE表单设计器</div>
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
              <el-button size="mini" @click="drawer = true">表单配置</el-button>
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

        <template #render-item="{ data }">
          <Render :value="data" :materials="innerMaterials" />
        </template>

        <template #render-footer>
          <FormItem v-if="layout.length">
            <template v-for="item in formConfig.buttons">
              <el-button :type="item.btnType" size="mini" @click="btnHandle(item)">{{ item.text }}</el-button>
            </template>
          </FormItem>
        </template>

        <template #panel>
          <slot name="panel">
            <div class="options">
              <ComponentConfigs v-model="currentComponent" :materials="innerMaterials" />
            </div>
          </slot>
        </template>

        <template #footer>
          <div class="footer">
            <el-button type="primary" size="mini" :type="formConfig.save.btnType" @click="save">{{ formConfig.save.text }}</el-button>
            <el-button size="mini" @click="toPreview">预览</el-button>
          </div>
        </template>
      </DimpleLowcodeLayout>
    </Form>

    <el-drawer title="表单配置" :visible.sync="drawer">
      <FormConfigs v-model="formConfig" />
    </el-drawer>
  </div>
</template>

<script>
import { ElComponents, Loading, Message } from './components/element-ui'

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
import axios from 'axios'
import merge from 'lodash/merge'
import isEqual from 'lodash/isEqual'
import cloneDeep from 'lodash/cloneDeep'

import defaultComponentConfig from './utils/componentConfig'
const ajax = axios.create()

export default {
  name: 'DimpleLowcodeForm',
  components: {
    ...ElComponents,
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
    systemMaterials: { type: Array, default: () => systemMaterials() },
    materials: { type: Array, default: () => [] },
    config: { type: Object, default: () => {} },
    data: { type: Array, default: () => [] },
    preview: { type: Boolean, default: null },
    saveRequestConfig: { type: Function, default: null },
    btnRequestConfig: { type: Function, default: null },
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
  computed: {
    isPreview() {
      if (this.preview === true) return true
      if (this.preview === false) return false
      return this.innerPreview
    },
    innerMaterials() {
      return [...this.systemMaterials, this.materials]
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
    config: {
      handler: function (value) {
        if (isEqual(value, this.formConfig)) return
        this.formConfig = merge(cloneDeep(this.formConfig), value)
      },
      deep: true,
      immediate: true,
    },
    formConfig: {
      handler: function (value) {
        if (isEqual(value, this.formConfig)) return
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
      Message.success('按下ESC键可以退出预览')
    },
    async save() {
      let api = ''
      const headers = {}
      const body = {}
      let successMsg = ''
      let errorMsg = ''
      const formConfig = this.formConfig
      if (!formConfig.name) return Message.error('表单名称必填')
      try {
        const config = this.formConfig.save
        api = config.api
        successMsg = config.successMsg
        errorMsg = config.errorMsg
        if (!is.http(api)) return Message.warning('保存的接口地址不符合网络接口格式，无法发起保存操作')
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
        return Message.error('保存配置填写错误')
      }
      const loadingInstance = Loading.service({ fullscreen: true })
      let req = { url: api, method: 'post', headers, data: body }
      try {
        if (this.saveRequestConfig) req = await this.saveRequestConfig(req)
      } catch (error) {
        console.error('自定义保存配置填写错误', error)
        return Message.error('保存配置填写错误')
      }
      ajax(req)
        .then((res) => {
          Message.success(successMsg || '保存成功')
          this.$emit('afterSave', res)
        })
        .catch((err) => {
          Message.error(errorMsg || '保存失败')
          this.$emit('afterSaveError', err)
        })
        .finally(() => {
          loadingInstance.close()
        })
    },
    async btnHandle(config) {
      if (!this.isPreview) return
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
        if (isLink && !is.http(api)) return Message.warning('跳转地址不符合网络地址格式，无法执行跳转操作')
        if (isRequest && !is.http(api)) return Message.warning('请求的接口地址不符合网络接口格式，无法发起网络请求操作')
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
        if (validateMsg) return Message.error(validateMsg)
        body[config.formDataFiledName || 'form'] = formData
      } catch (error) {
        console.error('按钮配置填写错误', error)
        return Message.error('按钮配置填写错误')
      }
      if (isLink) return (window.location.href = link)

      if (isRequest) {
        const loadingInstance = Loading.service({ fullscreen: true })

        let req = { url: api, method: 'post', headers, data: body }
        try {
          if (this.btnRequestConfig) req = await this.btnRequestConfig(req, config)
        } catch (error) {
          console.error('自定义按钮配置填写错误', error)
          return Message.error('自定义按钮配置填写错误')
        }
        ajax(req)
          .then((res) => {
            Message.success(successMsg || '发送成功')
            this.$emit('afterBtnRequest', res)
          })
          .catch((err) => {
            Message.error(errorMsg || '发送失败')
            this.$emit('afterBtnRequestError', err)
          })
          .finally(() => {
            loadingInstance.close()
          })
      }
    },
    setLayout(data) {
      this.$set(this, 'layout', cloneDeep(data || []))
    },
  },
  mounted() {
    this.escHandle = (e) => {
      const isEsc = e.keyCode === 27
      if (!isEsc) return
      this.innerPreview = false
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
  height: 69px;
  background: #fff;
  padding: 0 18px;
  border: 1px solid #dddddd;
  border-top: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header .title {
  font-weight: 500;
  margin-right: 20px;
}

.header-content {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.header-content-item {
  width: 220px;
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
  overflow: overlay;
  background: #fff;
  /* border-left: 1px solid #ddd;
  border-right: 1px solid #ddd; */
}
</style>

<style>
.dimple-lowcode-form-aside {
  width: 24vw;
}

.dimple-lowcode-form-component-list {
  overflow: overlay;
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

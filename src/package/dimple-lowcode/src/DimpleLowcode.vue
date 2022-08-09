<template>
  <div class="dimple-lowcode-conatiner" v-loading="loading">
    <Form v-if="!isPreview" class="header" margin-bottom="0">
      <slot name="logo">
        <div class="title" style="flex: 1">DIMPLE表单设计器</div>
      </slot>
      <div style="display: flex">
        <!-- <FormItem style="flex: 1" label="组件最小高度" type="number" v-model="formConfig.rowHeight" :min="10" :label-length="8"></FormItem>
        <div style="width: 10px"></div> -->
        <FormItem
          style="flex: 1"
          label="布局模式"
          type="select"
          v-model="formConfig.gridNum"
          :options="[
            { label: '单列布局（移动端）', value: 1 },
            { label: '双列布局', value: 2 },
            { label: '四列布局', value: 4 },
          ]"
        ></FormItem>
      </div>
      <div style="flex: 1; text-align: right">
        <el-button type="primary" size="mini" icon="el-icon-setting" @click="drawer = true">表单配置</el-button>
        <el-button type="primary" size="mini" icon="el-icon-upload" @click="toPreview">预览</el-button>
        <el-button type="primary" size="mini" icon="el-icon-success" @click="save">保存</el-button>
      </div>
      <slot name="header-append"> </slot>
    </Form>
    <div class="selection">
      <div v-if="!isPreview" class="material" @click="currentComponent = null">
        <Materials :materials="innerMaterials" @drag="drag" @dragend="dragend" />
      </div>
      <div ref="content" class="content" @click="currentComponent = null">
        <Form v-bind="formConfig.formProps">
          <grid-layout
            ref="gridlayout"
            :layout.sync="layout"
            :col-num.sync="formConfig.gridNum"
            :row-height.sync="formConfig.rowHeight"
            :is-draggable="true"
            :is-resizable="true"
            :vertical-compact="true"
            :use-css-transforms="true"
            :auto-size="true"
          >
            <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" :static="innerPreview">
              <div class="content-component-item" @click.stop="componentItemClickHandle(item)">
                <div v-if="!isPreview" class="content-component-item-mask" :class="{ 'content-component-item-mask-active': currentComponent && currentComponent.i === item.i }">
                  <i class="icon el-icon-delete" @click="removeItem(item)"></i>
                </div>
                <template v-if="isPreview ? !item.config.hidden : true">
                  <Render :value="item" :materials="innerMaterials" />
                </template>
              </div>
            </grid-item>
          </grid-layout>
          <FormItem v-if="formConfig.submit.show" label-length="9">
            <el-button type="primary" size="mini" @click="submit">{{ formConfig.submit.submitText }}</el-button>
          </FormItem>
        </Form>
      </div>
      <div v-if="!isPreview" class="options">
        <ComponentConfigs v-model="currentComponent" :materials="innerMaterials" />
      </div>
    </div>

    <el-drawer title="表单配置" :visible.sync="drawer">
      <FormConfigs v-model="formConfig" />
    </el-drawer>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'
import { Materials } from './components/materials'
import { ComponentConfigs } from './components/componentConfigs'
import { FormConfigs } from './components/formConfigs'
import { Render } from './components/render'
import { Form, FormItem } from './components/form'
import systemMaterials from './materials/system'
import { getQueryByKey } from './utils/getQueryByKey'
import { is } from './utils/is'
import { validate } from './utils/validate'
import axios from 'axios'
import merge from 'lodash/merge'
import uniqueId from 'lodash/uniqueId'

const ajax = axios.create()

export default {
  name: 'DimpleLowcode',
  components: {
    GridLayout,
    GridItem,
    Materials,
    ComponentConfigs,
    FormConfigs,
    Render,
    Form,
    FormItem,
  },
  props: {
    materials: { type: Array, default: () => [] },
    config: { type: Object, default: () => {} },
    data: { type: Array, default: () => [] },
    preview: { type: Boolean, default: null },
  },
  data() {
    return {
      innerMaterials: systemMaterials(),
      layout: [],
      formConfig: {
        id: uniqueId(`${+new Date()}_`),
        name: '',
        rowHeight: 40,
        gridNum: 1,
        formProps: {
          labelLength: 8,
          alignItems: 'center',
          labelPosition: 'right',
        },
        submit: {
          show: false,
          submitText: '提交',
          submitType: 'request',
          api: '',
          link: '',
          formDataFiledName: 'form',
          successMsg: '',
          errorMsg: '',
          headers: [],
          body: [],
        },
        save: {
          api: '',
          successMsg: '',
          errorMsg: '',
          headers: [],
          body: [],
        },
      },
      mouseX: null,
      mouseY: null,
      drageData: null,
      currentComponent: null,
      drawer: false,
      innerPreview: false,
      loading: false,
    }
  },
  computed: {
    isPreview() {
      if (this.preview === true) return true
      if (this.preview === false) return false
      if (this.data.length > 0) return true
      return this.innerPreview
    },
    mouseInGrid() {
      if (!this.$refs.content) return
      const parentRect = this.$refs.content.getBoundingClientRect()
      let mouseInGrid = false
      const { mouseX, mouseY } = this
      if (mouseX > parentRect.left && mouseX < parentRect.right && mouseY > parentRect.top && mouseY < parentRect.bottom) {
        mouseInGrid = true
      }
      return mouseInGrid
    },
  },
  watch: {
    data: {
      handler: function (value) {
        this.$set(this.layout, 'layout', value || [])
      },
      deep: true,
      immediate: true,
    },
    config: {
      handler: function (value) {
        this.formConfig = merge(JSON.parse(JSON.stringify(this.formConfig)), value)
      },
      deep: true,
      immediate: true,
    },
    materials: {
      handler: function (value) {
        this.innerMaterials.push(...(value || []))
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    drag(e, item) {
      this.currentComponent = null
      if (!this.mouseInGrid) return

      const index = this.layout.findIndex((item) => item.i === 'drop')
      let { w = 1, h = 1, x = (this.layout.length * 2) % (this.colNum || 12), y = this.layout.length + (this.colNum || 12), i = 'drop' } = item
      if (index > -1) {
        i = index + ''
        x = this.layout[index].x
        y = this.layout[index].y
      }
      this.drageData = { ...item, x, y, w, h, i, id: +new Date() }
      delete this.drageData.component
      if (index === -1) return this.layout.push(this.drageData)

      const parentRect = this.$refs.content.getBoundingClientRect()
      try {
        this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = 'none'
      } catch {}
      let el = this.$refs.gridlayout.$children[index]
      el.dragging = { top: this.mouseY - parentRect.top, left: this.mouseX - parentRect.left }
      let new_pos = el.calcXY(this.mouseY - parentRect.top, this.mouseX - parentRect.left)

      if (this.mouseInGrid === true) {
        this.$refs.gridlayout.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1)
      }
      if (this.mouseInGrid === false) {
        this.$refs.gridlayout.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1)
        this.layout = this.layout.filter((obj) => obj.i !== 'drop')
      }
    },
    dragend() {
      this.layout = this.layout.filter((obj) => obj.i !== 'drop')
      if (!this.mouseInGrid) return
      const { x, y, w, h, i } = this.drageData
      this.$refs.gridlayout.dragEvent('dragend', 'drop', x, y, w, h)
      this.layout.push(this.drageData)
      try {
        this.$refs.gridLayout.$children[this.layout.length].$refs.item.style.display = 'block'
      } catch {}
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
      this.$message.success('按下ESC键可以退出预览')
    },
    save() {
      let api = ''
      const headers = {}
      const body = {}
      let successMsg = ''
      let errorMsg = ''
      try {
        const config = this.formConfig.save
        api = config.api
        successMsg = config.successMsg
        errorMsg = config.errorMsg
        if (!is.http(api)) return this.$message.warning('保存的接口地址不符合网络接口格式，无法发起保存操作')
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
        return this.$message.error('保存配置填写错误')
      }

      this.loading = true
      ajax({ url: api, method: 'post', headers, data: body })
        .then((res) => {
          this.$message.success(successMsg || '保存成功')
          this.$emit('afterSave', res)
        })
        .catch((err) => {
          this.$message.error(errorMsg || '保存失败')
          this.$emit('afterSaveError', err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    submit() {
      let submitType = ''
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
        const config = this.formConfig.submit
        submitType = config.submitType
        link = config.link
        api = config.api
        successMsg = config.successMsg
        errorMsg = config.errorMsg
        isLink = submitType === 'link'
        isRequest = submitType === 'request'
        body.id = this.formConfig.id
        if (isLink && !is.http(api)) return this.$message.warning('跳转地址不符合网络地址格式，无法执行跳转操作')
        if (isRequest && !is.http(api)) return this.$message.warning('提交的接口地址不符合网络接口格式，无法发起提交操作')
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
              if (!validate.required(item.value, item.valueType)) validateMsg = item.config.validate.requiredValidateMsg
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
        if (validateMsg) return this.$message.error(validateMsg)
        body[this.formConfig.submit.formDataFiledName || 'form'] = formData
      } catch (error) {
        console.error('提交配置填写错误', error)
        return this.$message.error('提交配置填写错误')
      }
      if (isLink) return (window.location.href = link)

      if (isRequest) {
        this.loading = true
        ajax({ url: api, method: 'post', headers, data: body })
          .then((res) => {
            this.$message.success(successMsg || '提交成功')
            this.$emit('afterSubmit', res)
          })
          .catch((err) => {
            this.$message.error(errorMsg || '提交失败')
            this.$emit('afterSubmitError', err)
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
  },
  mounted() {
    this.dragoverHandle = (e) => {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
    }
    document.addEventListener('dragover', this.dragoverHandle, false)

    this.escHandle = (e) => {
      const isEsc = e.keyCode === 27
      if (!isEsc) return
      this.innerPreview = false
    }
    document.addEventListener('keydown', this.escHandle, false)
  },
  beforeDestroy() {
    document.removeEventListener('dragover', this.dragoverHandle, false)
    document.removeEventListener('keydown', this.escHandle, false)
  },
}
</script>

<style scoped>
.dimple-lowcode-conatiner {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

.header {
  height: 48px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
}

.header .title {
  font-weight: 500;
}

.selection {
  flex: 1;
  overflow: hidden;
  padding: 5px;
  display: flex;
}

.material {
  width: 25%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  height: 100%;
  overflow: overlay;
  margin: 0 1%;
}

.content-component-item {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.content-component-item-mask {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1;
  box-sizing: border-box;
  text-align: right;
  padding: 4px;
  padding-top: 2px;
}

.content-component-item-mask .icon {
  display: none;
  color: #f56c6c;
}

.content-component-item-mask:hover {
  border: 1px dashed rgba(21, 59, 184, 0.3);
  background: rgba(21, 59, 184, 0.05);
}

.content-component-item-mask:hover .icon {
  display: inline-block;
  cursor: pointer;
}

.content-component-item-mask-active {
  border: 1px dashed rgba(21, 59, 184, 0.3);
  background: rgba(21, 59, 184, 0.05);
}

.content-component-item-mask-active .icon {
  display: inline-block;
  cursor: pointer;
}

.options {
  width: 25%;
  height: 100%;
  overflow: overlay;
  background: #fff;
}
</style>

<style>
.dimple-lowcode-conatiner .vue-grid-item.vue-grid-placeholder {
  box-sizing: border-box;
  border: 1px dashed rgba(0, 0, 255, 0.2);
  background: rgba(0, 0, 255, 0.2);
}
.dimple-lowcode-conatiner .vue-grid-item {
  box-sizing: border-box;
  touch-action: none;
  min-height: 1px !important;
  /* overflow: hidden; */
}

.dimple-lowcode-conatiner .vue-grid-item .vue-resizable-handle {
  display: none;
}

.dimple-lowcode-conatiner .vue-grid-item:hover .vue-resizable-handle {
  display: inline-block;
  z-index: 3;
}
</style>

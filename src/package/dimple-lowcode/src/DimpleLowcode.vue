<template>
  <div class="dimple-lowcode-conatiner">
    <div v-if="!isPreview" class="header">
      <el-form :inline="true" size="mini">
        <el-form-item label="栅格高度">
          <el-input v-model="rowHeight" type="number"></el-input>
        </el-form-item>
        <el-form-item label="栅格数量">
          <el-input v-model="gridNum" type="number" placeholder="12"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-setting" @click="drawer = true">表单配置</el-button>
          <el-button type="primary" icon="el-icon-upload" @click="preview">预览</el-button>
          <el-button type="primary" icon="el-icon-success">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="selection">
      <div v-if="!isPreview" class="material">
        <Materials v-model="activeMaterialValue" :materials="materials" @drag="drag" @dragend="dragend" />
      </div>
      <div ref="content" class="content">
        <Form label-length="8">
          <grid-layout
            ref="gridlayout"
            :layout.sync="layout"
            :col-num.sync="gridNum"
            :row-height.sync="rowHeight"
            :is-draggable="true"
            :is-resizable="true"
            :vertical-compact="true"
            :use-css-transforms="true"
            :auto-size="true"
          >
            <grid-item v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" :key="item.i" :static="isPreview">
              <div class="content-component-item" @click="componentItemClickHandle(item)">
                <div v-if="!isPreview" class="content-component-item-mask">
                  <i class="icon el-icon-delete" @click="removeItem(item)"></i>
                </div>
                <Render v-if="item.component" :materials="materials" :componentName="item.key" :props="item.props || {}"></Render>
              </div>
            </grid-item>
          </grid-layout>
          <FormItem v-if="formConfig.submit.show" label-length="9">
            <!-- <el-button size="mini">重置</el-button> -->
            <el-button type="primary" size="mini" @click="submit">{{ formConfig.submit.submitText }}</el-button>
          </FormItem>
        </Form>
      </div>
      <div v-if="!isPreview" class="options">
        <Configs v-model="currentComponent" />
      </div>
    </div>

    <el-drawer title="表单配置" :visible.sync="drawer">
      <div style="padding: 20px">
        <Form label-length="10">
          <FormItem label="显示提交按钮" type="switch" v-model="formConfig.submit.show"></FormItem>
          <FormItem label="提交按钮文本" type="input" v-model="formConfig.submit.submitText"></FormItem>
          <FormItem label="提交行为" type="select" v-model="formConfig.submit.submitType" :options="submitTypeOptions"></FormItem>
          <template v-if="formConfig.submit.submitType === 'request'">
            <FormItem label="提交接口地址" type="input" v-model="formConfig.submit.api"></FormItem>
            <FormItem label="表单数据字段名" type="input" v-model="formConfig.submit.formDataKey"></FormItem>
            <FormItem
              label="获取认证方式"
              type="select"
              :options="[
                { label: '从地址栏URL参数中获取', value: 'url' },
                { label: '自定义', value: 'custom' },
              ]"
              v-model="formConfig.submit.getTokenType"
            ></FormItem>
            <FormItem v-if="formConfig.submit.getTokenType === 'url'" label="认证参数名称" type="input" v-model="formConfig.submit.urlParamsName"></FormItem>
            <FormItem v-if="formConfig.submit.getTokenType === 'custom'" label="获取认证代码" type="textarea" maxlength="500" v-model="formConfig.submit.getTokenCode"></FormItem>
          </template>

          <template v-if="formConfig.submit.submitType === 'link'">
            <FormItem label="链接地址" type="input" v-model="formConfig.submit.url"></FormItem>
          </template>
        </Form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'
import { Materials } from './components/materials'
import { Configs } from './components/configs'
import { Render } from './components/render/'
import { Form, FormItem } from './components/form'
import systemMaterials from './materials/system'

export default {
  name: 'DimpleLowcode',
  components: {
    GridLayout,
    GridItem,
    Materials,
    Configs,
    Render,
    Form,
    FormItem,
  },
  props: {
    materials: {
      type: Array,
      default: () => systemMaterials,
    },
  },
  data() {
    return {
      gridNum: 1,
      rowHeight: 40,
      layout: [],
      formConfig: { submit: { show: false, submitText: '提交', submitType: 'request', api: 'http://das.aiot.com/lowcode', formDataKey: 'form', getTokenType: 'url', urlParamsName: 'token' } },
      mouseX: null,
      mouseY: null,
      drageData: null,
      activeMaterialValue: null,
      currentComponent: null,
      drawer: false,
      isPreview: false,
      submitTypeOptions: [
        { value: 'request', label: '发送网络请求' },
        { value: 'link', label: '跳转链接' },
      ],
    }
  },
  computed: {
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
  methods: {
    drag(e, item) {
      if (!this.mouseInGrid) return

      const index = this.layout.findIndex((item) => item.i === 'drop')
      let { w = 1, h = 1, x = (this.layout.length * 2) % (this.colNum || 12), y = this.layout.length + (this.colNum || 12), i = 'drop' } = item
      if (index > -1) {
        i = index + ''
        x = this.layout[index].x
        y = this.layout[index].y
      }
      this.drageData = { ...item, x, y, w, h, i }
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
      console.log(item)
      this.currentComponent = item
    },
    submit() {},
    preview() {
      this.isPreview = true
      this.$message.success('按下ESC键可以退出预览')
    },
  },
  created() {
    if (!this.materials[0]) return
    this.activeMaterialValue = this.materials[0].key === undefined ? 0 : this.materials[0].key
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
      this.isPreview = false
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
}

.header .el-form-item {
  margin-bottom: 0px;
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
  overflow: auto;
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

.options {
  width: 25%;
  height: 100%;
  overflow: auto;
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

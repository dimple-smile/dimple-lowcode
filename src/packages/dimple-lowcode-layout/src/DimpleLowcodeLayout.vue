<template>
  <div ref="dimple-lowcode-layout" class="dimple-lowcode-layout" :style="vars">
    <div v-show="!preview">
      <slot name="header"> </slot>
    </div>
    <div class="main">
      <div v-show="!preview" class="aside" :class="asideClass">
        <slot name="component-header"></slot>
        <div v-if="!loading" ref="component-list" data-id="component-list" class="component-list" :class="componentListClass">
          <div v-for="item in componentList" class="component-item" :class="componentItemClass" :data-component-key="item[componentKey]" :key="item[componentKey]">
            <slot name="component-item" :data="item">
              {{ item.name }}
            </slot>
          </div>
        </div>
      </div>
      <div class="content dimple-lowcode-layout-content">
        <slot name="render-container-header"></slot>
        <div
          class="render-container"
          ref="render-container"
          data-id="render-container"
          :class="containerClass"
          :style="computedContainerStyle"
          @mousemove.capture="handleComponentItemMouseMove"
          @mouseleave="currentRenderKey = null"
          @click="renderContainerClick"
        >
          <slot name="render-header"> </slot>
          <div
            v-for="(item, index) in value"
            class="render-item-container"
            :class="{ 'render-item-handle': !preview }"
            :key="item[componentKey] + item[renderKey]"
            :data-render-key="item[renderKey]"
            :data-component-key="item[componentKey]"
            :style="getRenderItemContainerStyle(item)"
          >
            <div v-if="['top', 'left'].includes(gutterPlacement)" :style="{ width: gutter, height: gutter }"></div>
            <div style="position: relative; overflow: hidden" :style="getRenderItemStyle(item)">
              <slot name="render-item" :data="item" :index="index"> </slot>
              <slot name="render-item-custom" :data="item" :index="index"></slot>
              <div v-if="showMask(item)" class="render-item-mask" @click.stop="handleComponentClick($event, item)">
                <slot name="render-item-mask" :data="item" :index="index">
                  <div class="render-item-mask-default">
                    <i class="icon el-icon-delete" style="color: #dd3914" @click.stop="value.splice(index, 1)"></i>
                  </div>
                </slot>
              </div>
            </div>
            <div v-if="['bottom', 'right'].includes(gutterPlacement)" :style="{ width: gutter, height: gutter }"></div>
          </div>
          <slot name="render-footer"> </slot>
        </div>
        <slot name="render-container-footer"></slot>
      </div>
      <div v-show="!preview">
        <slot name="panel"></slot>
      </div>
    </div>
    <div v-show="!preview">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import uniqueId from 'lodash/uniqueId'
import cloneDeep from 'lodash/cloneDeep'
import differenceBy from 'lodash/differenceBy'

const defaultGhostStyle = { width: '100%', height: '40px', background: '#F0F2F5', opacity: '0.7' }

export default {
  name: 'DimpleLowcodeLayout',
  props: {
    value: { type: Array, default: () => [] },
    currentComponent: { type: Object, default: () => ({}) },
    preview: { type: Boolean, default: false },
    componentList: { type: Array, default: () => [] },
    asideClass: {},
    containerStyle: { type: Object, default: () => ({}) },
    containerClass: {},
    componentListClass: {},
    componentItemClass: {},
    componentKey: { type: String, default: 'key' },
    renderKey: { type: String, default: 'id' },
    columnWidth: { type: String, default: null },
    dragDataAdapter: { type: Function, default: null },
    gutter: { type: String, default: '' },
    gutterPlacement: { type: String, default: 'right', options: ['top', 'bottom', 'left', 'right'] },
    hideMask: { type: Boolean, default: false },
  },
  data() {
    return {
      dragComponentItemClassName: 'component-item',
      dragRenderItemClassName: 'render-item-handle',
      ghostClass: 'ghost',
      ghostStyle: {},
      dragData: {},
      currentRenderKey: null,
      materialsSortable: null,
      renderSortable: null,
      loading: false,
    }
  },
  computed: {
    vars() {
      let ghostStyle = { ...(this.ghostStyle || {}) }
      if (!ghostStyle.background) ghostStyle.background = defaultGhostStyle.background
      if (!ghostStyle.opacity) ghostStyle.opacity = defaultGhostStyle.opacity
      if (!ghostStyle.height) ghostStyle.height = defaultGhostStyle.height
      if (!ghostStyle.width) {
        ghostStyle.width = defaultGhostStyle.width
        if (this.columnWidth) ghostStyle.width = this.columnWidth
      }
      let res = {
        '--dimple-lowcode-layout-ghost-height': ghostStyle.height,
        '--dimple-lowcode-layout-ghost-width': ghostStyle.width,
        '--dimple-lowcode-layout-ghost-background': ghostStyle.background,
        '--dimple-lowcode-layout-ghost-opacity': ghostStyle.opacity,
      }
      return res
    },
    computedContainerStyle() {
      const res = this.containerStyle || {}
      if ((!res['flex-direction'] || !res['flexDirection']) && this.columnWidth === '100%') {
        res['flex-direction'] = 'column'
      }
      return res
    },
  },
  watch: {
    componentList: {
      handler: function (newValue, oldValue) {
        if (differenceBy(newValue, oldValue, 'key').length === 0) return
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.$nextTick(() => this.init())
        }, 100)
      },
      deep: true,
    },
  },
  methods: {
    getRenderItemContainerStyle(item) {
      const itemContainerStyle = cloneDeep(item.containerStyle || {})
      if (this.columnWidth && !itemContainerStyle.width) itemContainerStyle.width = this.columnWidth
      return itemContainerStyle
    },
    getRenderItemStyle(item) {
      const itemStyle = cloneDeep(item.style || {})
      if (!itemStyle.width) {
        if (['bottom', 'top'].includes(this.gutterPlacement)) itemStyle.width = '100%'
        if (['right', 'left'].includes(this.gutterPlacement)) itemStyle.flex = '1'
      }
      return itemStyle
    },
    handleComponentItemMouseMove(e) {
      const rootEl = this.$refs['render-container']
      let renderKey = null
      let componentKey = null
      let currentTarget = null
      const check = (target) => {
        if (!target) return
        if (target === rootEl) return
        if (target.dataset.renderKey) {
          renderKey = target.dataset.renderKey
          componentKey = target.dataset.componentKey
          currentTarget = target
          return
        }
        if (!target.parentNode) return
        check(target.parentNode)
      }
      check(e.target)
      this.currentRenderKey = renderKey
      if (currentTarget) {
        const item = this.value.find((item) => item[this.renderKey] === renderKey)
        const itemContainerStyle = (item && item.containerStyle) || {}
        const currentClientHeight = currentTarget.clientHeight + 'px'
        const currentClientWidth = currentTarget.clientWidth + 'px'
        this.$set(this, 'ghostStyle', {
          height: itemContainerStyle.height || currentClientHeight,
          width: itemContainerStyle.width || this.columnWidth || currentClientWidth,
        })
      }
      this.$emit('onComponentItemMouseMove', { renderKey, componentKey })
    },
    init() {
      if (this.materialsSortable) this.materialsSortable.destroy()
      if (this.renderSortable) this.renderSortable.destroy()

      const materialsContainer = this.$refs['component-list']
      const renderContainer = this.$refs['render-container']

      this.materialsSortable = new Sortable(materialsContainer, {
        group: { name: 'shared', pull: 'clone', put: false },
        sort: false,
        draggable: '.' + this.dragComponentItemClassName,
        onStart: (e) => {
          const componentKey = e.item.dataset.componentKey
          let findItem = this.componentList.find((item) => item[this.componentKey] === componentKey)
          if (!findItem) return (this.dragData = null)
          let { component, ...other } = findItem
          let item = cloneDeep(other)
          item[this.renderKey] = uniqueId(`${+new Date()}_`)
          if (this.dragDataAdapter) item = this.dragDataAdapter(item)
          this.dragData = item
          const itemContainerStyle = item.containerStyle || {}
          this.$set(this.ghostStyle, 'width', itemContainerStyle.width || this.columnWidth || '100%')
        },
        onMove: (e) => {
          e.dragged.classList.add('ghost')
          this.$emit('update:currentComponent', null)
        },
      })
      this.renderSortable = new Sortable(renderContainer, {
        group: 'shared',
        draggable: '.' + this.dragRenderItemClassName,
        ghostClass: 'ghost',
        animation: 150,
        onAdd: (e) => {
          if (!this.dragData) return
          e.item.remove()
          this.value.splice(e.newIndex, 0, this.dragData)
          this.$emit('update:currentComponent', this.dragData)
          this.currentRenderKey = this.dragData[this.renderKey]
        },
        onUpdate: (e) => {
          const oldItem = cloneDeep(this.value[e.oldIndex])
          this.value.splice(e.oldIndex, 1)
          this.value.splice(e.newIndex, 0, oldItem)
        },
        onMove: (e) => {
          this.$emit('update:currentComponent', null)
        },
      })
    },
    handleComponentClick(e, item) {
      const currentComponent = this.currentComponent || {}
      if (item[this.renderKey] === currentComponent[this.renderKey]) return this.$emit('update:currentComponent', null)
      this.$emit('update:currentComponent', item)
    },
    renderContainerClick() {
      if (!this.currentRenderKey) this.$emit('update:currentComponent', null)
    },
    showMask(item) {
      if (this.preview || !item || this.hideMask) return
      const currentComponent = this.currentComponent || {}
      const renderKey = this.renderKey
      return item[renderKey] === this.currentRenderKey || item[renderKey] === currentComponent[renderKey]
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style scoped>
.dimple-lowcode-layout {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
}

.main {
  flex: 1;
  width: 100%;
  overflow: hidden;
  display: flex;
}
.aside {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.component-list {
  flex: 1;
  overflow: overlay;
  display: flex;
  flex-wrap: wrap;
}

.main .content {
  height: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.render-container {
  flex: 1;
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: overlay;
}

.render-item-container {
  overflow: overlay;
  position: relative;
  height: auto;
  display: flex;
  flex-wrap: wrap;
}

.render-item-mask {
  transition: all 0.3s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 998;
  cursor: move;
  background: rgba(21, 59, 184, 0.05);
  box-sizing: border-box;
  border: 1px dashed rgba(21, 59, 184, 0.3);
}

.render-item-mask-default {
  display: flex;
  align-items: center;
  align-content: flex-end;
  justify-content: flex-end;
  padding: 5px;
}
.render-item-mask-default .icon {
  cursor: pointer;
}
</style>

<style>
.dimple-lowcode-layout .render-container .ghost {
  position: relative;
  height: var(--dimple-lowcode-layout-ghost-height) !important;
  width: var(--dimple-lowcode-layout-ghost-width) !important;
  background: var(--dimple-lowcode-layout-ghost-background) !important;
  opacity: var(--dimple-lowcode-layout-ghost-opacity) !important;
  padding: 0 !important;
  margin: 0 !important;
  height: auto !important;
}

.dimple-lowcode-layout .render-container .ghost::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  content: '';
  background: var(--dimple-lowcode-layout-ghost-background) !important;
  box-sizing: border-box;
  border: 1px dashed rgba(21, 59, 184, 0.3);
}
</style>

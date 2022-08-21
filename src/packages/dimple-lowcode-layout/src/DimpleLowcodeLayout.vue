<template>
  <div ref="dimple-lowcode-layout" class="dimple-lowcode-layout" :style="vars">
    <div v-show="!preview">
      <slot name="header"> </slot>
    </div>
    <div class="main">
      <div v-show="!preview" class="aside" :class="asideClass">
        <slot name="component-header"></slot>
        <div ref="component-list" data-id="component-list" class="component-list" :class="componentListClass">
          <div v-for="item in componentList" class="component-item" :class="componentItemClass" :data-component-key="item[componentKey]">
            <slot name="component-item" :data="item">
              {{ item.name }}
            </slot>
          </div>
        </div>
      </div>
      <div class="content dimple-lowcode-layout-content">
        <div class="render-container" ref="render-container" data-id="render-container" :class="containerClass" @mousemove.capture="handleComponentItemMouseMove" @mouseleave="currentRenderKey = null">
          <slot name="render-header"></slot>
          <div v-for="(item, index) in value" class="render-item" :style="getRenderItemStyle(item)" :key="item[renderKey]" :data-render-key="item[renderKey]" :data-component-key="item[componentKey]">
            <slot name="render-item" :data="item"> </slot>
            <div class="render-item-mask" v-if="item[renderKey] === currentRenderKey || item[renderKey] === currentComponent?.[renderKey]" @click.stop="handleComponentClick($event, item)">
              <slot name="render-item-mask">
                <div class="render-item-mask-default">
                  <i class="icon el-icon-delete" style="color: #dd3914" @click.stop="value.splice(index, 1)"></i>
                </div>
              </slot>
            </div>
          </div>
          <slot name="render-footer"></slot>
        </div>
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
const defaultGhostStyle = { width: '100%', height: '40px', background: '#F0F2F5', opacity: '0.7' }

export default {
  name: 'DimpleLowcodeLayout',
  props: {
    value: { type: Array, default: () => [] },
    currentComponent: { type: Object, default: () => ({}) },
    preview: { type: Boolean, default: false },
    componentList: { type: Array, default: () => [] },
    asideClass: {},
    containerClass: {},
    componentListClass: {},
    componentItemClass: {},
    componentKey: { type: String, default: 'key' },
    renderKey: { type: String, default: 'id' },
    ghostStyle: { type: Object, default: () => ({}) },
    columnWidth: { type: String, default: null },
    dragDataAdapter: { type: Function, default: null },
  },
  data() {
    return {
      dragComponentItemClassName: 'component-item',
      dragRenderItemClassName: 'render-item',
      ghostClass: 'ghost',
      dragData: {},
      currentRenderKey: null,
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
  },
  methods: {
    getRenderItemStyle(item) {
      const itemStyle = JSON.parse(JSON.stringify((item && item.style) || {}))
      if (!itemStyle.width) itemStyle.width = this.columnWidth || '100%'
      return itemStyle
    },
    handleComponentItemMouseMove(e) {
      const rootEl = this.$refs['render-container']
      let renderKey = null
      const check = (target) => {
        if (!target) return
        if (target === rootEl) return
        if (target.dataset.renderKey) {
          renderKey = target.dataset.renderKey
          return
        }
        if (!target.parentNode) return
        check(target.parentNode)
      }
      check(e.target)
      this.currentRenderKey = renderKey
    },
    init() {
      const materialsContainer = this.$refs['component-list']
      const renderContainer = this.$refs['render-container']

      new Sortable(materialsContainer, {
        group: { name: 'shared', pull: 'clone', put: false },
        sort: false,
        draggable: '.' + this.dragComponentItemClassName,
        onStart: (e) => {
          const componentKey = e.item.dataset.componentKey
          const item = this.componentList.find((item) => item[this.componentKey] === componentKey)
          this.dragData = item
        },
        onMove: (e) => {
          e.dragged.classList.add('ghost')
        },
      })
      new Sortable(renderContainer, {
        group: 'shared',
        draggable: '.' + this.dragRenderItemClassName,
        ghostClass: 'ghost',
        animation: 150,
        onAdd: (e) => {
          e.item.remove()
          let pushItem = this.dragData
          if (this.dragDataAdapter) pushItem = this.dragDataAdapter(pushItem)
          this.value.splice(e.newIndex, 0, pushItem)
        },
        onUpdate: (e) => {
          const oldItem = this.value[e.oldIndex]
          this.value.splice(e.oldIndex, 1, oldItem)
        },
        onMove: (e) => {
          this.$emit('update:currentComponent', null)
        },
      })
    },
    handleComponentClick(e, item) {
      if (item[this.renderKey] === this.currentComponent?.[this.renderKey]) return this.$emit('update:currentComponent', null)
      this.$emit('update:currentComponent', item)
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
}

.render-container {
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  align-content: flex-start;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: overlay;
}

.render-item {
  overflow: overlay;
  position: relative;
}

.render-item-mask {
  transition: all 0.3s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
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
  height: var(--dimple-lowcode-layout-ghost-height) !important;
  width: var(--dimple-lowcode-layout-ghost-width) !important;
  /* width: 100% !important; */
  background: var(--dimple-lowcode-layout-ghost-background) !important;
  opacity: var(--dimple-lowcode-layout-ghost-opacity) !important;
  padding: 0 !important;
  margin: 0 !important;
  height: auto !important;
}
</style>

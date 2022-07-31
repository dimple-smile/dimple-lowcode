<template>
  <div class="das-layout-editor">
    <div class="components">
      <template v-for="(item, index) in components">
        <div @drag="drag" @dragend="dragend" class="components-item" draggable="true" unselectable="on">{{ item.title }}</div>
      </template>
    </div>
    <div ref="layoutContainer" class="layout-container">
      <grid-layout ref="gridlayout" :layout.sync="layout" :col-num="2" :row-height="30" :is-draggable="true" :is-resizable="true" :vertical-compact="true" :use-css-transforms="true">
        <grid-item :key="item.i" v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i">
          <span class="text">{{ item.i }}</span>
          <LayoutEditorRender v-if="components[item.i]" :component="components[item.i].component"></LayoutEditorRender>
        </grid-item>
      </grid-layout>
    </div>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout'
import LayoutEditorRender from './LayoutEditorRender.vue';
let mouseXY = { x: null, y: null }
let DragPos = { x: null, y: null, w: 1, h: 1, i: null }

export default {
  title: '布局设计器',
  name: 'LayoutEditor',
  components: {
    GridLayout,
    GridItem,
    LayoutEditorRender
  },
  props: {
    components: { type: Array, default: () => [] },
  },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 1, h: 2, i: '0' },
        { x: 0, y: 2, w: 2, h: 2, i: '1' },
      ],
    }
  },
  mounted() {
    document.addEventListener(
      'dragover',
      function (e) {
        mouseXY.x = e.clientX
        mouseXY.y = e.clientY
      },
      false
    )
  },
  beforeDestroy() {},
  methods: {
    drag: function (e) {
      let parentRect = this.$refs.layoutContainer.getBoundingClientRect()
      let mouseInGrid = false
      if (mouseXY.x > parentRect.left && mouseXY.x < parentRect.right && mouseXY.y > parentRect.top && mouseXY.y < parentRect.bottom) {
        mouseInGrid = true
      }
      if (mouseInGrid === true && this.layout.findIndex((item) => item.i === 'drop') === -1) {
        this.layout.push({
          x: (this.layout.length * 2) % (this.colNum || 12),
          y: this.layout.length + (this.colNum || 12), // puts it at the bottom
          w: 1,
          h: 1,
          i: 'drop',
        })
      }
      let index = this.layout.findIndex((item) => item.i === 'drop')
      if (index !== -1) {
        try {
          this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = 'none'
        } catch {}
        let el = this.$refs.gridlayout.$children[index]
        el.dragging = { top: mouseXY.y - parentRect.top, left: mouseXY.x - parentRect.left }
        let new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left)
        if (mouseInGrid === true) {
          this.$refs.gridlayout.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1)
          DragPos.i = String(index)
          DragPos.x = this.layout[index].x
          DragPos.y = this.layout[index].y
        }
        if (mouseInGrid === false) {
          this.$refs.gridlayout.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1)
          this.layout = this.layout.filter((obj) => obj.i !== 'drop')
        }
      }
    },
    dragend: function (e) {
      let parentRect = this.$refs.layoutContainer.getBoundingClientRect()
      let mouseInGrid = false
      if (mouseXY.x > parentRect.left && mouseXY.x < parentRect.right && mouseXY.y > parentRect.top && mouseXY.y < parentRect.bottom) {
        mouseInGrid = true
      }
      if (mouseInGrid === true) {
        this.$refs.gridlayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1)
        this.layout = this.layout.filter((obj) => obj.i !== 'drop')
        this.layout.push({
          x: DragPos.x,
          y: DragPos.y,
          w: 1,
          h: 1,
          i: DragPos.i,
        })
        this.$refs.gridLayout.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, 1, 1)
        try {
          this.$refs.gridLayout.$children[this.layout.length].$refs.item.style.display = 'block'
        } catch {}
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.das-layout-editor {
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  .components {
    width: 25%;
    overflow: auto;
    min-height: 100%;
    padding: 20px;
    .components-item {
      cursor: move;
      padding: 20px;
      border-radius: 4px;
      box-shadow: 0 0 10px rgba(128, 145, 165, 0.2);
      margin-bottom: 20px;
    }
  }
  .layout-container {
    flex: 1;
    overflow: auto;
    min-height: 100%;
    background: #f3f4f6;
  }
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #fff;
  box-sizing: border-box;
  padding: 20px;
  box-shadow: 0 0 10px rgba(128, 145, 165, 0.2);
  border-radius: 4px;
}
.vue-grid-item .resizing {
  opacity: 0.9;
}
</style>

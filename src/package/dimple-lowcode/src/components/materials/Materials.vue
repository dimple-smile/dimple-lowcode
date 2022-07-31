<template>
  <div class="dimple-lowcode-materials">
    <el-tabs v-model="value" stretch>
      <template v-for="(item, index) in materials">
        <el-tab-pane :label="item.name" :name="item.key || index"> </el-tab-pane>
      </template>
    </el-tabs>

    <div class="components">
      <div v-for="(item, index) in currentComponents" :key="index" class="component-item" @drag="drag($event, item)" @dragend="dragend($event, item)" draggable="true" unselectable="on">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {},
    materials: { type: Array, default: () => [] },
  },
  computed: {
    activeMaterialItem() {
      const item = this.materials.find((item, index) => {
        let key = item.key === undefined ? index : item.key
        return key === this.value
      })
      return item
    },
    currentComponents() {
      const activeMaterialItem = this.activeMaterialItem
      if (!activeMaterialItem) return []
      return activeMaterialItem.components
    },
  },
  methods: {
    drag(e, item) {
      this.$emit('drag', e, item)
    },
    dragend(e, item) {
      this.$emit('dragend', item)
    },
  },
}
</script>

<style scoped>
.dimple-lowcode-materials {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.components {
  flex: 1;
  overflow: auto;
  padding: 10px 20px;
}
.component-item {
  padding: 10px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(128, 145, 165, 0.2);
  transition: all 0.3s;
}

.component-item:hover {
  box-shadow: 0 6px 16px 0 rgb(0 0 0 / 15%);
  border-color: transparent;
}
</style>

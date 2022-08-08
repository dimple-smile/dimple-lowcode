<template>
  <div>
    <div @click="visible = true">
      <slot></slot>
    </div>
    <el-dialog :title="title" :visible.sync="visible" append-to-body width="1000px">
      <div class="options-editor">
        <div class="no-data" v-if="!value.length">暂无数据</div>
        <template v-for="(item, index) in value">
          <Form margin-bottom="0">
            <div class="options-editor-item">
              <FormItem style="width: 30%" label="字段名称" type="autocomplete" v-model="item.name" :options="urlParamNameOptions"> </FormItem>
              <FormItem style="flex: 1" label="录入模式" type="select" v-model="item.mode" :options="modeOptions"> </FormItem>
              <FormItem style="flex: 1" v-if="item.mode === 'input'" label="字段值" type="input" v-model="item.value"> </FormItem>
              <el-button style="margin-left: 1%" icon="el-icon-delete" circle size="mini" type="danger" @click="value.splice(index, 1)"></el-button>
            </div>
          </Form>
        </template>
      </div>
      <div class="options-editor-add-btn">
        <el-button icon="el-icon-plus" circle size="mini" type="primary" @click="value.push({ name: '', mode: '', value: '' })"></el-button>
      </div>

      <div style="text-align: right;">
        <el-button size="mini" @click="visible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="visible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Form, FormItem } from '../form'
export default {
  components: { Form, FormItem },
  props: {
    value: { type: Array, default: () => [] },
    title: {},
  },
  data() {
    return {
      visible: false,
      modeOptions: [
        { value: 'input', label: '输入框录入' },
        { value: 'urlParam', label: '从地址栏获取' },
      ],
      urlParamNameOptions: [
        { value: 'accessToken', label: 'accessToken（认证令牌）' },
        { value: 'token', label: 'token（认证令牌）' },
        { value: 'mobile', label: 'mobile（手机号）' },
        { value: 'username', label: 'username（用户名）' },
        { value: 'projectId', label: 'projectId（项目id）' },
        { value: 'projectName', label: 'projectName（项目名）' },
        { value: 'projectCode', label: 'projectCode（项目编号）' },
      ],
    }
  },
}
</script>

<style scoped>
.options-editor {
  max-height: 50vh;
  overflow: overlay;
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

.options-editor-add-btn {
  text-align: center;
  margin-top: 10px;
}

.no-data {
  text-align: center;
  padding: 10px;
}

.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
</style>

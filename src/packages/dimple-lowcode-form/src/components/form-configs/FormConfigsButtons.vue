<template>
  <div class="dimple-lowcode-form-buttons">
    <div style="margin-bottom: 20px">
      <el-switch v-model="value.isMoibileButtons" active-text="使用移动端按钮样式"> </el-switch>
    </div>
    <div class="title">
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="add">添加操作按钮</el-button>
      <span>
        共 <span style="color: #4066e2">{{ value.buttons.length }}</span> 个操作按钮
      </span>
    </div>

    <el-collapse v-if="value.buttons.length" v-model="activeName" accordion>
      <el-collapse-item v-for="(item, index) in value.buttons" :name="index + ''">
        <template #title>
          <div class="collapse-item-title">
            <span> {{ index + 1 }}.{{ item.text }}</span>
            <el-popconfirm placement="top-end" title="确定删除吗？" @confirm="value.buttons.splice(index, 1)">
              <template #reference>
                <el-button size="mini" type="text" style="color: #f56c6c; margin: 0 20px">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
        </template>
        <Form label-length="10">
          <FormItem label="按钮文本" type="input" v-model="item.text"></FormItem>
          <FormItem label="按钮样式" type="select" v-model="item.btnType" :options="btnTypeOptions"></FormItem>
          <FormItem label="操作行为" type="select" v-model="item.operateType" :options="operateTypeOptions"></FormItem>
          <template v-if="item.operateType === 'request'">
            <FormItem label="网络接口地址" type="input" v-model="item.api"></FormItem>
            <FormItem label="表单数据字段名" type="input" v-model="item.formDataFiledName"></FormItem>
            <FormItem label="请求头">
              <FiledEditor v-model="item.headers" :title="`请求头配置(共${item.headers.length}字段)`">
                <el-button style="width: 100%" size="mini" icon="el-icon-edit">{{ item.headers.length }}个字段</el-button>
              </FiledEditor>
            </FormItem>
            <FormItem label="请求体">
              <FiledEditor v-model="item.body" :title="`请求体配置(共${item.body.length}字段)`">
                <el-button style="width: 100%" size="mini" icon="el-icon-edit">{{ item.body.length }}个字段</el-button>
              </FiledEditor>
            </FormItem>
            <FormItem label="请求成功提示" type="input" v-model="item.successMsg"></FormItem>
            <FormItem label="请求失败提示" type="input" v-model="item.errorMsg" margin-bottom="0"></FormItem>
          </template>

          <template v-if="item.operateType === 'link'">
            <FormItem label="跳转链接地址" type="input" v-model="item.link" placeholder="请输入链接地址" margin-bottom="0"></FormItem>
          </template>
        </Form>
      </el-collapse-item>
    </el-collapse>
    <div class="add-btn"></div>
  </div>
</template>

<script>
import { ElComponents } from '../element-ui'
import { TitleDividev } from '../title-divider'
import { Form, FormItem } from '../form'
import { FiledEditor } from '../filed-editor'
import { formButtonItem, buttonOperateTypes } from '../../utils/formConfig'

export default {
  components: { ...ElComponents, TitleDividev, Form, FormItem, FiledEditor },
  props: {
    value: {},
  },
  data() {
    return {
      activeName: '0',
      operateTypeOptions: Object.values(buttonOperateTypes),
      btnTypeOptions: [
        { value: 'default', label: '默认（白）' },
        { value: 'primary', label: '主要（蓝）' },
        { value: 'secondary', label: '次要（蓝框）' },
        { value: 'success', label: '成功（绿）' },
        { value: 'info', label: '信息（灰）' },
        { value: 'warning', label: '警告（黄）' },
        { value: 'danger', label: '危险（红）' },
      ],
    }
  },
  methods: {
    add() {
      this.value.buttons.push({ ...formButtonItem })
    },
  },
}
</script>

<style scoped>
.dimple-lowcode-form-buttons {
  padding-right: 10px;
}
.dimple-lowcode-form-buttons .title {
  padding: 0;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dimple-lowcode-form-buttons .no-data {
  text-align: center;
  font-size: 14px;
  color: #333;
  padding: 20px;
}
.dimple-lowcode-form-buttons .add-btn {
  text-align: center;
  padding-top: 20px;
}

.dimple-lowcode-form-buttons .collapse-item-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

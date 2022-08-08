<template>
  <div>
    <Form label-length="10">
      <FormItem label="显示操作按钮" type="switch" v-model="value.submit.show"></FormItem>
      <FormItem label="操作按钮文本" type="input" v-model="value.submit.submitText"></FormItem>
      <FormItem label="操作行为" type="select" v-model="value.submit.submitType" :options="submitTypeOptions"></FormItem>
      <template v-if="value.submit.submitType === 'request'">
        <FormItem label="网络接口地址" type="input" v-model="value.submit.api"></FormItem>
        <FormItem label="表单字段名称" type="input" v-model="value.submit.formDataFiledName"></FormItem>
        <FormItem label="请求头">
          <FiledEditor v-model="value.submit.headers" :title="`请求头配置(共${value.submit.headers.length}字段)`">
            <el-button style="width: 100%" size="mini" icon="el-icon-edit">{{ value.submit.headers.length }}个字段</el-button>
          </FiledEditor>
        </FormItem> 
        <FormItem label="请求体">
          <FiledEditor v-model="value.submit.body" :title="`请求体配置(共${value.submit.body.length}字段)`">
            <el-button style="width: 100%" size="mini" icon="el-icon-edit">{{ value.submit.body.length }}个字段</el-button>
          </FiledEditor>
        </FormItem>
      </template>

      <template v-if="value.submit.submitType === 'link'">
        <FormItem label="跳转链接地址" type="input" v-model="value.submit.url"></FormItem>
      </template>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem } from '../form'
import { FiledEditor } from '../filedEditor'

export default {
  components: { Form, FormItem, FiledEditor },
  props: {
    value: {},
  },
  data() {
    return {
      submitTypeOptions: [
        { value: 'request', label: '发送网络请求' },
        { value: 'link', label: '跳转链接' },
      ],
    }
  },
}
</script>

<style scoped></style>

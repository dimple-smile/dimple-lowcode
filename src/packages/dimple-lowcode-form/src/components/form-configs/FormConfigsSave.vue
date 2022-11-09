<template>
  <div>
    <Form label-length="10">
      <FormItem label="网络接口地址" type="input" v-model="value.save.api"></FormItem>
      <FormItem label="请求头">
        <FiledEditor v-model="value.save.headers" :title="`请求头配置(共${value.save.headers.length}字段)`">
          <el-button style="width: 100%" size="mini" icon="el-icon-edit">{{value.save.headers.length}}个字段</el-button>
        </FiledEditor>
      </FormItem>
      <FormItem label="请求体">
        <FiledEditor v-model="value.save.body" :title="`请求体配置(共${value.save.body.length}字段)`">
          <el-button style="width: 100%" size="mini" icon="el-icon-edit">{{value.save.body.length}}个字段</el-button>
        </FiledEditor>
      </FormItem>
      <FormItem label="保存成功提示" type="input" v-model="value.save.successMsg"></FormItem>
      <FormItem label="报错失败提示" type="input" v-model="value.save.errorMsg"></FormItem>
    </Form>
  </div>
</template>

<script>
import { Form, FormItem } from '../form'
import { FiledEditor } from '../filed-editor'

export default {
  components: {  Form, FormItem, FiledEditor },
  props: {
    value: {},
  },
  data() {
    return {
    }
  },
}
</script>

<style scoped></style>

<template>
  <div>
    <!-- 表达基本配置 -->
    <FormItem label="组件名称">{{ value.name }}</FormItem>
    <template>
      <FormItem label="标签文本" type="input" v-model="value.formItemDefaultProps.label"></FormItem>
      <FormItem label="标签方向" type="select" v-model="value.formItemDefaultProps.labelPosition" :options="labelPositionOptions"></FormItem>
      <FormItem label="标签对齐方式" type="select" v-model="value.formItemDefaultProps.alignItems" :options="labelAlignItemsOptions"></FormItem>
      <FormItem label="显示标签" type="switch" v-model="value.formItemDefaultProps.labelVisible"></FormItem>
    </template>

    <FormItem label="默认值设置">
      <el-button style="width: 100%" @click="defaultValueDialogVisible = true" size="mini" icon="el-icon-edit">录入</el-button>
    </FormItem>
    <FormItem v-if="Object.keys(value.props).length" label="组件参数" align-items="flex-start">
      <template v-for="(item, key) in value.props">
        <div style="margin-bottom: 10px;">
          <el-button style="width: 100%; magirn-botton: 10px" @click="showPropsItemEditor(item)" size="mini" icon="el-icon-edit">{{ item.label }}</el-button>
        </div>
      </template>
    </FormItem>
    <FormItem label="隐藏该项" type="switch" v-model="value.config.hidden" tip="预览和发布时隐藏该项"></FormItem>

    <el-dialog v-if="value" append-to-body :close-on-click-modal="false" :title="`${value.formItemDefaultProps.label}-默认值录入`" :visible.sync="defaultValueDialogVisible" destroy-on-close>
      <Form>
        <FormItem label="录入模式" v-model="value.config.base.defaultValue.inputMode" type="select" :options="defaultValueInputOptions"> </FormItem>
        <div v-dimple-overlay style="max-height: 50vh">
          <template v-if="value.config.base.defaultValue.inputMode === 'default'">
            <Render v-if="defaultValueDialogVisible" v-model="value" :materials="materials" :append-props="value.defaultInputProps || {}" />
          </template>

          <template v-if="value.config.base.defaultValue.inputMode === 'input'">
            <FormItem label="默认值" type="input" v-model="value.value"></FormItem>
          </template>

          <template v-if="value.config.base.defaultValue.inputMode === 'urlParam'">
            <Form>
              <FormItem label="默认值映射" type="autocomplete" tip="请输入默认值对应的地址栏参数名称" v-model="value.config.base.defaultValue.urlParamName" :options="urlParamNameOptions"> </FormItem>
              <FormItem label="默认值预览" tip="如果当前地址栏有关联参数会显示对应值"> {{ getQueryByKey(value.config.base.defaultValue.urlParamName) || '-' }} </FormItem>
            </Form>
          </template>
        </div>
      </Form>
      <div style="text-align: right">
        <el-button size="mini" @click="defaultValueDialogVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="defaultValueDialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-if="value" append-to-body :close-on-click-modal="false" :title="`${value.formItemDefaultProps.label}-${currentPropsItem && currentPropsItem.label}-参数编辑`" :visible.sync="propsItemEditorDialogVisible" destroy-on-close>
      <Form v-if="currentPropsItem">
        <template v-if="currentPropsItem.editType === 'custom'">
          <Render v-if="propsItemEditorDialogVisible" v-model="currentPropsItem" :materials="materials" />
        </template>
        <template v-else>
          <OptionsEditor v-if="currentPropsItem.editType === 'options'" v-model="currentPropsItem" />
          <FormItem v-else :label-length="0" :type="currentPropsItem.editType" v-model="currentPropsItem.value" v-bind="currentPropsItem.defaultProps || {}"></FormItem>
        </template>
      </Form>
      <div style="text-align: right">
        <el-button size="mini" @click="propsItemEditorDialogVisible = false">取消</el-button>
        <el-button size="mini" type="primary" @click="propsItemEditorDialogVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { FormItem } from '../form'
import { Render } from '../render'
import OptionsEditor from '../options-editor/OptionsEditor.vue'
import { getQueryByKey } from '../../utils/getQueryByKey'
import { overlay } from '../../../../overlay';

export default {
  components: { FormItem, Render, OptionsEditor },
  props: {
    value: {},
    materials: {},
  },
  data() {
    return {
      labelPositionOptions: [
        { value: 'left', label: '左对齐' },
        { value: 'right', label: '右对齐' },
      ],
      labelAlignItemsOptions: [
        { value: 'center', label: '居中对齐' },
        { value: 'flex-start', label: '顶部对齐' },
        { value: 'flex-end', label: '底部对齐' },
      ],
      defaultValueInputOptions: [
        { value: 'default', label: '组件交互录入' },
        { value: 'input', label: '输入框录入' },
        { value: 'urlParam', label: '从地址栏参数获取' },
      ],
      urlParamNameOptions: [
        { value: 'mobile', label: 'mobile（手机号）' },
        { value: 'username', label: 'username（用户名）' },
        { value: 'projectId', label: 'projectId（项目id）' },
        { value: 'projectName', label: 'projectName（项目名）' },
        { value: 'projectCode', label: 'projectCode（项目编号）' },
      ],
      defaultValueDialogVisible: false,
      propsItemEditorDialogVisible: false,
      currentPropsItem: null,
    }
  },
  directives: {
    'dimple-overlay': overlay,
  },
  methods: {
    showPropsItemEditor(item) {
      this.propsItemEditorDialogVisible = true
      this.currentPropsItem = item
    },
    getQueryByKey,
  },
}
</script>

<style scoped></style>

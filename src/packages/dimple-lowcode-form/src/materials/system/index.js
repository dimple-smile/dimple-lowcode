import PcFormItem from './components/FormItem.vue'
import { FormItem } from '../../components/form'

import { valueTypes } from '../../utils/valueTypes'
import { editTypes } from '../../utils/editTypes'

const systemMaterials = () => [
  {
    key: 'mobile',
    name: '移动端组件库',
    tip: '移动端部分组件在桌面端预览可能无法交互，请尝试切换到移动端设备进行预览和调试',
    components: [
      {
        key: 'mobile.input',
        name: '输入框',
        component: FormItem,
        defaultProps: { type: 'mobile-input' },
        renderType: 'custom',
      },
      {
        key: 'mobile.float',
        name: '数字输入框',
        component: FormItem,
        defaultProps: { type: 'mobile-float' },
        renderType: 'custom',
      },
      {
        key: 'mobile.number',
        name: '整数输入框',
        component: FormItem,
        defaultProps: { type: 'mobile-number' },
        renderType: 'custom',
      },
      {
        key: 'mobile.tel',
        name: '手机号输入框',
        component: FormItem,
        defaultProps: { type: 'mobile-tel' },
        renderType: 'custom',

      },
      {
        key: 'mobile.text',
        name: '纯文本',
        component: FormItem,
        defaultProps: { type: 'mobile-text', alignItems: 'flex-start' },
        renderType: 'custom',

      },
      {
        key: 'mobile.textarea',
        name: '文本域',
        component: FormItem,
        defaultProps: { type: 'mobile-textarea' },
        renderType: 'custom',
      },
      {
        key: 'mobile.select',
        name: '下拉选择器',
        component: FormItem,
        defaultProps: { type: 'mobile-select' },
        renderType: 'custom',
        props: {
          options: { label: '选项列表', value: [], editType: editTypes.options },
        },
      },
      {
        key: 'mobile.radio',
        name: '单选框',
        component: FormItem,
        defaultProps: { type: 'mobile-radio', alignItems: 'flex-start' },
        renderType: 'custom',
        props: {
          options: { label: '选项列表', value: [], editType: editTypes.options },
        },
      },
      {
        key: 'mobile.checkbox-group',
        name: '多选框',
        component: FormItem,
        valueType: valueTypes.array.value,
        defaultProps: { type: 'mobile-checkbox-group', alignItems: 'flex-start' },
        renderType: 'custom',
        props: {
          options: { label: '选项列表', value: [], editType: editTypes.options },
        },
      },
      {
        key: 'mobile.switch',
        name: '开关',
        component: FormItem,
        valueType: valueTypes.boolean.value,
        renderType: 'custom',
        defaultProps: { type: 'mobile-switch' },
      },
      {
        key: 'mobile.time',
        name: '时间选择器',
        component: FormItem,
        renderType: 'custom',
        defaultProps: { type: 'mobile-time' },
      },
      {
        key: 'mobile.date',
        name: '日期选择器',
        component: FormItem,
        valueType: valueTypes.date.value,
        renderType: 'custom',
        defaultProps: { type: 'mobile-date' },
      },
      {
        key: 'mobile.datetime',
        name: '日期时间选择',
        component: FormItem,
        valueType: valueTypes.dateTime.value,
        renderType: 'custom',
        defaultProps: { type: 'mobile-datetime' },
      },
      {
        key: 'mobile.daterange',
        name: '日期范围选择',
        component: FormItem,
        valueType: valueTypes.dateRange.value,
        renderType: 'custom',
        defaultProps: { type: 'mobile-daterange' },
      },
      {
        key: 'mobile.datetimerange',
        name: '日期时间范围',
        component: FormItem,
        valueType: valueTypes.dateTimeRange.value,
        renderType: 'custom',
        defaultProps: { type: 'mobile-datetimerange' },
      },
    ],
  },
  {
    key: 'system',
    name: '桌面端组件库',
    components: [
      {
        key: 'system.input',
        name: '输入框',
        component: PcFormItem,
        defaultProps: { type: 'input' },
      },
      {
        key: 'system.text',
        name: '纯文本',
        component: PcFormItem,
        defaultProps: { type: 'text' },
      },
      {
        key: 'system.textarea',
        name: '文本域',
        component: PcFormItem,
        defaultProps: { type: 'textarea', alignItems: 'flex-start' },
        h: 3,
      },
      {
        key: 'system.select',
        name: '下拉选择器',
        component: PcFormItem,
        defaultProps: { type: 'select' },
        props: {
          options: { label: '选项列表', value: [], editType: editTypes.options },
        },
      },
      {
        key: 'system.radio',
        name: '单选框',
        component: PcFormItem,
        defaultProps: { type: 'radio', horizontalRadio: true },
        props: {
          options: { label: '选项列表', value: [], editType: editTypes.options },
        },
      },
      {
        key: 'system.checkbox-group',
        name: '多选框',
        component: PcFormItem,
        valueType: valueTypes.array.value,
        defaultProps: { type: 'checkbox-group', horizontalCheckbox: true },
        props: {
          options: { label: '选项列表', value: [], editType: editTypes.options },
        },
      },
      {
        key: 'system.switch',
        name: '开关',
        component: PcFormItem,
        valueType: valueTypes.boolean.value,
        defaultProps: { type: 'switch' },
      },
      {
        key: 'system.time',
        name: '时间选择器',
        component: PcFormItem,
        defaultProps: { type: 'time' },
      },
      {
        key: 'system.date',
        name: '日期选择器',
        component: PcFormItem,
        valueType: valueTypes.date.value,
        defaultProps: { type: 'date' },
      },
      {
        key: 'system.datetime',
        name: '日期时间选择',
        component: PcFormItem,
        valueType: valueTypes.dateTime.value,
        defaultProps: { type: 'datetime' },
      },
      {
        key: 'system.daterange',
        name: '日期范围选择',
        component: PcFormItem,
        valueType: valueTypes.dateRange.value,
        defaultProps: { type: 'daterange' },
      },
      {
        key: 'system.datetimerange',
        name: '日期时间范围',
        component: PcFormItem,
        valueType: valueTypes.dateTimeRange.value,
        defaultProps: { type: 'datetimerange' },
      },
    ],
  },
]

export { systemMaterials }

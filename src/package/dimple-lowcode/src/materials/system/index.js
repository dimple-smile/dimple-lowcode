import FormItem from './components/FormItem.vue'
import { editTypes } from '../../utils/editTypes'

export default () => [
  {
    key: 'system',
    name: '系统库',
    components: [
      {
        key: 'system.input',
        name: '输入框',
        component: FormItem,
        defaultProps: { type: 'input' },
      },
      {
        key: 'system.text',
        name: '纯文本',
        component: FormItem,
        defaultProps: { type: 'text' },
      },
      {
        key: 'system.textarea',
        name: '文本域',
        component: FormItem,
        defaultProps: { type: 'textarea' },
        h: 3,
      },
      {
        key: 'system.select',
        name: '下拉选择器',
        component: FormItem,
        defaultProps: { type: 'select' },
        props: {
          options: { label: '选项列表', value: [], editType: editTypes.options },
        },
      },
      {
        key: 'system.radio',
        name: '单选框',
        component: FormItem,
        defaultProps: { type: 'radio', horizontalRadio: true },
        props: {
          options: { label: '选项列表', value: [], editType: editTypes.options },
        },
      },
      {
        key: 'system.checkbox-group',
        name: '多选框',
        component: FormItem,
        defaultProps: { type: 'checkbox-group', horizontalCheckbox: true },
        props: {
          options: { label: '选项列表', value: [], editType: editTypes.options },
        },
      },
      {
        key: 'system.switch',
        name: '开关',
        component: FormItem,
        defaultProps: { type: 'switch' },
      },
      {
        key: 'system.time',
        name: '时间选择器',
        component: FormItem,
        defaultProps: { type: 'time' },
      },
      {
        key: 'system.date',
        name: '日期选择器',
        component: FormItem,
        defaultProps: { type: 'date' },
      },
      {
        key: 'system.datetime',
        name: '日期时间选择',
        component: FormItem,
        defaultProps: { type: 'datetime' },
      },
      {
        key: 'system.daterange',
        name: '日期范围选择',
        component: FormItem,
        defaultProps: { type: 'daterange' },
      },
      {
        key: 'system.datetimerange',
        name: '日期时间范围',
        component: FormItem,
        defaultProps: { type: 'datetimerange' },
      },
    ],
  },
]

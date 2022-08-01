import FormItem from '../components/form/FormItem.vue'

export default [
  {
    name: '系统库',
    key: 'system',
    components: [
      {
        name: '输入框',
        key: FormItem.name,
        component: FormItem,
        props: { type: 'input', label: '输入框', value: '' },
        config: {},
      },
      {
        name: '文本域',
        key: FormItem.name,
        component: FormItem,
        props: { type: 'textarea', label: '文本域', value: '' },
        h: 3,
        config: {},
      },
      {
        name: '下拉选择器',
        key: FormItem.name,
        component: FormItem,
        props: { type: 'select', label: '选择器', value: '', options: [{ label: '选项1', value: 0 }], placeholder: '请选择' },
        config: {
          propsConfig: { optionsEditorConfig: { show: true } },
        },
      },
      {
        name: '单选框',
        key: FormItem.name,
        component: FormItem,
        props: {
          type: 'radio',
          label: '单选项',
          value: '',
          options: [
            { label: '选项1', value: 0 },
            { label: '选项2', value: 1 },
          ],
          horizontalRadio: true,
        },
        config: {},
      },
      {
        name: '多选框',
        key: FormItem.name,
        component: FormItem,
        props: {
          type: 'checkbox-group',
          label: '多选框',
          value: '',
          options: [
            { label: '选项1', value: 0 },
            { label: '选项2', value: 1 },
          ],
          horizontalCheckbox: true,
        },
        config: {
          propsConfig: { optionsEditorConfig: { show: true } },
        },
      },
      {
        name: '开关',
        key: FormItem.name,
        component: FormItem,
        props: { type: 'switch', label: '开关', value: '' },
        config: {},
      },
      {
        name: '时间选择器',
        key: FormItem.name,
        component: FormItem,
        props: { type: 'time', label: '时间选择器', value: '' },
        config: {},
      },
      {
        name: '日期选择器',
        key: FormItem.name,
        component: FormItem,
        props: { type: 'date', label: '日期选择器', value: '' },
        config: {},
      },
      {
        name: '日期时间选择',
        key: FormItem.name,
        component: FormItem,
        props: { type: 'datetime', label: '日期时间选择', value: '' },
        config: {},
      },
      {
        name: '日期范围选择',
        key: FormItem.name,
        component: FormItem,
        props: { type: 'daterange', label: '日期范围选择', value: '' },
        config: {},
      },
      {
        name: '日期时间范围',
        key: FormItem.name,
        component: FormItem,
        props: { type: 'datetimerange', label: '日期时间范围', value: '' },
        config: {},
      },
    ],
  },
]

import uniqueId from 'lodash/uniqueId'
import { valueTypes } from './valueTypes'
export default () => {
  return {
    filedName: uniqueId(`${+new Date()}_`),
    key: '',
    name: '',
    component: '',
    valueType: valueTypes.string.value,
    value: '',
    props: {},
    defaultProps: {},
    formItemDefaultProps: {
      label: '标签',
      alignItems: '',
      labelVisible: true,
      required: false,
    },
    w: 1,
    h: 1,
    i: 'drop',
    config: {
      base: {
        show: true,
        name: '基础配置',
        defaultValue: { inputMode: 'default', urlParamName: '' },
      },
      validate: {
        show: true,
        visibility: true,
        name: '数据校验配置',
        disabled: false,
        requiredValidateMsg: '',
        min: null,
        minValidateMsg: '',
        max: null,
        maxValidateMsg: '',
        mode: 'and',
        rules: [],
      },
      filter: {
        show: true,
        name: '数据收集配置',
        visible: false,
        type: '',
      },
    },
  }
}

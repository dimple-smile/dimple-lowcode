import uniqueId from 'lodash/uniqueId'
import { valueTypes } from './valueTypes'

const componentConfig = () => {
  return {
    id: uniqueId(`${+new Date()}_`),
    filedName: uniqueId(`${+new Date()}_`),
    hideFiledName: false,
    name: '',
    component: '',
    valueType: valueTypes.string.value,
    value: '',
    containerStyle: {},
    style: {},
    props: {},
    defaultProps: {},
    formItemDefaultProps: {
      label: '标签',
      alignItems: '',
      labelVisible: true,
      required: false,
    },
    defaultInputProps: {},
    config: {
      base: {
        name: '基础配置',
        defaultValue: { inputMode: 'default', urlParamName: '' },
      },
      validate: {
        name: '数据校验配置',
        disabled: false,
        requiredValidateMsg: '必填',
        min: null,
        minValidateMsg: '',
        max: null,
        maxValidateMsg: '',
        mode: 'and',
        rules: [],
      },
      filter: {
        name: '数据收集配置',
        visible: false,
        type: '',
      },
    },
  }
}

export { componentConfig }

export default componentConfig

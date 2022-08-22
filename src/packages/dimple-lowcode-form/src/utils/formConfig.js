import uniqueId from 'lodash/uniqueId'

const buttonOperateTypes = {
  request: { value: 'request', label: '网络请求' },
  link: { value: 'link', label: '链接跳转' },
}

const requestParamModeTypes = {
  input: { value: 'input', label: '输入框输入' },
  urlParam: { value: 'urlParam', label: '从地址栏获取' },
}

const requestParamItem = {
  name: '',
  mode: requestParamModeTypes.input.value, // requestParamModeTypes.value
  value: '',
}

const formButtonItem = {
  id: uniqueId(`${+new Date()}_`),
  text: '按钮', // 按钮显示的文本
  btnType: 'default', // 按钮的类型：primary / success / warning / danger / info / text
  operateType: buttonOperateTypes.request.value, // 按钮的操作类型，见buttonOperateTypes
  api: '', // 按钮操作类型为网络请求时，请求的接口地址
  formDataFiledName: 'form', // 发起网络请求时表单数据的字段名
  successMsg: '发送成功', // 发起网络请求时发送成功的提示信息
  errorMsg: '发送失败', // 发起网络请求时发送失败的提示信息
  headers: [], // requestParamItem[]
  body: [], // requestParamItem[]
  link: '', // 按钮操作类型为链接跳转时，跳转的地址
}

const formConfig = () => {
  return {
    id: uniqueId(`${+new Date()}_`), // 表单id，不传会自动生成
    name: '', // 表单名称
    columnWidth: '100%', // 表单项的列度
    style: { padding: '20px' },
    formProps: {
      // 表单的配置
      labelLength: 8, // 表单下所有项目的文本宽度
      alignItems: 'center', // 表单下所有项目的内容对齐方向
      labelPosition: 'right', // 表单下所有项目的标签对齐方向
      // marginBottom: '20px', // 表单下所有项目的距离底部距离
    },
    buttons: [], // 表单的操作按钮组，可以配置多个，每一项都需要满足formButtonItem的配置
    save: { ...formButtonItem, text: '保存', btnType: 'primary' }, // 表单保存配置，和按钮配置formButtonItem一样
  }
}

export { formConfig, formButtonItem, requestParamItem, buttonOperateTypes, requestParamModeTypes }

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
  text: '按钮',
  btnType: 'default',
  operateType: buttonOperateTypes.request.value, // operateTypes.value
  api: '',
  link: '',
  formDataFiledName: 'form',
  successMsg: '发送成功',
  errorMsg: '发送失败',
  headers: [], // requestParamItem[]
  body: [], // requestParamItem[]
}

const formConfig = () => {
  return {
    id: uniqueId(`${+new Date()}_`),
    name: '',
    columnWidth: '100%',
    formProps: {
      labelLength: 8,
      alignItems: 'center',
      labelPosition: 'right',
      // marginBottom: '0',
    },
    buttons: [], // formButtonItem[]
    save: { ...formButtonItem, text: '保存', btnType: 'primary' },
  }
}

export { formConfig, formButtonItem, requestParamItem, buttonOperateTypes, requestParamModeTypes }

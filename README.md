<!-- Add banner here -->

# 简介
一款无额外心智负担的表单设计器。具有以下特点：

- 无额外运行时，支持嵌入任意业务系统
- 组件式引入，支持个性化的业务初始配置
- 极简的组件拓展方式，飞速拓展业务进行表单搭建
- 基于element-ui

# 组件效果预览
你有两种方式预览
- 使用浏览器访问该地址：https://dimple-lowcode.vercel.app 进行预览。
- 这个项目本身就是一个 vue-cli 项目，git clone该项目到本地后，npm i之后 npm run dev即可预览。

# 目录

- [简介](#简介)
- [组件效果预览](#组件效果预览)
- [目录](#目录)
- [安装](#安装)
- [使用说明](#使用说明)
    - [参数](#参数)
    - [插槽](#插槽)
    - [事件](#事件)
- [开发说明](#开发说明)
- [贡献](#贡献)
    - [赞助](#赞助)
- [许可证](#许可证)
- [最后](#最后)

# 安装
[(Back to top)](#目录)

```
// 1.该组件依赖于element-ui，首先保证项目内引用了element-ui

// 2.在命令行里执行
$ npm i @dimple-smile/dimple-lowcode

// 3.在你的代码里写
import { DimpleLowcodeForm } from '@dimple-smile/dimple-lowcode'
```

# 使用说明
[(Back to top)](#目录)

下面是一个简单的使用例子

> 在src/App.vue文件里能看到预览使用的栗子
```
<template>
  <div style="height: 100vh">
    <DimpleLowcodeForm :materials="materials" :config="config" :data="data" />
  </div>
</template>

<script>
import { DimpleLowcodeForm } from '@dimple-smile/dimple-lowcode'
export default {
  components: { DimpleLowcodeForm },
  data() {
    return {
      config: {},
      materials:[],
      data:[],
    }
  },
}
</script>
```
### 参数
[(Back to top)](#目录)
| 参数名 | <img width="180px" /> 意义 <img width="180px" /> | 类型 | <img width="120px" /> 默认值 <img width="120px" /> | 说明 |
| -| -| -| - | - |
| materials | 素材列表 | Array | [] | 会添加于系统库之后 |
| config | 配置项 | Object | {} | 可以填一些初始的表单配置 |
| data | 渲染的表单数据 | Array | [] | 用于预置渲染或者预览渲染表单页面 |
| preview | 是否为预览模式 | Boolean | null | 是否为预览模式 |
| saveRequestConfig | 保存时的自定义配置 | Function | null | 此配置为一个函数，会带上当前框架已经校验完成的axios请求配置 |
| btnRequestConfig | 按钮提交时的自定义配置 | Function | null | 此配置为一个函数，会带上当前框架已经校验完成的axios请求配置 |

```
// materials 配置示例
import { FormItem } from '@/components/form' 
import { 
  valueTypes, // 所有支持的数据类型
  editTypes, // 所有支持的参数编辑类型
} from '@dimple-smile/dimple-lowcode'

[
  {
    key: 'custom', 
    name: '业务组件库',
    components: [{
      key: 'custom.input', // 组件的key，必须保证全局唯一
      name: '业务输入框', // 组件的名称
      component: FormItem, // 组件的引用
      value: '', // 组件v-model的值，所有业务组件必须实现v-model
      valueType: valueTypes.string.value, // 数据类型，可以从valueTypes中获取支持的类型
      defaultProps: { type: 'input' }, // 组件的默认参数

      // props对象为当前组件可配置的参数列表，每一项的编辑类型可以从editTypes中选择，每一项的值会被赋予到组件的props中
      props: {
        options: { 
          label: '选项列表', // 参数的标签名称
          value: [], // 参数的值
          editType: editTypes.options // 编辑参数时使用的组件类型
        },
      },
    }]
  }
]
```

```
// config 配置

// 表单的默认配置，import { formConfig } from '@dimple-smile/dimple-lowcode'
const formConfig = () => {
  return {
    // id: '', // 表单id，不传会自动生成
    name: '', // 表单名称
    columnWidth: '100%', // 表单项的列度
    formProps: { // 表单的配置
      labelLength: 8, // 表单下所有项目的文本宽度
      alignItems: 'center', // 表单下所有项目的内容对齐方向
      labelPosition: 'right', // 表单下所有项目的标签对齐方向
      // marginBottom: '20px', // 表单下所有项目的距离底部距离
    },
    buttons: [], // 表单的操作按钮组，可以配置多个，每一项都需要满足formButtonItem的配置
    save: { ...formButtonItem, text: '保存', btnType: 'primary' }, // 表单保存配置，和按钮配置formButtonItem一样
  }
}

// 操作按钮的配置
const formButtonItem = {
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

// 按钮的操作类型 import { buttonOperateTypes } from '@dimple-smile/dimple-lowcode'
const buttonOperateTypes = {
  request: { value: 'request', label: '网络请求' },
  link: { value: 'link', label: '链接跳转' },
}
```
### 插槽
[(Back to top)](#目录)

| 参数名 | <img width="200px" /> 意义 <img width="200px" /> | 说明 |
| - | - | - |
| logo | logo处的插槽 | 默认为项目名称

### 事件
[(Back to top)](#目录)
| 参数名 | <img width="200px" /> 意义 <img width="200px" /> | 说明 |
| - | - | - |
| afterSave | 保存成功之后触发的事件 | 保存失败不会触发，参数为请求成功的返回值 |
| afterSaveError | 保存失败之后触发的方法事件 | 保存成功不会触发，参数为请求失败的返回值 |
| afterBtnRequest | 按钮请求提交成功之后触发的事件 | 提交失败不会触发，参数为请求成功的返回值 |
| afterBtnRequestError | 按钮请求提交失败之后触发的方法事件 | 提交成功不会触发，参数为请求失败的返回值 |

# 开发说明
[(Back to top)](#目录)

src文件夹存放着组件的全部源码。入口为src/packages/*

# 贡献
[(Back to top)](#目录)

@dimple-smile

### 赞助
[(Back to top)](#目录)

Love
# 许可证
[(Back to top)](#目录)

只要不商用，注明出处即可。

[GNU General Public License version 3](https://opensource.org/licenses/GPL-3.0)

# 最后
[(Back to top)](#目录)

谢谢你的使用~

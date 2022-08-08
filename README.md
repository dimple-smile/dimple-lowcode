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
import { DimpleLowcode } from '@dimple-smile/dimple-lowcode'
```

# 使用说明
[(Back to top)](#目录)

下面是一个简单的使用例子

> 在src/App.vue文件里能看到预览使用的栗子
```
<template>
  <div>
    <DimpleLowcode :materials="materials" :config="config" :data="data"></DimpleLowcode>
  </div>
</template>

<script>
import { DimpleLowcode } from '@dimple-smile/dimple-lowcode'
export default {
  components: { DimpleLowcode },
  data() {
    return {
      config: {},
      materials:[],
      data:[]
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
| data | 渲染的表单数据 | Array | [] | 用于渲染表单页面，如果数组长度大于0，则代表为预览模式 |
| preview | 是否为预览模式 | Boolean | null | 如果设置此属性，则根据此属性设置预览模式，否则根据data和组件内的操作按钮决定。 |

```
// materials 配置示例
import { FormItem } from '@/components/form' 
import { valueTypes, editTypes } from '@dimple-smile/dimple-lowcode'

[
  {
    key: 'custom', 
    name: '业务组件库',
    components: [{
      key: 'custom.input', // 组件的key，必须保证全局唯一
      name: '业务输入框', // 组件的名称
      component: FormItem, // 组件的引用
      value: '', // 组件v-model的值，所有业务组件必须实现v-model
      valueType: valueTypes.string.value,
      defaultProps: { type: 'input' }, // 组件的默认参数

      // props对象为当前组件可配置的参数列表，每一项的编辑类型可以从editTypes中选择，每一项的值会被赋予到组件的props中
      props: {
        options: { label: '选项列表', value: [], editType: editTypes.options },
      },
    }]
  }
]
```

```
// config 配置示例
{
  id: '', // 表单id
  formProps: {
    labelLength: 8, // 表单项统一的标签长度
    labelPosition: 'right', // [ right, left ] 表单项统一的标签方向
    alignItems: 'center', // [ flex-start, flex-end, center ] 表单项统一的标签和内容对齐的方向
  },
  submit: {
    show: true, // 是否显示提交按钮
    submitText: '提交', // 提交按钮文本
    submitType: 'request', // [ request, link ] 提交按钮执行的行为
    api: '', // 提交的接口地址，http or https接口地址
    link: '', // 跳转的地址，http or https地址
    formDataFiledName: 'form', // 提交时表单数据的字段名
    successMsg: '', // 提交成功时的提示信息
    errorMsg: '', // 提交失败时的提示信息
    headers: [], // 请求使用的headers参数，格式：[ { mode:'input or urlParam', name: '', value: '' } ]
    body: [], // 请求使用的body参数，格式：[ { mode:'input or urlParam', name: '', value: '' } ]
  },
  save: {
    api: '', // 保存的接口地址 http or https接口地址
    successMsg: '', // 保存成功时的提示信息
    errorMsg: '', // 保存失败时的提示信息
    headers: [], // 请求使用的headers参数，格式：[ { mode:'input or urlParam', name: '', value: '' } ]
    body: [], // 请求使用的body参数，格式：[ { mode:'input or urlParam', name: '', value: '' } ]
  },
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
| afterSubmit | 提交成功之后触发的事件 | 提交失败不会触发，参数为请求成功的返回值 |
| afterSubmitError | 提交失败之后触发的方法事件 | 提交成功不会触发，参数为请求失败的返回值 |
| afterSave | 保存成功之后触发的事件 | 保存失败不会触发，参数为请求成功的返回值 |
| afterSaveError | 保存失败之后触发的方法事件 | 保存成功不会触发，参数为请求失败的返回值 |

# 开发说明
[(Back to top)](#目录)

src文件夹存放着组件的全部源码。入口为src/package/dimple-lowcode

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

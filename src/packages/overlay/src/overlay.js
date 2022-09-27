import { createStyle } from './utils/style'
import { rpx } from './utils/rpx'

const createOverlayStyle = (className) => {
  const overlayHandleColor = 'rgba(153,153,153,0.30)'
  const overlayHandleActiveColor = 'rgba(153,153,153,0.50)'
  const size = rpx('16px')
  const padding = rpx('4px')

  return createStyle(className, [
    {
      className: `.${className}::-webkit-scrollbar`,
      style: {
        width: size,
        height: size,
        'background-color': 'transparent',
      },
    },
    {
      className: `.${className}::-webkit-scrollbar-corner`,
      style: {
        'background-color': 'rgba(0,0,0,0)',
      },
    },
    {
      className: `.${className}::-webkit-scrollbar-thumb:vertical`,
      style: {
        'border-radius': size,
        border: `${padding} solid rgba(0, 0, 0, 0)`,
        'background-clip': 'content-box',
        'background-color': `rgba(0,0,0,0)`,
      },
    },
    {
      className: `.${className}::-webkit-scrollbar-thumb:horizontal`,
      style: {
        'border-radius': size,
        border: `${padding} solid rgba(0, 0, 0, 0)`,
        'background-clip': 'content-box',
        'background-color': `rgba(0,0,0,0)`,
      },
    },

    {
      className: `.${className}:hover::-webkit-scrollbar`,
      style: {
        width: size,
        height: size,
        'background-color': 'transparent',
      },
    },
    {
      className: `.${className}:hover::-webkit-scrollbar-corner`,
      style: {
        'background-color': 'rgba(0,0,0,0)',
      },
    },
    {
      className: `.${className}:hover::-webkit-scrollbar-thumb:vertical`,
      style: {
        'border-radius': size,
        border: `${padding} solid rgba(0, 0, 0, 0)`,
        'background-clip': 'content-box',
        'background-color': `${overlayHandleColor}`,
      },
    },
    {
      className: `.${className}:hover::-webkit-scrollbar-thumb:vertical:hover`,
      style: {
        'background-color': `${overlayHandleActiveColor}`,
      },
    },
    {
      className: `.${className}:hover::-webkit-scrollbar-thumb:horizontal`,
      style: {
        'border-radius': size,
        border: `${padding} solid rgba(0, 0, 0, 0)`,
        'background-clip': 'content-box',
        'background-color': `${overlayHandleColor}`,
      },
    },
    {
      className: `.${className}:hover::-webkit-scrollbar-thumb:horizontal:hover`,
      style: {
        'background-color': `${overlayHandleActiveColor}`,
      },
    },
  ])
}

const getEl = (el, options) => {
  let res = el
  if (options.deep > 1) {
    const getChildren = (deep) => {
      if (deep === 1) return
      res = el.children[0]
      getChildren(deep - 1)
    }
    getChildren(options.deep)
  }

  if (options.target) {
    if (typeof options.target === 'string') res = options.target
    if (typeof options.target === 'function') res = options.target(el)
  }
  if (!res) return

  let visible = true
  if (options.visible !== undefined) {
    if (typeof options.visible === 'function') {
      visible = options.visible(el)
    } else {
      visible = options.visible
    }
  }
  if (!visible) return
  return res
}

const getVisible = (options) => {
  let visible = true
  if (options.visible !== undefined) {
    if (typeof options.visible === 'function') {
      visible = options.visible(el)
    } else {
      visible = options.visible
    }
  }
  if (visible === false) return { x: false, y: false }

  let x = true
  let y = true

  if (options.x !== undefined) {
    if (typeof options.x === 'function') {
      x = options.x(el)
    } else {
      x = options.x
    }
  }

  if (options.y !== undefined) {
    if (typeof options.y === 'function') {
      y = options.y(el)
    } else {
      y = options.y
    }
  }

  return { x, y }
}

const isBorderBox = (options) => {
  let res = { x: true, y: true }
  if (options.borderBox !== undefined) {
    if (options.borderBox.x !== undefined || options.borderBox.y !== undefined) {
      res.x = options.borderBox.x !== undefined ? options.borderBox.x : true
      res.y = options.borderBox.y !== undefined ? options.borderBox.y : true
    } else {
      res.x = options.borderBox
      res.y = options.borderBox
    }
  }
  return res
}

const isAutofocus = (options) => {
  let res = false
  if (options.autofocus !== undefined) {
    if (typeof options.autofocus === 'function') {
      res = options.autofocus(el)
    } else {
      res = options.autofocus
    }
  }
  return res
}

const reset = (el) => {
  // el.removeEventListener('mouseenter', el.overlay.mouseenter)
  // el.removeEventListener('mouseleave', el.overlay.mouseleave)
  const style = Object.values(document.styleSheets).find((item) => item.ownerNode.id === el.overlayClassId)
  style && style.ownerNode.remove()
  el.classList.remove(el.overlayClassId)
}

/**
 * 自定义滚动条样式工具
 * @param {*} el 绑定的dom
 * @param {*} binding 使用指令时对应binding，使用函数时对应options
 * @returns
 */
const overlay = async (el, binding, vnode) => {
  if (!el) return
  const options = (vnode ? binding.value : binding) || {}
  const currentEl = getEl(el, options)
  if (!currentEl) return
  if (currentEl.overlayInitLoading) return
  if (currentEl.overlayClassId) reset(currentEl)
  const className = `dimple-overlay-${+new Date()}`
  currentEl.overlayInitLoading = true
  await createOverlayStyle(className)
  currentEl.classList.add(className)
  const { x, y } = getVisible(options)
  const xOverflow = isBorderBox(options).x ? 'overlay' : 'auto'
  const yOverflow = isBorderBox(options).y ? 'overlay' : 'auto'
  currentEl.style['overflow-x'] = x ? xOverflow : 'hidden'
  currentEl.style['overflow-y'] = y ? yOverflow : 'hidden'
  currentEl.overlayClassId = className
  currentEl.overlayInitLoading = false
}

export { overlay, createOverlayStyle }

export type RpxFun<T> = (
  /**
   * 入参的px值，支持数字或带px单位
   */
  pxVlaue: number | string,

  /**
   * 配置项
   */
  options?: {
    /**
     * 转换的类型：默认width
     */
    type?: 'width' | 'height'

    /**
     * 基础变换的值
     */
    base?: number

    /**
     * 当前设备宽度或高度
     */
    currentBase?: number

    /**
     * 默认为3：计算结果保留的小数位数
     */
    precision?: number
  }
) => T

export type Px2vwFun<T> = (
  /**
   * 入参的px值，支持数字或带px单位
   */
  pxVlaue: number | string,

  /**
   * 配置项
   */
  options?: {
    /**
     * 默认为1920：基础变换的设备宽度
     */
    baseClientWidth?: number

    /**
     * 默认为3：计算结果保留的小数位数
     */
    precision?: number
  }
) => T

export type Px2vhFun<T> = (
  /**
   * 入参的px值，支持数字或带px单位
   */
  pxVlaue: number | string,

  /**
   * 配置项
   */
  options?: {
    /**
     * 默认为1080：基础变换的设备高度
     */
    baseClientHeight?: number

    /**
     * 默认为3：计算结果保留的小数位数
     */
    precision?: number
  }
) => T

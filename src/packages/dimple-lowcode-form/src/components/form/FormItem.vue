<template>
  <div style="position: relative" :style="{ height: computedHeight }">
    <div
      class="dimple-lowcode-form-item"
      :class="[type, isMoibile ? 'mobile' : '']"
      :style="{ alignItems: computeAlignItems, marginBottom: computeMarginBottom ? computeMarginBottom : undefined, height: computedHeight }"
    >
      <div v-if="computedLabelWidth !== '0px'" class="label" :class="[computeLabelPosition]" :style="{ width: computedLabelWidth }">
        <span v-if="required" class="required-icon">*</span>
        <slot name="label">
          <span>{{ label }}</span>
        </slot>
        <el-tooltip v-if="tip" class="item" effect="dark" :content="tip" placement="top">
          <span class="tip-icon el-icon-warning"></span>
        </el-tooltip>
      </div>
      <div
        v-if="!isMoibileTextArea"
        class="content"
        :class="[computedContentWidth !== '100%' ? computedSize : '']"
        :style="{ width: computedContentWidth !== '100%' ? computedContentWidth : '', flex: computedContentWidth === '100%' ? '1' : '', height: computedHeight }"
      >
        <el-input
          v-if="type === types.input"
          v-model="innerValue"
          v-bind="$attrs"
          :type="inputType"
          :placeholder="placeholder || '请输入'"
          :size="computedSize"
          :disabled="disabled"
          clearable
          @input="handleInput"
          @change="change"
        ></el-input>
        <el-input
          v-if="type === types.number"
          v-model="innerValue"
          v-bind="$attrs"
          :placeholder="placeholder || '请输入'"
          :size="computedSize"
          :disabled="disabled"
          clearable
          @input="handleNumberInput"
          @change="handleNumberInputChange"
          @blur="handleNumberBlur"
        ></el-input>
        <el-input
          v-if="type === types.float"
          v-model="innerValue"
          v-bind="$attrs"
          :placeholder="placeholder || '请输入'"
          :size="computedSize"
          :disabled="disabled"
          clearable
          @input="handleFloatInput"
          @blur="handleNumberBlur"
        ></el-input>
        <el-input
          v-if="type === types.textarea"
          v-model="innerValue"
          type="textarea"
          show-word-limit
          :autosize="{ minRows: 5, maxRows: 5 }"
          :maxlength="$attrs.maxlength || 50"
          clearable
          v-bind="$attrs"
          :placeholder="placeholder || '请输入'"
          :size="computedSize"
          :disabled="disabled"
          @change="change"
        ></el-input>
        <el-switch v-else-if="type === types.switch" v-model="innerValue" :placeholder="placeholder" :size="computedSize" :disabled="disabled" v-bind="$attrs" @change="change"></el-switch>
        <template v-else-if="type === types.radio">
          <el-radio-group class="radio-group" v-model="innerValue" @change="change" :disabled="disabled">
            <el-radio
              :disabled="disabled"
              class="radio"
              v-for="item in computeOptions"
              :label="item[optionsValueKey]"
              :key="item[optionsValueKey]"
              :style="horizontalRadio ? 'margin-bottom: 0' : ''"
              >{{ item[optionsLabelKey] }}</el-radio
            >
          </el-radio-group>
        </template>
        <template v-else-if="type === types.select">
          <el-select
            class="select"
            popper-class="aiot-form-item-select"
            v-model="innerValue"
            :placeholder="placeholder || '请选择'"
            @change="change"
            :size="computedSize"
            :disabled="disabled"
            v-bind="$attrs"
            clearable
          >
            <el-option v-for="item in computeOptions" :key="item[optionsValueKey]" :label="item[optionsLabelKey]" :value="item[optionsValueKey]"> </el-option>
          </el-select>
        </template>
        <template v-else-if="type === types['checkbox-group']">
          <el-checkbox-group v-model="innerValue" :disabled="disabled" @change="change">
            <el-checkbox
              class="checkbox"
              v-for="item in computeOptions"
              :key="item[optionsValueKey]"
              :label="item[optionsValueKey]"
              :disabled="disabled"
              :style="horizontalCheckbox ? 'margin-bottom: 0' : ''"
            >
              {{ item[optionsLabelKey] }}
            </el-checkbox>
          </el-checkbox-group>
        </template>
        <template v-else-if="type === types['amount-input']">
          <amount-input v-model="innerValue" :size="computedSize" :disabled="disabled" :placeholder="placeholder" @change="change"></amount-input>
        </template>
        <template v-else-if="type === types['amount-text']">
          <amount-text :value="innerValue"></amount-text>
        </template>
        <template v-else-if="type === types['time']">
          <el-time-select
            v-model="innerValue"
            style="width: 100%"
            :size="computedSize"
            :placeholder="placeholder || '时间'"
            :value-format="$attrs['value-format'] || $attrs['valueFormat'] || 'timestamp'"
            v-bind="$attrs"
            @change="change"
          >
          </el-time-select>
        </template>
        <template v-else-if="type === types['date']">
          <el-date-picker
            v-model="innerValue"
            style="width: 100%"
            type="date"
            :size="computedSize"
            :placeholder="placeholder || '日期'"
            :value-format="$attrs['value-format'] || $attrs['valueFormat'] || 'timestamp'"
            v-bind="$attrs"
            @change="change"
          >
          </el-date-picker>
        </template>
        <template v-else-if="type === types['datetime']">
          <el-date-picker
            v-model="innerValue"
            style="width: 100%"
            type="datetime"
            :size="computedSize"
            :placeholder="placeholder || '日期时间'"
            :default-time="$attrs['default-time'] || $attrs['defaultTime'] || '23:59:59'"
            :value-format="$attrs['value-format'] || $attrs['valueFormat'] || 'timestamp'"
            v-bind="$attrs"
            @change="change"
          >
          </el-date-picker>
        </template>
        <template v-else-if="type === types['daterange']">
          <el-date-picker
            v-model="innerValue"
            style="width: 100%"
            type="daterange"
            :size="computedSize"
            :placeholder="placeholder || '日期范围'"
            :range-separator="$attrs['range-separator'] || $attrs['rangeSeparator'] || '至'"
            :start-placeholder="$attrs['start-placeholder'] || $attrs['startPlaceholder'] || '开始日期'"
            :end-placeholder="$attrs['end-placeholder'] || $attrs['endPlaceholder'] || '结束日期'"
            :value-format="$attrs['value-format'] || $attrs['valueFormat'] || 'timestamp'"
            :format="$attrs['format'] || 'yyyy-MM-dd'"
            v-bind="$attrs"
            @change="change"
          >
          </el-date-picker>
        </template>
        <template v-else-if="type === types['datetimerange']">
          <el-date-picker
            v-model="innerValue"
            style="width: 100%"
            type="datetimerange"
            :size="computedSize"
            :placeholder="placeholder || '日期时间范围'"
            :range-separator="$attrs['range-separator'] || $attrs['rangeSeparator'] || '至'"
            :start-placeholder="$attrs['start-placeholder'] || $attrs['startPlaceholder'] || '开始日期时间'"
            :end-placeholder="$attrs['end-placeholder'] || $attrs['endPlaceholder'] || '结束日期时间'"
            :default-time="$attrs['default-time'] || $attrs['defaultTime'] || ['00:00:00', '23:59:59']"
            :value-format="$attrs['value-format'] || $attrs['valueFormat'] || 'timestamp'"
            :format="$attrs['format'] || 'yyyy-MM-dd HH:mm:ss'"
            v-bind="$attrs"
            @change="change"
          >
          </el-date-picker>
        </template>
        <template v-else-if="type === types['text']">
          <div style="width: 100%">
            {{ value }}
          </div>
        </template>
        <template v-else-if="type === types['autocomplete']">
          <el-autocomplete
            style="width: 100%"
            v-model="innerValue"
            v-bind="$attrs"
            v-on="$listeners"
            :size="computedSize"
            :fetch-suggestions="querySearch"
            :placeholder="placeholder || '请输入'"
            clearable
            @select="autocompleteChange"
          >
            <template #default="{ item }">
              <span>{{ item[optionsLabelKey] }}</span>
            </template>
          </el-autocomplete>
        </template>
        <template v-else-if="type === 'custom'">
          <slot></slot>
        </template>
        <template v-else-if="isMoibile">
          <FormItemMoibile
            v-model="innerValue"
            :type="type.replace('mobile-', '')"
            :options="computeOptions"
            :optionsLabelKey="optionsLabelKey"
            :optionsValueKey="optionsValueKey"
            :placeholder="placeholder"
            v-bind="$attrs"
            @change="change"
          />
        </template>
        <slot v-else></slot>
        <div v-if="innerError" class="error-message" :class="{ block: blockMessage, inline: !blockMessage }">
          <i class="iconfont icontishixinxi error-message-icon"></i>
          {{ innerError }}
        </div>
        <div v-if="$slots.append" class="error-message inline">
          <slot name="append"></slot>
        </div>
      </div>
    </div>
    <div v-if="isMoibileTextArea" class="mobile-textare-border"></div>
    <template v-if="isMoibileTextArea">
      <FormItemMoibile
        v-model="innerValue"
        :type="type.replace('mobile-', '')"
        :options="computeOptions"
        :optionsLabelKey="optionsLabelKey"
        :optionsValueKey="optionsValueKey"
        :placeholder="placeholder"
        v-bind="$attrs"
        @change="change"
      />
    </template>
    <div v-if="isMoibile && bottomBorder" class="mobile-border-bottom"></div>
  </div>
</template>

<script>
import { resizeObserver } from '../../utils/resizeObserver'
import FormItemMoibile from './FormItemMoibile.vue'

const types = {
  text: 'text',
  input: 'input',
  autocomplete: 'autocomplete',
  number: 'number',
  float: 'float',
  textarea: 'textarea',
  switch: 'switch',
  radio: 'radio',
  select: 'select',
  'checkbox-group': 'checkbox-group',
  time: 'time',
  date: 'date',
  datetime: 'datetime',
  daterange: 'daterange',
  datetimerange: 'datetimerange',
}

export default {
  name: 'FormItem',
  components: {
    FormItemMoibile,
  },
  props: {
    type: { type: String, default: '' },
    inputType: { type: String, default: '' },
    label: { type: String, default: '' },
    labelVisible: { type: Boolean, default: true },
    labelLength: { type: [String, Number], default: '' },
    labelPosition: { type: String, default: '' },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    options: { type: [Array, Object], default: () => [] },
    optionsLabelKey: { type: String, default: 'label' },
    optionsValueKey: { type: String, default: 'value' },
    value: { type: [String, Boolean, Number, Array], default: undefined },
    size: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    error: { type: String, default: '' },
    tip: { type: String, default: '' },
    blockMessage: { type: Boolean, default: false },
    contentWidth: { type: [String, Number], default: '' },
    alignItems: { type: String, default: 'center' },
    marginBottom: { type: String, default: '' },
    horizontalRadio: { type: Boolean, default: false },
    horizontalCheckbox: { type: Boolean, default: false },
    // inputFilterString: { type: Array, default: () => [',', '。', '，', '!', '$', '^', '`', '、'] },
    inputFilterString: { type: Array, default: () => [] },
    bottomBorder: { type: Boolean, default: true },
    mobile: { type: Boolean, default: false },
    height: { type: String, default: 'auto' },
  },
  data() {
    return {
      clientWidth: document.documentElement.clientWidth,
      types,
      innerValue: '',
      innerError: '',
    }
  },
  computed: {
    form() {
      let parent = this.$parent
      let parentName = parent.$options._componentTag
      while (!['DimpleLowcodeForm', 'dimple-lowcode-form', 'Form'].includes(parentName)) {
        parent = parent.$parent
        parentName = parent.$options._componentTag
      }
      return parent
    },
    computedHeight() {
      if (this.height !== 'auto') return this.height
      return undefined
    },
    isMoibile() {
      return this.type.indexOf('mobile') > -1 || this.mobile
    },
    isMoibileTextArea() {
      return this.type.indexOf('mobile-textarea') > -1
    },
    computedSize() {
      return this.size || this.form.size || 'mini'
    },
    computedLabelWidth() {
      if (!this.labelVisible) return '0px'
      const labelUnitWidth = 14
      const baseViewportWidth = 1920
      let scaleLabelUnitWidth = (labelUnitWidth * this.clientWidth) / baseViewportWidth
      if (scaleLabelUnitWidth < 12) scaleLabelUnitWidth = 12
      const currentLabelLength = this.labelLength !== undefined && this.labelLength !== '' ? this.labelLength : this.form.labelLength
      const labelLength = Number(currentLabelLength)

      const res = scaleLabelUnitWidth * labelLength + 'px'
      return res
    },
    computedContentWidth() {
      return this.px2vw(this.contentWidth || this.form.contentWidth || '')
    },
    computeLabelPosition() {
      return this.labelPosition || this.form.labelPosition || 'left'
    },
    computeAlignItems() {
      if (this.blockMessage) return this.form.alignItems || 'flex-start'
      if (this.type === types.textarea) return this.form.alignItems || 'flex-start'
      return this.alignItems || this.form.alignItems || 'center'
    },
    computeMarginBottom() {
      if (this.isMoibile) return this.px2vw(this.marginBottom || '')
      return this.px2vw(this.marginBottom || this.form.marginBottom || '20px')
    },
    computeOptions() {
      if (Array.isArray(this.options)) return this.options
      const res = []
      for (const key in this.options) {
        const item = this.options[key]
        let pushItemKey = item[this.optionsValueKey] || key
        if (!isNaN(pushItemKey)) pushItemKey = Number(pushItemKey)
        const pushItem = {
          [this.optionsValueKey]: pushItemKey,
          [this.optionsLabelKey]: item[this.optionsLabelKey] || item,
        }
        res.push(pushItem)
      }
      return res
    },
  },
  watch: {
    value: {
      handler: function (newValue) {
        if (newValue === this.innerValue) return
        this.innerValue = newValue
      },
      immediate: true,
    },
    error: {
      handler: function (newValue) {
        if (newValue === this.innerError) return
        this.innerError = newValue
      },
      immediate: true,
    },
    innerValue() {
      this.resetError()
    },
  },

  methods: {
    resetError() {
      this.innerError = ''
      this.$emit('update:error', '')
    },
    handleInput(value) {
      const inputFilterString = this.inputFilterString
      let filterValue = value
      // filterValue = value.replace(/\s*/g, '')
      for (const item of inputFilterString) {
        filterValue = filterValue.replace(item, '')
      }
      this.innerValue = filterValue
    },
    change(e) {
      this.resetError()
      this.$emit('change', e)
      this.$emit('input', e)
    },
    px2vw(px) {
      if (!px) return px
      if (px.toString().indexOf('%') > -1) return px
      const pxNumber = Number(px.toString().replace('px', ''))
      if (Number.isNaN(pxNumber)) return px
      return Number(((100 * pxNumber) / 1920).toFixed(3)) + 'vw'
    },
    handleNumberInput(value) {
      this.resetError()
      const { max = Number.MAX_SAFE_INTEGER, min = 0 } = this.$attrs
      const innerValue = value
        .toString()
        .replace(/[^0-9-]+/, '')
        .replace('.', '')
      if (value.toString().indexOf('.') > -1) return (this.innerValue = innerValue)
      if (value.toString().indexOf('e') > -1) return (this.innerValue = innerValue)
      if (Number.isNaN(Number(value))) return (this.innerValue = innerValue)
      if (Number(value) > Number(max)) return (this.innerValue = max)
      // if (Number(value) < Number(min)) return (this.innerValue = min)
    },
    handleNumberBlur() {
      const { min = 0 } = this.$attrs

      let value = ''
      if (this.innerValue === '') value = ''
      if (this.innerValue !== '') value = Number(this.innerValue)
      if (Number(value) < Number(min)) {
        value = Number(min)
        this.innerValue = min
      }
      this.change(value)
    },
    handleNumberInputChange(e) {
      const { min = 0 } = this.$attrs
      let value = ''
      if (this.innerValue === '') value = ''
      if (this.innerValue !== '') value = Number(this.innerValue)
      if (Number(value) < Number(min)) {
        value = Number(min)
        this.innerValue = min
      }
      this.change(value)
    },
    handleFloatInput(value) {
      this.resetError()
      const { max = Number.MAX_SAFE_INTEGER, min = 0 } = this.$attrs
      const innerValue = value.toString().replace(/[^0-9-]+/, '')
      if (value.toString().indexOf('e') > -1) return (this.innerValue = innerValue)
      if (Number.isNaN(Number(value))) return (this.innerValue = innerValue)
      if (Number(value) > Number(max)) return (this.innerValue = max)
      if (Number(value) < Number(min)) return (this.innerValue = min)
    },
    isEmpty(obj) {
      const reg = new RegExp('^[ ]+$')
      if (typeof obj === 'undefined' || obj === null || obj === '' || reg.test(obj)) return true
      return false
    },
    querySearch(queryString, cb) {
      const options = this.options || []
      const text = queryString.toLowerCase()
      const results = queryString
        ? options.filter((item) => {
            const label = item[this.optionsLabelKey].toLowerCase()
            const value = item[this.optionsValueKey].toLowerCase()
            return label.indexOf(text) > -1 || value.indexOf(text) > -1
          })
        : options
      cb(results)
    },
    autocompleteChange(item) {
      this.change(item[this.optionsValueKey])
    },
  },
  created() {
    if (this.type === types['checkbox-group']) this.innerValue = []
    if (this.type === types['datetimerange']) this.innerValue = []
  },
  mounted() {
    this.resizeObserver = resizeObserver(({ width, height }) => {
      this.clientWidth = width
      this.clientHeight = height
    })
  },
  destroyed() {
    this.resizeObserver.disconnect()
  },
}
</script>

<style scoped>
.dimple-lowcode-form-item {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.dimple-lowcode-form-item.mobile {
  background: #fff;
  min-height: 48px;
}

.label {
  margin-right: 10px;
  height: 30px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  color: #333333;
  font-size: 14px;
}

.dimple-lowcode-form-item.mobile .label {
  padding-left: 15px;
  height: 48px;
}

.label.right {
  justify-content: flex-end;
}
.label.left {
  justify-content: flex-start;
}

.mobile-border-bottom {
  position: absolute;
  left: 15px;
  right: 0;
  bottom: 0;
  height: 1px;
  background: #e5e5e5;
  transform: scaleY(0.5);
  /* background: #ebedf0; */
}

.mobile-textare-border {
  position: absolute;
  left: 15px;
  top: 47px;
  right: 0;
  height: 1px;
  background: #e5e5e5;
  transform: scaleY(0.5);
  /* background: #ebedf0; */
}

.required-icon {
  margin-right: 5px;
  margin-top: 5px;
  color: #dd3914;
}
.tip-icon {
  color: #999999;
}

.content {
  position: relative;
  word-wrap: break-word;
  overflow: visible;
}
.select {
  width: 100%;
}
.content .se {
  width: 160px;
}
.content .mini {
  width: 320px;
}
.content .mini .radio-group {
  margin-top: 4px;
}
.content .mini .radio {
  margin-bottom: 16px;
}
.content .mini .checkbox {
  margin-bottom: 16px;
}

.content .small {
  width: 480px;
}
.content .medium {
  width: 720px;
}
.aiot-confirm-button {
  border: 1px solid #4066e2 !important;
}
.aiot-confirm-button:hover {
  border: 1px solid #4066e2 !important;
}
.aiot-confirm-button:active {
  border: 1px solid #4066e2 !important;
}
.aiot-confirm-button:focus {
  border: 1px solid #4066e2 !important;
}
.error-message {
  display: flex;
  align-items: center;
  color: #dd3914;
}

.error-message .tip {
  color: #999999;
}
.error-message .inline {
  position: absolute;
  top: 0;
  left: calc(100% + 10px);
  height: 100%;
  white-space: nowrap;
}
.error-message .block {
  margin-top: 10px;
}
.error-message-icon {
  margin-right: 10px;
}
</style>

<style>
/* 有全局样式被覆盖了，这里处理一下 */
.dimple-lowcode-form-item .el-textarea__inner {
  font-size: 15px !important;
  resize: none;
}
.dimple-lowcode-form-item .el-range-input {
  font-size: 14px !important;
}
</style>

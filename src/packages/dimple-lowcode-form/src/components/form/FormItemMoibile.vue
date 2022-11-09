<!--
 * @Author: xiechaopeng
 * @Date: 2021-06-15 09:56:15
 * @Description: Aiot表单项
-->
<template>
  <div class="dimple-lowcode-form-item-mobile">
    <template v-if="type === types.input">
      <van-field clickable v-model="innerValue" :placeholder="placeholder || '请输入'" clearable @input="change" />
    </template>
    <template v-if="type === types.number">
      <van-field clickable v-model="innerValue" type="digit" :placeholder="placeholder || '请输入整数'" clearable @input="change" />
    </template>
    <template v-if="type === types.float">
      <van-field clickable v-model="innerValue" type="number" :placeholder="placeholder || '请输入数字'" clearable @input="change" />
    </template>
    <template v-if="type === types.tel">
      <van-field clickable v-model="innerValue" type="tel" :placeholder="placeholder || '请输入手机号'" clearable @input="change" />
    </template>
    <template v-if="type === types.textarea">
      <van-field v-model="innerValue" type="textarea" :rows="rows" :placeholder="placeholder || '请输入'" show-word-limit clearable :maxlength="maxlength" v-bind="$attrs" @input="change" />
    </template>
    <template v-if="type === types.switch">
      <van-field class="switch">
        <template #input>
          <van-switch v-model="innerValue" size="20" :active-color="primary" inactive-color="#dcdee0" v-bind="$attrs" @change="change" />
        </template>
      </van-field>
    </template>
    <template v-if="type === types.radio">
      <van-field class="radio">
        <template #input>
          <van-radio-group v-model="innerValue" :checked-color="primary" direction="horizontal" v-bind="$attrs" @change="change">
            <template v-for="item in options">
              <van-radio :name="item[optionsValueKey]" style="margin-bottom: 10PX">
                <div class="radio-text">{{ item[optionsLabelKey] }}</div>
              </van-radio>
            </template>
          </van-radio-group>
        </template>
      </van-field>
    </template>
    <template v-if="type === types['checkbox-group']">
      <van-field class="checkbox-group">
        <template #input>
          <van-checkbox-group v-model="innerValue" :checked-color="primary" direction="horizontal" v-bind="$attrs" @change="change">
            <template v-for="item in options">
              <van-checkbox :name="item[optionsValueKey]" shape="square" style="margin-bottom: 10PX">
                <div class="checkbox-text">{{ item[optionsLabelKey] }}</div>
              </van-checkbox>
            </template>
          </van-checkbox-group>
        </template>
      </van-field>
    </template>

    <template v-if="type === types['select']">
      <van-field
        class="select"
        readonly
        clickable
        name="picker"
        :value="activeSelectItem && activeSelectItem[optionsLabelKey]"
        :placeholder="placeholder || '请点击选择'"
        is-link
        v-bind="$attrs"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="selectPickerOptions" @confirm="onSelectChange" @cancel="showPicker = false" />
      </van-popup>
    </template>

    <template v-if="type === types['time']">
      <van-field class="time" readonly clickable is-link :value="innerValue" :placeholder="placeholder || '点击选择时间'" @click="showPicker = true" />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker v-model="innerValue" type="time" @confirm="onTimeChange" @cancel="showPicker = false" />
      </van-popup>
    </template>

    <template v-if="type === types['date']">
      <van-field class="time" readonly clickable is-link :border="false" :value="dateFormat(innerValue)" :placeholder="placeholder || '点击选择日期'" @click="showPicker = true" />
      <van-calendar
        v-model="showPicker"
        :color="primary"
        :default-date="innerValue ? new Date(dayjs(innerValue)) : new Date()"
        :minDate="new Date(2010, 0, 1)"
        @confirm="onDateChange"
        @cancel="showPicker = false"
      />
    </template>

    <template v-if="type === types['datetime']">
      <van-field class="time" readonly clickable is-link :border="false" :value="dateTimeFormat(innerValue)" :placeholder="placeholder || '点击选择日期时间'" @click="showPicker = true" />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker v-model="currentDateTime" :color="primary" type="datetime" @confirm="onDateTimeChange" @cancel="showPicker = false" />
      </van-popup>
    </template>

    <template v-if="type === types['daterange']">
      <van-field class="time" readonly clickable is-link :border="false" :value="dateRangeFormat(innerValue)" :placeholder="placeholder || '点击选择日期范围'" @click="showPicker = true" />
      <van-calendar v-model="showPicker" type="range" :color="primary" @confirm="onDateRangeChange" @cancel="showPicker = false" />
    </template>

    <template v-if="type === types['datetimerange']">
      <van-field class="time" readonly clickable is-link :border="false" :value="dateTimeRangeFormat(innerValue)" :placeholder="placeholder || '点击选择日期时间范围'" @click="showPicker = true" />
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker v-model="currentDateTimeRangeStart" title="开始日期时间" :color="primary" type="datetime" @confirm="onDateTimeRangeChange" @cancel="showPicker = false" />
        <van-datetime-picker v-model="currentDateTimeRangeEnd" title="结束日期时间" :color="primary" type="datetime" confirm-button-text="_" cancel-button-text="_" />
      </van-popup>
    </template>

    <template v-else-if="type === types['text']">
      <div class="text">
        {{ value }}
      </div>
    </template>

    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
import { Form, Field, Switch, Radio, RadioGroup, Checkbox, CheckboxGroup, Popup, Picker, DatetimePicker, Calendar, CellGroup } from 'vant'
import dayjs from 'dayjs'
const VantComponents = {}
;[Form, Field, Switch, Radio, RadioGroup, Checkbox, CheckboxGroup, Popup, Picker, DatetimePicker, Calendar, CellGroup].map((item) => {
  VantComponents[item.name] = item
})

const types = {
  text: 'text',
  input: 'input',
  number: 'number',
  tel: 'tel',
  float: 'float',
  textarea: 'textarea',
  switch: 'switch',
  radio: 'radio',
  'checkbox-group': 'checkbox-group',
  select: 'select',
  time: 'time',
  date: 'date',
  datetime: 'datetime',
  daterange: 'daterange',
  datetimerange: 'datetimerange',
}

export default {
  name: 'FormItemMobile',
  components: {
    ...VantComponents,
  },
  props: {
    value: {},
    type: { type: String, default: '' },
    direction: { type: String, default: 'horizontal' },
    options: { type: Array, default: () => [] },
    optionsLabelKey: { type: String, default: 'label' },
    optionsValueKey: { type: String, default: 'value' },
    placeholder: { type: String, default: '' },
    rows: { type: Number, default: 4 },
    maxlength: { type: Number, default: 500 },
  },
  data() {
    return {
      dayjs,
      innerValue: '',
      primary: '#006DF1',
      types,
      showPicker: false,
      currentDateTime: new Date(),
      currentDateTimeRangeStart: new Date(),
      currentDateTimeRangeEnd: new Date(),
    }
  },
  computed: {
    activeSelectItem() {
      return this.options.find((item) => item[this.optionsValueKey] === this.innerValue)
    },
    selectPickerOptions() {
      let res = this.options || []
      const defaultIndex = res.findIndex((item) => item[this.optionsValueKey] === this.innerValue)
      return [
        {
          defaultIndex,
          values: res.map((item) => ({ ...item, text: item[this.optionsLabelKey] })),
        },
      ]
    },
  },
  watch: {
    value: {
      handler: function (newValue) {
        if (newValue === this.innerValue) return
        if (this.type === types.datetime && newValue) this.currentDateTime = dayjs(newValue)
        this.innerValue = newValue
      },
      immediate: true,
    },
  },
  methods: {
    change(e) {
      this.$emit('change', e)
    },
    onSelectChange(e) {
      this.showPicker = false
      this.innerValue = e[0][this.optionsValueKey]
      this.change(this.innerValue)
    },
    onTimeChange(e) {
      this.showPicker = false
      this.innerValue = e
      this.change(this.innerValue)
    },
    onDateChange(e) {
      this.innerValue = +e
      this.showPicker = false
      this.change(this.innerValue)
    },
    onDateTimeChange(e) {
      this.innerValue = +e
      this.showPicker = false
      this.change(this.innerValue)
    },
    onDateRangeChange(e) {
      this.innerValue = [+e[0], +e[1]]
      this.showPicker = false
      this.change(this.innerValue)
    },
    onDateTimeRangeChange() {
      this.innerValue = [+this.currentDateTimeRangeStart, +this.currentDateTimeRangeEnd]
      this.showPicker = false
      this.change(this.innerValue)
    },
    dateFormat(value) {
      if (!value) return
      return dayjs(value).format('YYYY-MM-DD')
    },
    dateTimeFormat(value) {
      if (!value) return
      return dayjs(value).format('YYYY-MM-DD HH:mm')
    },
    dateRangeFormat(value) {
      if (!value) return
      if (value.length < 2) return
      return `${this.dateFormat(value[0])} ~ ${this.dateFormat(value[1])}`
    },
    dateTimeRangeFormat(value) {
      if (!value) return
      if (value.length < 2) return
      return `${this.dateTimeFormat(value[0])} ~ ${this.dateTimeFormat(value[1])}`
    },
  },
  created() {
    if (this.type === types['checkbox-group']) this.innerValue = []
    if (this.type === types['datetimerange']) this.innerValue = []
  },
}
</script>

<style lang="scss">
.dimple-lowcode-form-item-mobile {
  width: 100%;
  box-sizing: border-box;
  .text {
    padding-top: 14PX;
    padding-bottom: 15PX;
    padding-right: 15PX;
    text-align: right;
  }
  // border: 1PX solid #ddd;
  .van-cell {
    padding: 0PX;
    .van-cell__value {
      .van-field__body {
        padding-right: 15PX;
        padding-left: 15PX;

        input {
          // box-sizing: border-box;
          height: 48PX;
          line-height: 48PX;
          // border: 1PX solid #dcdfe6;
          // padding: 0 18PX;
          // border-radius: 4PX;
          text-align: right;
        }
        textarea {
          // box-sizing: border-box;
          // border: 1PX solid #dcdfe6;
          // padding: 4PX 18PX;
          // border-radius: 4PX;
          padding-top: 8PX;
          padding-bottom: 15PX;
        }
      }
    }
  }
  .van-field__word-limit {
    margin-bottom: 8PX;
    margin-right: 15PX;
    color: #ccc;
  }
  .van-cell__right-icon {
    line-height: 48PX;
    margin-right: 15PX;
  }

  .radio {
    padding-top: 14PX;
    .van-field__control {
      justify-content: flex-end;
    }
    .radio-text {
      width: 15vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      // text-align: right;
    }
    .van-radio-group--horizontal {
      justify-content: flex-end;
    }
  }

  .time {
    .van-cell__value {
      .van-field__body {
        padding-right: 0PX;
      }
    }
  }

  .select {
    .van-cell__value {
      .van-field__body {
        padding-right: 0PX;
      }
    }
  }

  .checkbox-group {
    padding-top: 14PX;
    .van-field__control {
      justify-content: flex-end;
    }
    .checkbox-text {
      max-width: 15vw;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: right;
    }
    .van-checkbox-group--horizontal {
      justify-content: flex-end;
    }
  }

  .switch {
    .van-field__control {
      justify-content: flex-end;
    }
  }
}
</style>

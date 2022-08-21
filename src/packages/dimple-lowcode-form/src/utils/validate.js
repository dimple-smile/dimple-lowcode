import { valueTypes } from './valueTypes'
import { validateRegExps } from './validateRegExps'

const required = (value, valueType) => {
  if (value === '' || value === null || value === undefined) return false
  const isArray = [valueTypes.array.value, valueTypes.dateRange.value, valueTypes.dateTimeRange.value].includes(valueType)
  if (isArray) return value.length > 0
  return true
}

const min = (value, length, valueType) => {
  if (value === '' || value === null || value === undefined) return true
  if (length === '' || length === null || length === undefined) return true
  const isString = valueType === valueTypes.string.value
  if (isString) return value.length >= length
  const isArray = [valueTypes.array.value, valueTypes.dateRange.value, valueTypes.dateTimeRange.value].includes(valueType)
  if (isArray) return value.length >= length
  const isNumber = [valueTypes.number.value, valueTypes.date.value].includes(valueType)
  if (isNumber) return value >= length
  return true
}

const max = (value, length, valueType) => {
  if (value === '' || value === null || value === undefined) return true
  if (length === '' || length === null || length === undefined) return true
  const isString = valueType === valueTypes.string.value
  if (isString) return value.length <= length
  const isArray = [valueTypes.array.value, valueTypes.dateRange.value, valueTypes.dateTimeRange.value].includes(valueType)
  if (isArray) return value.length <= length
  const isNumber = [valueTypes.number.value, valueTypes.date.value].includes(valueType)
  if (isNumber) return value <= length
  return true
}

const regExp = (value, regExpKey) => {
  if (!validateRegExps[regExpKey]) return true
  return validateRegExps[regExpKey].regExp.test(value)
}

const validate = {
  required,
  min,
  max,
  regExp
}

export { validate }

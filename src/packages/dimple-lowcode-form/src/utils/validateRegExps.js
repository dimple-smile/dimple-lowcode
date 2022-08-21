const validateRegExps = {
  number: { value: 'number', label: '纯数字', regExp: /^[0-9]*$/ },
  letter: { value: 'letter', label: '纯字母', regExp: /^[A-Za-z]+$/ },
  upperCaseLetter: { value: 'upperCaseLetter', label: '纯大写字母', regExp: /^[A-Z]+$/ },
  lowerCaseLetter: { value: 'lowerCaseLetter', label: '纯小写字母', regExp: /^[a-z]+$/ },
  chiness: { value: 'chiness', label: '纯汉字', regExp: /^[\u4e00-\u9fa5]{0,}$/ },
  numberLetter: { value: 'numberLetter', label: '数字加字母', regExp: /^[A-Za-z0-9]+$/ },
  mobilePhone: { value: 'mobilePhone', label: '手机号码', regExp: /^\d{11}$/ },
  emile: { value: 'emile', label: '邮箱', regExp: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ },
  carNumber: { value: 'carNumber', label: '车牌号', regExp: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/ },
  link: { value: 'link', label: '网址', regExp: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ },
}

export { validateRegExps }

const getUrlParms = (url, mode = 'history') => {
  if (!url) return {}
  let res = {}
  if (mode === 'hash') return getUrlParms(url.split('#')[1])
  url = url.split('#')[0]
  let params = url.split('?')[1]
  if (!params) return res
  let param = params.split('&')
  for (let i = 0; i < param.length; i++) {
    let paramsA = param[i].split('=')
    let key = paramsA[0]
    let value = paramsA[1]
    res[key] = value
  }
  return res
}

const mergeUrl = (url, appendUrl) => {
  if (!url) return {}
  const historyParams = { ...getUrlParms(url), ...getUrlParms(appendUrl) }
  const hashParams = { ...getUrlParms(url, 'hash'), ...getUrlParms(appendUrl, 'hash') }
  const historyParamsStr = Object.keys(historyParams)
    .map((key) => `${key}=${historyParams[key]}`)
    .join('&')
  const hashParamsStr = Object.keys(hashParams)
    .map((key) => `${key}=${hashParams[key]}`)
    .join('&')
  const historyBaseUrl = url.split('#')[0].split('?')[0]
  const hashBaseUrl = url.replace(historyBaseUrl,'').split('?')[0]
  let res = `${historyBaseUrl}`
  if (historyParamsStr) res += `?${historyParamsStr}`
  if (hashBaseUrl) res += `${hashBaseUrl}`
  if (hashParamsStr) res += `?${hashParamsStr}`
  return res
}

export { mergeUrl, getUrlParms }

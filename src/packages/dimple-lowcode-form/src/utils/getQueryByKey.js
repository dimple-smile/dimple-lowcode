const getQuery = (str = '') => {
  if (!str) return {}
  if (str.split('?').length < 2) return {}
  let res = {}
  str
    .split('?')[1]
    .split('&')
    .forEach((item) => {
      const key = item.split('=')[0]
      const value = item.split('=')[1]
      res[key] = value
    })
  return res
}

const getQueryByKey = (key) => {
  const hashQuery = getQuery(decodeURIComponent(location.hash))
  const searchQuery = getQuery(decodeURIComponent(location.search))
  const res = { ...hashQuery, ...searchQuery }
  return res[key]
}
export { getQueryByKey }

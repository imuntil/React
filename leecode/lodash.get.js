function get(obj, str) {
  const attrs = str
    .replace('[', '.[')
    .split('.')
    .filter((v) => v)
  const rep = /\[(\d+)\]/
  return attrs.reduce((prev, key) => {
    if (
      Array.isArray(prev) ||
      Object.prototype.toString.call(prev) === '[object Object]'
    ) {
      key = key.replace(rep, (str, $1) => $1)
      return prev[key]
    }
    return undefined
  }, obj)
}

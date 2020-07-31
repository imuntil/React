class SeparateChainingHashST {
  constructor(M) {
    // M最好为素数
    this.M = M
    this.maps = Array(this.M)
  }
  hash = (key) => {
    return key % this.M
  }
  put = (key, val) => {
    const k = this.hash(key)
    if (!this.maps[k]) {
      this.maps[k] = { [key]: val }
    } else {
      this.maps[k][key] = val
    }
  }
  get = (key) => {
    const k = this.hash(key)
    const v = this.maps[k]
    if (!v) return undefined
    return v[key]
  }
  delete = (key) => {
    const k = this.hash(key)
    const v = this.maps[k]
    if (!v) return false
    delete v[key]
    return true
  }
}

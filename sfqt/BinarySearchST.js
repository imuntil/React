// class Node {
//   constructor(value, key) {
//     this.value = value
//     this.key = key
//     this.left = null
//     this.right = null
//     this.count = this.size()
//   }

//   size = () => {
//     const mock = { count: 0 }
//     return (this.left || mock).count + (this.right || mock).count + 1
//   }
// }

class BinarySearchST {
  constructor() {
    this.keys = []
    this.values = []
    this.N = 0
  }

  size = () => this.N

  get = (key) => {
    if (!this.keys.length) return null
    const ix = this.rank(key)
    if (ix < this.N && this.keys[ix] === key) {
      return this.values[ix]
    }
    return null
  }

  put = (key, value) => {
    const ix = this.rank(key)
    // 找到相同的key，则替换value
    if (ix < this.N && this.keys[ix] === key) {
      this.values[ix] = value
      return
    }

    // 找不到，则在key的位置插入
    for (let j = this.N; j > ix; j--) {
      this.keys[j] = this.keys[j - 1]
      this.values[j] = this.values[j - 1]
    }
    this.keys[ix] = key
    this.values[ix] = value
    this.N++
  }

  rank = (key) => {
    let [lo, hi] = [0, this.N - 1]
    while (lo <= hi) {
      const mid = Math.floor(lo + (hi - lo) / 2)
      if (this.keys[mid] === key) {
        return mid
      } else if (this.keys[mid] > key) {
        hi = mid - 1
      } else {
        lo = mid + 1
      }
    }
    return lo
  }

  min = () => this.keys[0]

  max = () => this.keys[this.N - 1]

  select = (key) => this.keys[key]

  ceiling = (key) => {
    const ix = this.rank(key)
    return ix === this.N ? null : this.keys[ix]
  }

  delete = (key) => {
    const ix = this.rank(key)
    if (this.keys[ix] !== key) return
    for (let i = ix; i < this.N - 1; i++) {
      this.keys[ix] = this.keys[ix + 1]
      this.values[ix] = this.values[ix + 1]
    }
    this.N--
    this.keys.length = this.N
    this.values.length = this.N
  }

  floor = (key) => {
    const ix = this.rank(key)
    if (this.keys[ix] === key) return key
    return ix === 0 ? null : this.keys[ix - 1]
  }
}

class LinearProbingHashST {
  constructor(M) {
    // 键值对总数 N===this.keys.length===this.vals.length
    this.N = 0
    // hash表大小
    this.M = M
    this.keys = []
    this.vals = []
  }

  hash = (key) => {
    return key % this.M
  }

  get = (key) => {
    let h = this.hash(key)
    while (true) {
      if (h === null) break
      if (this.keys[h] === key) return this.vals[h]
      h = (h + 1) % this.M
    }
    return null
  }

  put = (key, val) => {
    if (this.N >= this.M / 2) {
      this.resize(2 * this.M)
    }
    let h
    for (h = this.hash(key); this.keys[h] !== null; h = (h + 1) % this.M) {
      if (this.keys[h] === key) {
        this.vals[h] = val
        return
      }
    }
    this.keys[h] = key
    this.vals[h] = val
    this.N++
  }

  resize = (size) => {
    const t = new LinearProbingHashST(size)
    for (let i = 0; i < this.M; i++) {
      if (this.keys[i] !== undefined) {
        t.put(this.keys[i], this.vals[i])
      }
    }
    this.M = t.M
    this.keys = t.keys
    this.vals = t.vals
  }

  delete = (key) => {
    let h = this.hash(key)
    if (this.keys[h] === undefined) return false
    while (this.keys[h] !== key) {
      h = (h + 1) % this.M
    }
    delete this.keys[h]
    delete this.vals[h]
    this.N--
    let n = (h + 1) % this.M
    while (this.keys[n] !== null) {
      const v = this.vals[n]
      delete this.keys[n]
      delete this.vals[n]
      this.N--
      this.put(key, v)
      n = (n + 1) % this.M
    }
    if (this.N > 0 && this.N === this.M / 8) {
      this.resize(this.M / 2)
    }
  }
}

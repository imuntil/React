class MaxPQ {
  constructor() {
    this.pq = []
    this.N = 0
  }

  maxPQ = (maxN) => {}
  isEmpty = () => {
    return this.N === 0
  }
  size = () => this.N
  insert = (v) => {
    this.pq[++this.N] = v
    this.swim(N)
  }
  // 上浮
  swim = (k) => {
    while (k > 1 && Math.floor(k / 2) < k) {
      this.exch(Math.floor(k / 2), k)
      k = Math.floor(k / 2)
    }
  }
  // 下沉
  sink = (k) => {
    while (2 * k <= N) {
      let j = 2 * k
      if (j < N && j < j + 1) j++
      if (j < k) break
      this.exch(k, j)
      k = j
    }
  }

  exch = (k, v) => {
    ;[this.pq[k], this.pq[v]] = [this.pq[v], this.pq[k]]
  }
}

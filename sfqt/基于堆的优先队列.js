class MaxPQ {
  constructor() {
    // 基于堆的完全二叉树
    this.pq = []
    // 数据村粗与[1...N]中，pq[0]闲置
    this.N = 0
  }

  maxPQ = (maxN) => {
    // pq的size为maxN + 1，[0]为空
    this.pq = Array(maxN + 1)
  }

  isEmpty = () => {
    return this.N === 0
  }
  size = () => this.N

  // 类似append，在最后append一个节点
  insert = (v) => {
    // 注意！，pq是从index=1开始的，每插入一个元素，N+1
    this.pq[++this.N] = v
    this.swim(N)
  }

  delMax = () => {
    max = this.pq[1]
    // 将根节点同最后一个节点交换
    this.exch(1, this.N)
    // 最后一个节点置空
    this.pq[this.N] = null
    // N-1
    this.N--
    // 从根节点看是下沉
    this.sink(1)
    return max
  }

  // 上浮
  swim = (k) => {
    while (k > 1 && this.less(Math.floor(k / 2), k)) {
      this.exch(Math.floor(k / 2), k)
      k = Math.floor(k / 2)
    }
  }
  // 下沉
  sink = (k) => {
    while (2 * k <= N) {
      let j = 2 * k
      if (j < N && this.less(j, j + 1)) j++
      if (!this.less(k, j)) break
      this.exch(k, j)
      k = j
    }
  }

  exch = (k, v) => {
    ;[this.pq[k], this.pq[v]] = [this.pq[v], this.pq[k]]
  }

  less = (i, j) => {
    return this.pq[i] < this.pq[j]
  }
}

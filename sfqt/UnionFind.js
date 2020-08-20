const txt = `
10
4 3
3 8
6 5
9 4
2 1
8 9
5 0
7 2
6 1
1 0
6 7
`

const read = function* (input) {
  const arr = input.split('\n').filter((v) => v)
  for (let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}

class UF {
  // 分量个数
  // 同一个分量中的所有点互相连通
  count = 0
  // 点对应的分量 index为点，value为分量
  id = []
  constructor(input) {
    this.init(input)
  }

  init = (input) => {
    const reader = read(input)
    let step = reader.next()
    this.count = +step.value
    this.id = Array(this.count)
      .fill('')
      .map((_, ix) => ix)
    while (true) {
      step = reader.next()
      if (step.done) break
      const [p, q] = step.value.split(' ').map((v) => +v)
      if (this.connected(p, q)) continue
      this.union(p, q)
      console.log(`${p} ${q}`)
    }
    console.log(`${this.count} components`)
  }

  connected = (p, q) => {
    return this.find(p) === this.find(q)
  }

  union = (p, q) => {
    const [pid, qid] = [this.find(p), this.find(q)]
    // 属于同一个分量
    if (pid === qid) return
    // 不属于同一个分量，但是需要将这两个点归位同一个分量
    for (let i = 0; i < this.id.length; i++) {
      // 遍历所有点，点属于同一个分量【pid】的点的分量都改为 【qid】
      if (this.id[i] === pid) {
        this.id[i] = qid
      }
    }
    this.count--
  }

  // 获取点v的分量
  find = (v) => {
    return this.id[v]
  }
}

/**
 * quick union的id数据结构和UF的不同
 * UF的id中，index表示点，value表示点所属的分量
 * 而QuickUnion中，id表示的是一种树结构。index与value的关系相当于子节点与父节点的关系
 */
class QuickUnion extends UF {
  find = (v) => {
    while (v !== this.id[v]) {
      v = this.id[v]
    }
    return v
  }
  union = (p, q) => {
    const [pRoot, qRoot] = [this.find(p), this.find(q)]
    if (qRoot === pRoot) return
    this.id[pRoot] = qRoot
    this.count--
  }
}

class WeightQuickUnionUF extends QuickUnion {
  // 记录每个分量的节点数目
  sz = []
  init = (input) => {
    const reader = read(input)
    let step = reader.next()
    this.count = +step.value
    this.di = Array(this.count)
      .fill('')
      .map((_, ix) => ix)
    // 初始时，N个分量，每个分量1个节点
    this.sz = Array(this.count).fill(1)
    while (true) {
      step = reader.next()
      if (step.done) break
      const [p, q] = step.value.split(' ').map((v) => +v)
      if (this.connected(p, q)) continue
      this.union(p, q)
    }
  }
  union = (p, q) => {
    const [pRoot, qRoot] = [this.find(p), this.find(q)]
    if (pRoot === qRoot) return
    const [pSize, qSize] = [this.sz[pRoot], this.sz[qRoot]]
    // 比较分量的节点数目，将较小的分量（树）连接到较大的分量（树）上。
    if (pSize > qSize) {
      this.id[qRoot] = pRoot
      this.sz[pRoot] += qSize
    } else {
      this.id[pRoot] = qRoot
      this.sz[qRoot] += pSize
    }
    this.count--
  }
}

// 深度优先搜索

class DeepFirstSearch {
  constructor(graph, point) {
    // 是否与point连通
    this.marked = Array(graph.V)
    // 与point连通的点的数量
    this.counts = 0
    this.dfs(graph, point)
  }

  dfs = (graph, point) => {
    this.marked[point] = true
    this.counts++
    for (let p in graph.adj[point]) {
      if (!this.marked[p]) {
        this.dfs(graph, p)
      }
    }
  }

  isMarked = (point) => {
    return this.marked[point]
  }
}

// 深度搜索寻找路径
class DeepFirstPaths {
  constructor(graph, point) {
    // 判断点x是否与点s连通
    this.marked = []
    // 保存连同路径，结构可以理解为 下标表示点N，下边对应的值表示点N的上一个点
    this.edgeTo = []
    this.dfs(graph, point)
    this.s = point
  }

  dfs = (graph, point) => {
    this.marked[point] = true
    for (let p in graph.adj[point]) {
      if (!this.marked[p]) {
        // !important
        this.edgeTo[p] = point
        this.dfs(graph, p)
      }
    }
  }

  hasPathTo = (point) => this.marked[point]

  pathTo = (point) => {
    if (!this.hasPathTo(point)) return false
    let prev = this.edgeTo[point]
    const path = []
    while (prev !== this.s) {
      path.push(prev)
      prev = this.edgeTo[prev]
    }
    path.push(this.s)
    return path
  }
}

class BreadthFirstPaths {
  constructor(graph, p) {
    this.marked = []
    this.edgeTo = []
    this.s = p
    this.bsf(graph, p)
  }
  // 先进先出
  bsf = (graph, p) => {
    const queue = [p]
    this.marked[p] = true
    while (queue.length) {
      const x = queue.shift()
      for (let w in graph.adj[x]) {
        if (!this.marked[w]) {
          this.edgeTo[w] = x
          this.marked[w] = true
          queue.push(w)
        }
      }
    }
  }
  hasPathTo = (v) => this.marked[v]
  pathTo = (v) => {
    if (!this.hasPathTo(v)) return false
    let prev = this.edgeTo[v]
    const path = []
    while (prev !== this.s) {
      path.push(prev)
      prev = this.edgeTo[prev]
    }
    path.push(this.s)
    return path
  }
}

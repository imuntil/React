class Node {
  constructor(key, value, N) {
    this.key = key
    this.value = value
    this.left = null
    this.right = null
    this.N = N
  }
}

class BST {
  constructor(key, value) {
    const root = new Node(key, value, 1)
    this.root = root
  }

  size = (node) => {
    if (node === null) return 0
    return node.N
  }

  getNode = (key, node) => {
    return this._getNode(node || this.root, key)
  }

  _getNode = (node, key) => {
    if (node === null) return null
    if (node.key > key) {
      return this._getNode(node.left, key)
    } else if (node.key < key) {
      return this._getNode(node.right, key)
    }
    return node
  }

  putNode = (node, key, value) => {
    return this._putNode(node || this.root, key, value)
  }

  _putNode = (node, key, value) => {
    if (node === null) return new Node(key, value, 1)
    if (node.key > key) {
      node.left = this._putNode(node.left, key, value)
    } else if (node.key < key) {
      node.right = this._putNode(node.right, key, value)
    } else {
      node.value = value
    }
    node.N = this.size(node.left) + this.size(node.right)
    return node
  }

  minKey = () => {
    return this._minKey(this.root)
  }
  _minKey = (node) => {
    if (node.left === null) return node
    return this._minKey(node.left)
  }

  maxKey = () => {
    return this._maxKey(this.root)
  }
  _maxKey = (node) => {
    if (node.right === null) return node
    return this._maxKey(node.right)
  }

  floorKey = (key, node) => {
    return this._floorKey(node || this.root, key)
  }

  _floorKey = (node, key) => {
    if (node === null) return null
    if (node.key === key) return node
    if (node.key > key) {
      return this._floorKey(node.left, key)
    }
    const x = this._floorKey(node.right, key)
    return x === null ? node : x
  }

  // 查找排名为num的节点的
  // 简单的说，如果num=5，就是查找整个树中，共有5个节点的key值小于要找的节点
  // 也就是key排第5位的节点
  selectKey = (num) => {
    const node = this._selectKey(this.root, num)
    return node && node.key
  }

  _selectKey = (node, num) => {
    if (node === null) return null
    const t = this.size(node.left)
    if (t > num) {
      // 节点数大于num，需要继续在node.left中查找
      return this.selectKey(node.left, num)
    } else if (t < num) {
      // 节点数据小于num，继续在node.right 中查找，因为node.left 中有t个节点，node自身1个节点，
      // 所以需要在right中在查找排名第 num - t- 1 的节点
      return this.selectKey(node.right, num - t - 1)
    } else {
      // t === num, 说明刚好有num个节点的key值小于要找的节点，返回该节点
      return node
    }
  }

  // 返回给定key的排名
  rank = (key) => {
    return this._rank(this.root, key)
  }

  _rank = (node, key) => {
    if (node === null) return 0
    if (node.key > key) {
      return this._rank(node.left, key)
    } else if (node.key < key) {
      return this._rank(node.right, key) + this.size(node.left) + 1
    } else {
      return this.size(node.left)
    }
  }

  // 返回删除最小节点后的树
  deleteMin = (node) => {
    return this._deleteMin(node || this.root)
  }

  _deleteMin = (node) => {
    if (node.left === null) return node.right
    node.left = this._deleteMin(node.left)
    node.N = this.size(node.left) + this.size(node.right) + 1
    return node
  }

  // 返回删除最大节点后的树
  deleteMax = (node) => {
    return this._deleteMax(node || this.root)
  }

  _deleteMax = (node) => {
    if (node.right === null) return node.left
    node.right = this._deleteMax(node.right)
    node.N = this.size(node.left) + this.size(node.right) + 1
    return node
  }

  // 删除节点
  deleteKey = (node, key) => {
    return this._deleteKey(node || this.root, key)
  }

  _deleteKey = (node, key) => {
    if (node.key > key) {
      node.left = this._deleteKey(node.left, key)
    } else if (node.key < key) {
      node.right = this._deleteKey(node.right, key)
    } else {
      if (node.left === null) return node.right
      if (node.right === null) return node.left
      const n = this.minKey(node.right)
      n.left = node.left
      n.right = this._deleteMin(node.right)
      node = n
    }
    node.N = this.size(node.left) + this.size(node.right) + 1
    return node
  }

  iterable = (lo, hi) => {
    lo = lo !== undefined || this.minKey()
    hi = hi !== undefined || this.maxKey()
    const arr = []
    this._keys(this.root, arr, lo, hi)
    return arr
  }

  _keys = (node, queue, lo, hi) => {
    if (node === null) return
    if (node.key > lo) {
      this.keys(node.left, queue, lo, hi)
    }
    if (node.key >= lo && node.key <= hi) {
      queue.push(node.key)
    }
    if (node.key < hi) {
      this.keys(node.right, queue, lo, hi)
    }
  }
}

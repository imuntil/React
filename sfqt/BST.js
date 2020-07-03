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
  size = (node) => {
    if (node === null) return 0
    return node.N
  }

  getValue = (node, key) => {
    if (node === null) return null
    const v = node.key - key
    if (v > 0) {
      return this.getValue(node.left, key)
    } else if (v < 0) {
      return this.getValue(node.right, key)
    } else {
      return node.value
    }
  }

  putNode = (node, key, value) => {
    if (node === null) return new Node(key, value, 1)
    const v = node.key - key
    if (v > 0) {
      node.left = this.putNode(node.left, key, value)
    } else if (v < 0) {
      node.right = this.putNode(node.right, key, value)
    } else {
      node.value = value
    }
    node.N = this.size(node.left) + this.size(node.right)
    return node
  }

  minKey = (node) => {
    if (node.left === null) return node
    return this.minKey(node.left)
  }

  floorKey = (node, key) => {
    if (node === null) return null
    const v = node.key - key
    if (v === 0) return node
    if (v > 0) {
      return this.floorKey(node.left, key)
    }
    const t = this.floorKey(node.right, key)
    return t || node
  }
}

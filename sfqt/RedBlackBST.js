const [RED, BLACK] = [true, false]

class Node {
  constructor(key, value, N, color) {
    this.key = key
    this.value = value
    this.N = N
    this.color = color
  }

  isRed = () => {
    return this.color === RED
  }
}

class RedBlackBST {
  constructor(node) {
    this.root = node
  }

  size = (node) => {
    return node === null ? 0 : node.N
  }

  rotateLeft = (node) => {
    const x = node.right
    node.right = x.left
    x.left = node
    x.color = node.color
    x.left.color = RED
    x.N = node.N
    node.N = this.size(node.left) + this.size(node.right) + 1
    return x
  }

  rotateRight = (node) => {
    const x = node.left
    node.left = x.right
    x.right = node
    x.color = node.color
    x.right.color = RED
    x.N = node.N
    node.N = this.size(node.left) + this.size(node.right) + 1
    return x
  }

  flipColors = (node) => {
    node.left.color = BLACK
    node.right.color = BLACK
    node.color = RED
  }

  isRed = (node) => {
    if (node === null) return false
    return node.isRed()
  }

  _putNode = (node, key, value) => {
    if (node === null) return new Node(key, value, 1, RED)
    if (node.key > key) {
      node.left = this._putNode(node.left, key, value)
    } else if (node.key < key) {
      node.right = this._putNode(node.right, key, value)
    } else {
      node.value = value
    }

    if (!this.isRed(node.left) && this.isRed(node.right)) {
      node = this.rotateLeft(node)
    }
    if (this.isRed(node.left) && this.isRed(node.left.left)) {
      node = this.rotateRight(node)
    }
    if (this.isRed(node.left) && this.isRed(node.right)) {
      this.flipColors(node)
    }

    node.N = this.size(node.left) + this.size(node.right) + 1
    return node
  }
}

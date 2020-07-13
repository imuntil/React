const [RED, BLACK] = [true, false]

class Node {
  constructor(key, value, N, color) {
    this.key = key
    this.value = value
    this.N = N
    this.color = color
  }

  isRed = (node) => {
    if (node === null) return false
    return this.color === RED
  }
}

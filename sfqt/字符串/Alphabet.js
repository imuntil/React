// 字母表

export default class Alphabet {
  constructor(s) {
    this.s = s
  }

  toChar = (index) => this.s[index]

  toIndex = (c) => this.s.indexOf(c)

  contains = (c) => this.toIndex(c) > -1

  R = () => this.s.length

  lgR = () => {}

  toIndices = (s) => {}

  toChars = (indices) => {}
}

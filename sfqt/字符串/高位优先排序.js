class MSD {
  charAt = (s, d) => {
    return s.length >= d ? s.charCodeAt(d) : -1
  }

  sort = (a) => {
    this.N = a.length
    this.aux = Array(this.N).fill(0)
    this._sort(a, 0, this.N - 1, 0)
  }

  _sort = (a, low, high, d) => {
    // 计算频率
    const count = []
    for (let i = low; i <= high; i++) {
      const index = this.charAt(a[i], d) + 2
      count[index] ? count[index]++ : (count[index] = 1)
    }

    // 将频率转化为索引
    for (let j = 1; j < count.length; j++) {
      !count[j] && (count[j] = 0)
      count[j] += count[j - 1] || 0
    }

    // 数据分类
    for (let k = low; k <= high; k++) {
      const g = this.charAt(a[k], d) + 1
      const index = count[g]
      this.aux[index] = a[k]
      count[g]++
    }

    // 回写
    for (let i = low; i <= high; i++) {
      a[i] = this.aux[i - low]
    }
  }
}

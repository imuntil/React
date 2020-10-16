/**
 * 处理影响高位优先排序性能的一个问题，小型子数组
 * 例如，当递归调用_sort方式时，low和high只相差1，或者2，等等比较小的情况，
 * 相当于程序需要为一个长度只有1或者2的小数组创建一个count.length=256(ASCII)，初始化为0的数组，
 * 导致性能浪费。
 * 一个解决方案是使用插入排序处理小型子数组
 * 注意：需要一个效率较高的xsubstring方法
 */

class MSD {
  charAt(s, d) {
    return s.length > d ? s.charCodeAt(d) : -1
  }

  sort(a) {
    this.N = a.length
    this.aux = Array(this.N).fill(0)
    this._sort(a, 0, this.N - 1, 0)
  }

  _insertSort(a, low, high, d) {
    for (let i = low + 1; i < high; i++) {
      for (let j = i; j > 0; j--) {
        if (this._less(a[j], a[j - 1], d)) {
          ;[a[j], a[j - 1]] = [a[j - 1], a[j]]
        }
      }
    }
  }

  _less(x, y, d) {
    return x.xsubstring(d) < y.xsubstring(d)
  }

  _sort(a, low, high, d) {
    // 设小型子数组的长度小于等于4
    if (high <= low + 4) {
      this._insertSort(a, low, high, d)
      return
    }
    // 计算频率
    const count = [0]
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
      // v-1
      const index = count[g]
      this.aux[index] = a[k]
      count[g]++
    }

    // 回写
    for (let i = low; i <= high; i++) {
      // 关于为什么要 i-low：
      // 已知在计算频率的时候，计算的并不是整个a数组（第一次除外），而是从low到high这个范围
      // 那么再将频率转化为索引时，获得的索引是从0开始的，而实际上索引的位置应当是从low开始的
      // 因为low之前都是比当前小的字符。举例说，当前d对应的字符为“b”，而此时还有有x个d对应为“a”的字符串，
      // 那么low=x，这就导致计算索引时每个索引都比实际索引小了low。
      // 接下来，在数据分类的时候，也就是v-1处的代码，计算得到的index比真是的索引是要小的，相差low，
      // 所以，在这里用实际的索引范围来遍历时，需要将aux的索引减去low，才能获得正确的值。
      a[i] = this.aux[i - low]
    }

    // 递归地以每个字符为键进行排序
    for (let k = 0; k < count.length - 1; k++) {
      this._sort(a, low + count[k], low + count[k + 1] - 1, d + 1)
    }
  }
}

const input = [
  'she',
  'sells',
  'seashells',
  'by',
  'the',
  'seashore',
  'the',
  'shells',
  'she',
  'sells',
  'are',
  'surely',
  'seashells',
]

const msd = new MSD()
msd.sort(input)
console.log(input)

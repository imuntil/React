/**
 * 自顶向下的归并排序
 */

/**
 * 取一个数组的两部分 left：[lo,...,mid], right: [mid+1,...,hi]
 * 从 lo 到 hi，遍历原数组：当 left 的值，小于 right 的值，则去left，反之取right。
 * 一方被取完没有剩余，则去另外一方
 */
function merge(arr, aux, lo, mid, hi) {
  let [i, j] = [lo, mid + 1]
  // 只复制原数组中需要的部分，提高性能
  for (let k = lo; k <= hi; k++) {
    aux[k] = arr[k]
  }
  for (let k = lo; k <= hi; k++) {
    if (i > mid) {
      arr[k] = aux[j]
      j += 1
    } else if (j > hi) {
      arr[k] = aux[i]
      i += 1
    } else if (aux[j] < aux[i]) {
      arr[k] = aux[j]
      j += 1
    } else {
      arr[k] = aux[i]
      i += 1
    }
  }
}

function mergeSort(arr) {
  function sort(a, aux, lo, hi) {
    if (hi <= lo) return
    const mid = Math.floor((hi - lo) / 2) + lo
    sort(a, aux, lo, mid)
    sort(a, aux, mid + 1, hi)
    merge(a, aux, lo, mid, hi)
  }
  // 预先创建aux数组，避免在merge中重复创建。
  const aux = Array(arr.length)
  sort(arr, aux, 0, arr.length - 1)
  return arr
}

function sort(arr) {
  const len = arr.length
  const tempArr = Array(len)
  const _sort = (left, right, temp) => {
    if (left < right) {
      const mid = (left + right) >> 1
      _sort(left, mid, temp)
      _sort(mid + 1, right, temp)
      merge(left, mid, right, temp)
    }
  }
  const merge = (left, mid, right, temp) => {
    let i = left
    let j = mid + 1
    let t = 0

    while (i <= mid && j <= right) {
      if (arr[i] < arr[j]) {
        temp[t++] = arr[i++]
      } else {
        temp[t++] = arr[j++]
      }
    }

    while (i <= mid) {
      temp[t++] = arr[i++]
    }

    while (j <= right) {
      temp[t++] = arr[j++]
    }

    t = 0
    while (left <= right) {
      arr[left++] = temp[t++]
    }
  }

  _sort(0, len - 1, tempArr)
  return arr
}

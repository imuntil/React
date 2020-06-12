function binary_search(arr, target) {
  if (!arr.length) return -1
  let left = 0
  // 前后闭合
  let right = arr.length - 1
  // 结束条件为 left = right + 1
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2)
    if (arr[mid] === target) {
      right = mid - 1
    } else if (arr[mid] > target) {
      right = mid - 1
    } else if (arr[mid] < target) {
      left = mid + 1
    }
  }
  if (left >= arr.length || arr[left] !== target) {
    return -1
  }
  return left
}

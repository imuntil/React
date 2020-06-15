// 二分查找
function binary_search(arr, target) {
  if (!arr.length) return -1
  let left = 0
  let right = arr.length - 1
  let mid
  while (left <= right) {
    mid = Math.floor(left + (right - left) / 2)
    if (arr[mid] === target) {
      return mid
    } else if (arr[mid] > target) {
      right = mid - 1
    } else if (arr[mid] < target) {
      left = mid + 1
    }
  }
  return -1
}

// 左边界
function left_bound(arr, target) {
  if (!arr.length) return -1
  let left = 0
  let right = arr.length - 1
  let mid
  while (left <= right) {
    mid = Math.floor(left + (right - left) / 2)
    if (arr[mid] === target) {
      right = mid - 1
    } else if (arr[mid] > target) {
      right = mid - 1
    } else if (arr[mid] < target) {
      left = mid + 1
    }
  }
  if (arr[left] !== target || left >= arr.length) {
    return -1
  }
  return left
}

// 右边界
function right_bound(arr, target) {
  if (!arr.length) return -1
  let left = 0
  let right = arr.length - 1
  let mid
  while (left <= right) {
    mid = Math.floor(left + (right - left) / 2)
    if (arr[mid] === target) {
      left = mid + 1
    } else if (arr[mid] > target) {
      right = mid - 1
    } else if (arr[mid] < target) {
      left = mid + 1
    }
  }

  if (right <= -1 || arr[right] !== target) {
    return -1
  }
  return right
}

/**
 * [1,2,3,4,4,4,4,5,6,7]
 * 寻找最左边的4，
 * 寻找最右边的4
 */

// 寻找左边界[]
function left_bound(nums, target) {
  // 前后都闭合[]
  let [left, right] = [0, nums.length - 1]
  // 结束条件 left === right + 1
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) {
      right = mid - 1
    } else if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    }
  }
  if (left === nums.length) return -1
  return nums[left] === target ? left : -1
}

// 寻找左边界[)
function left_bound2(nums, target) {
  let [left, right] = [0, nums.length]
  // 结束循环条件 left === right
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) {
      right = mid
    } else if (nums[mid] > target) {
      right = mid
    } else if (nums[mid] < target) {
      left = mid + 1
    }
  }
  if (left === nums.length) return -1
  return nums[left] === target ? left : -1
}

// 寻找右边界[]
function right_bound(nums, target) {
  let [left, right] = [0, nums.length - 1]
  // 结束条件 left === right + 1
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    }
  }
  if (right < 0) return -1
  return nums[right] === target ? right : -1
}

// 寻找右边界[)
function right_bound2(nums, target) {
  let [left, right] = [0, nums.length]
  // 结束条件 left === right
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid
    } else if (nums[mid] < target) {
      left = mid + 1
    }
  }
  if (right < 0) return -1
  return nums[right] === target ? right : -1
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  const left = left_bound(nums, target)
  const right = right_bound(nums, target)
  return [left, right]
}

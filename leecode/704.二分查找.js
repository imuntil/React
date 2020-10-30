// 二分搜索

// 前后都闭合[]
function binary_search(nums, target) {
  let [left, right] = [0, nums.length - 1]
  // 前后闭合[], while (left <= right) 结束条件为left===right+1 => [left, right] => [right+1, right]，区间内容为空
  // 若前闭后开[)， while (left<right) 结束条件为left===right => [left, right) => [right, right)，区间内容为空，
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    }
  }
  return -1
}

// 前闭后开[)
function binary_search2(nums, target) {
  // 注：区间范围为[0, nums.length）
  let [left, right] = [0, nums.length]
  // 结束循环的条件为 left === right
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      // 注: target小于nums[mid]，要在列表左边搜索，前闭后开，所以right=mid而不是mid-1
      right = mid
    } else if (nums[mid] < target) {
      left = mid + 1
    }
  }
  return -1
}

/**
 *
 * []
 * left=0, right=len-1
 * while: left <= right
 *  if: arr[mid]===target
 *    return mid
 *  else if: arr[mid] > target
 *    right = mid - 1
 *  else if: arr[mid] < target
 *    left = mid + 1
 *  return -1
 *
 * [) 寻找左侧边界
 * left=0; right=len
 * 结束循环条件 left === right, [left, left), 区间为空
 * while: left < right
 *  if: arr[mid] === target
 *    right = mid
 *  else if: arr[mid] > target
 *    right = mid
 *  else if: arr[mid] < target
 *    left = mid + 1
 *  return left === len ? -1 : arr[left] === target ? left : -1
 *
 * [) 寻找右边界
 * left = 0; right=len
 * 结束循环条件 left === right, [left, left), 区间为空
 * while: left < right
 *  if: arr[mid] === target
 *    left = mid + 1
 *  else if: arr[mid] > target
 *    right = mid
 *  else if: arr[mid] < target
 *    left = mid + 1
 * return left === 0 ? -1 : arr[left-1] === target ? left-1 : -1
 *
 */

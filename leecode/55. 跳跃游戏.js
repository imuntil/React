/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let res = 0
  for (let i = 0; i < nums.length - 1; i++) {
    res = Math.max(res, nums[i] + i)
    if (res <= i) return false
  }
  return res >= nums.length - 1
}

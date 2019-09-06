/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  if (!nums.length) return 0;
  for (i = nums.length - 1; i >= 0; i--) {
    if (val === nums[i]) {
      nums.splice(i, 1);
    }
  }
  return nums.length;
};

var removeDuplicates = function(nums) {
  let len = nums.length;
  if (len <= 1) return nums;

  // for (let i = 1; i < len; i++) {
  //   const [x, y] = [nums[i - 1], nums[i]]
  //   if (x === y) {
  //     nums.splice(i, 1)
  //     len -= 1
  //     i -= 1
  //   }
  // }
  // for (let i = 0; i < len; i++) {
  //   let j = i + 1;
  //   while (nums[j] === nums[i]) {
  //     j++;
  //   }
  //   if (j - i > 1) {
  //     nums.splice(i, j - i - 1);
  //     len -= j - i - 1;
  //   }
  // }
  let j = 0
  for (let i = 1; i < len; i++) {
    if (nums[i] !== nums[j]) {
      j++
      nums[j] = nums[i]
    }
  }
  nums.splice(j + 1)
};

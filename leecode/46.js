/**
 * 回溯算法
 * https://labuladong.gitbook.io/algo/di-ling-zhang-bi-du-xi-lie-qing-an-shun-xu-yue-du/hui-su-suan-fa-xiang-jie-xiu-ding-ban
 */

//  框架
// result = []
// def backtrack(路径, 选择列表):
//     if 满足结束条件:
//         result.add(路径)
//         return

//     for 选择 in 选择列表:
//         做选择
//         backtrack(路径, 选择列表)
//         撤销选择

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var backtrack = function (nums, track, res) {
  if (nums.length === track.length) {
    res.push([...track])
    return
  }
  for (let i = 0; i < nums.length; i++) {
    const v = nums[i]
    if (track.indexOf(v) > -1) continue
    track.push(v)
    backtrack(nums, track, res)
    track.splice(track.length - 1, 1)
  }
}

var permute = function (nums) {
  const track = []
  const res = []
  backtrack(nums, track, res)
  return res
}

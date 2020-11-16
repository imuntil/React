/**
 * https://leetcode-cn.com/problems/unique-binary-search-trees/
 * @param {number} n
 * @return {number}
 * tag: 动态规划
 */
var numTrees = function (n) {
  if (!n) return 1
  return gen(1, n)
}

function gen(low, high, memo) {
  !memo && (memo = {})
  if (low > high) return 1
  let res = 0
  // [1,2]和[10,11]构成的搜索二叉树的数量的一样的
  if (memo[high - low]) return memo[high - low]
  for (let i = low; i <= high; i++) {
    const leftTrees = gen(low, i - 1, memo)
    const rightTrees = gen(i + 1, high, memo)
    // 根据95题，可以知道树的种类是遍历leftTrees & rightTrees的到的
    res += leftTrees * rightTrees
  }

  memo[high - low] = res
  return res
}

numTrees = function (n) {
  const dp = Array(n + 1).fill(0)
  dp[0] = 1
  dp[1] = 1
  // 相当于上面的简化写法，i表示节点数量，j等同于上面的gen中的i
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      dp[i] += dp[j - 1] * dp[i - j]
    }
  }
  return dp[n]
}

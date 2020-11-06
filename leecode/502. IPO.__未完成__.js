/**
 * @param {number} k
 * @param {number} W
 * @param {number[]} Profits
 * @param {number[]} Capital
 * @return {number}
 */
var findMaximizedCapital = function (k, W, Profits, Capital) {
  if (!Capital.length || !Profits.length) return W
  if (k > Capital.length) k = Capital.length
  let dp = [W]
  for (let j = 1; j <= k; j++) {
    let i = 0
    let c = -1
    const tem = dp[j - 1]
    !dp[j] && (dp[j] = tem)
    for (; i < Capital.length; i++) {
      if (tem < Capital[i]) continue
      if (tem + Profits[i] > dp[j]) {
        dp[j] = tem + Profits[i]
        c = i
      }
    }
    c > -1 && (Capital[c] = Number.MAX_SAFE_INTEGER)
  }
  return dp[k]
}


var quickSort = function(arr) {
  let 
}

findMaximizedCapital = function (k, W, Profits, Capital) {
  if (!Capital.length || !Profits.length) return W
  if (k > Capital.length) k = Capital.length

}
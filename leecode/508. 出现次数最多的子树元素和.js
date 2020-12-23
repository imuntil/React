/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findFrequentTreeSum = function (root) {
  const cache = {}
  let vals = []
  let counts = []
  const helper = (node) => {
    if (!node) return null
    const lres = helper(node.left)
    const rres = helper(node.right)
    let c = node.val
    if (lres !== null) {
      // cache[lres] = (cache[lres] || 0) + 1
      c += lres
    }
    if (rres !== null) {
      // cache[rres] = (cache[rres] || 0) + 1
      c += rres
    }
    cache[c] = (cache[c] || 0) + 1
    let count = cache[c]
    const len = counts.length
    if (!len || counts[len - 1] === count) {
      vals.push(c)
      counts.push(count)
    } else if (counts[len - 1] < count) {
      vals = [c]
      counts = [count]
    }
    return c
  }
  helper(root)
  return vals
}

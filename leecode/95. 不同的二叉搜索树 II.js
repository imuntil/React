/**
 * Definition for a binary tree node.
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

function gen(low, high) {
  if (low > high) {
    return [null]
  }
  const result = []
  for (let i = low; i <= high; i++) {
    const leftTrees = gen(low, i - 1)
    const rightTrees = gen(i + 1, high)
    for (let left of leftTrees) {
      for (let right of rightTrees) {
        const node = new TreeNode(i)
        node.left = left
        node.right = right
        result.push(node)
      }
    }
  }
  return result
}

function gen2(low, high, memo) {
  !memo && (memo = {})
  if (low > high) return [null]
  const key = `${low}-${high}`
  if (memo[key]) return memo[key]
  const result = []
  for (let i = low; i <= high; i++) {
    const leftTrees = gen2(low, i - 1, memo)
    const rightTrees = gen2(i+1, high, memo)
    for (let left of leftTrees) {
      for (let right of rightTrees) {
        const node = new TreeNode(i)
        node.left = left
        node.right = right
        result.push(node)
      }
    }
  }
  memo[key] = result
  return result
}

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
  if (!n) return []
  return gen(1, n)
}

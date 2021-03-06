/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
var BSTIterator = function (root) {
  const q = []
  const helper = (node) => {
    if (!node) return
    helper(node.left)
    q.push(node.val)
    helper(node.right)
  }
  helper(root)
  this.q = q
  this.N = q.length
  this.ix = 0
}

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  return this.q[this.ix++]
}

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.ix >= this.N
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

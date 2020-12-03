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
  this.q = []
  while (root) {
    this.q.push(root)
    root = root.left
  }
}

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  let cur = this.q.pop()
  const val = cur.val
  cur = cur.right
  while (cur) {
    this.q.push(cur)
    cur = cur.left
  }
  return val
}

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.q.length > 0
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  if (!root) return null
  let q = [root]
  while (q.length) {
    const temp = []
    while (q.length) {
      const c = q.shift()
      c.left && temp.push(c.left)
      c.right && temp.push(c.right)
    }
    for (let i = 0; i < temp.length - 1; i++) {
      temp[i].next = temp[i + 1]
    }
    q = temp
  }
  return root
}

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return []
  const res = []
  let q = [root]
  while (q.length) {
    const len = q.length
    const arr = []
    let temp = []
    for (let i = 0; i < len; i++) {
      const c = q[i]
      arr.push(c.val)
      temp = temp.concat(c.children)
    }
    q = temp
    res.push(arr)
  }
  return res
}

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0
  let res = 0
  const helper = (node, depth) => {
    const children = node.children
    if (!children.length) {
      res = Math.max(res, depth)
    } else {
      for (let i = 0; i < children.length; i++) {
        helper(children[i], 1 + depth)
      }
    }
  }
  helper(root, 1)
  return res
}

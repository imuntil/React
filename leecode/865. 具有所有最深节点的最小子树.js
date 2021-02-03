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
 * @return {TreeNode}
 */
var subtreeWithAllDeepest = function (root) {
  const map = new Map()
  const countDep = (node, dep) => {
    if (!node) return
    map.set(node, dep)
    countDep(node.left, dep + 1)
    countDep(node.right, dep + 1)
  }
  countDep(root, 1)
  const maxDep = Math.max(...Object.values(map))
  const helper = node => {
    
  }
}

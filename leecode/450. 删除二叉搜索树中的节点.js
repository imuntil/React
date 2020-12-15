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
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
  if (!root) return root
  const find = (n, p, d) => {
    if (!n) return { target: null }
    if (n.val === key) {
      return { target: n, parent: p, direction: d }
    } else if (n.val < key) {
      return find(n.right, n, 'right')
    } else {
      return find(n.left, n, 'left')
    }
  }
  const { target, parent, direction } = find(root, null, '')
  if (!target) return root
  if (!target.left && !target.right) {
    if (parent) {
      parent[direction] = null
      return root
    }
    return null
  }
  // 目标：返回被删除的最下节点，和删除最小节点后的树
  const deleteMin = node => {
    

  }
  if (target.right) {

  }
}

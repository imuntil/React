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
  // 未找到
  if (!target) return root
  // 叶节点
  if (!target.left && !target.right) {
    if (parent) {
      parent[direction] = null
      return root
    }
    return null
  }
  // 只有左子节点
  if (target.left && !target.right) {
    if (parent) {
      parent[direction] = target.left
      return root
    }
    return target.left
  }
  // 仅有右子节点
  if (target.right && !target.left) {
    if (parent) {
      parent[direction] = target.right
      return root
    }
    return target.right
  }
  // 左右节点都存在
  // 删除最小节点并返回 (右子树)
  const deleteMin = (node) => {
    let p = node.right
    let n = node.right
    while (n.left) {
      p = n
      n = n.left
    }

    if (p !== n) {
      p.left = n.right
      target.val = n.val
      return root
    } else {
      node.right = p.right
      target.val = n.val
      return root
    }
  }
  return deleteMin(target)
}

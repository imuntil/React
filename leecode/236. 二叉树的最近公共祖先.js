/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

// 回溯算法
var lowestCommonAncestor = function (root, p, q) {
  const res = []
  const helper = (node, arr) => {
    if (node === p || node === q) {
      res.push([...arr])
      if (res.length === 2) {
        return
      }
    }
    const temp = [node.left, node.right]
    for (let i = 0; i < 2; i++) {
      const c = temp[i]
      if (!c) continue
      arr.push(c)
      helper(c, arr)
      arr.pop()
    }
  }
  helper(root, [root])
  const [a1, a2] = res
  let n
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) break
    n = a1[i]
  }
  return n
}

// 后续遍历
lowestCommonAncestor = function (root, p, q) {
  let res = null
  const helper = (node) => {
    if (!node) return
    !res && helper(node.left)
    !res && helper(node.right)
    !node.c && (node.c = 0)
    if (node === p || node === q) {
      node.c++
    }
    if (node.left) {
      node.c += node.left.c
    }
    if (node.right) {
      node.c += node.right.c
    }
    if (node.c === 2 && !res) {
      res = node
    }
  }
  helper(root)
  return res
}

// 后续遍历II
lowestCommonAncestor = function (root, p, q) {
  let res = null
  const helper = (node) => {
    if (!node) return false
    const lson = helper(node.left)
    const rson = helper(node.right)
    if (
      (lson && rson) ||
      ((node.val === p.val || node.val === q.val) && (lson || rson))
    ) {
      res = node
    }
    return lson || rson || node.val === q.val || node.val === p.val
  }
  helper(root)
  return res
}

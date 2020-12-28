/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} v
 * @param {number} d
 * @return {TreeNode}
 */
var addOneRow = function (root, v, d) {
  if (d === 1) {
    const r = new TreeNode(v)
    r.left = root
    return r
  }
  let q = [root]
  let depth = 1
  let end = false
  while (q.length) {
    const temp = []
    depth++
    while (q.length) {
      const current = q.shift()
      const { left, right } = current
      if (depth === d) {
        end = true
        const l = new TreeNode(v)
        l.left = left
        current.left = l
        // current.left = new TreeNode(v)
        // current.left.left = left
        const r = new TreeNode(v)
        r.right = right
        current.right = r
        // current.right = new TreeNode(v)
        // current.right.right = right
      } else {
        left && temp.push(left)
        right && temp.push(right)
      }
    }
    !end && (q = temp)
  }
  return root
}

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

addOneRow = function (root, v, d) {
  if (d === 1) {
    const r = new TreeNode(v)
    r.left = root
    return r
  }
  const helper = (node, depth) => {
    if (!node || depth > d) return
    depth++
    const { left, right } = node
    if (depth === d) {
      const l = new TreeNode(v)
      l.left = left
      node.left = l
      const r = new TreeNode(v)
      r.right = right
      node.right = r
      return
    }
    helper(node.left, depth)
    helper(node.right, depth)
  }
  helper(root, 1)
  return root
}

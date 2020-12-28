/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
var mergeTrees = function (t1, t2) {
  const helper = (n1, n2) => {
    if (!n1) return n2
    if (!n2) return n1
    n1.val += n2.val
    n1.left = helper(n1.left, n2.left)
    n1.right = helper(n1.right, n2.right)
    return n1
  }
  const res = helper(t1, t2)
  return res
}

mergeTrees = function (t1, t2) {
  if (!t1) return t2
  if (!t2) return t1
  t1.val += t2.val
  t1.left = mergeTrees(t1.left, t2.left)
  t1.right = mergeTrees(t1.right, t2.right)
  return t1
}

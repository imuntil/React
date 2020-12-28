/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t
 * @return {string}
 */
var tree2str = function (t) {
  if (!t) return ''
  const res = [t.val]
  const helper = (node, parent) => {
    const { left, right } = node
    if (left) {
      const c = [left.val]
      parent.push(c)
      helper(left, c)
    }
    if (right) {
      !left && parent.push([])
      const c = [right.val]
      parent.push(c)
      helper(right, c)
    }
  }
  helper(t, res)
  const m = { ',': '', '[': '(', ']': ')' }
  return JSON.stringify(res)
    .replace(/[,\[\]]/g, (origin) => m[origin])
    .slice(1, -1)
}

tree2str = function (t) {
  if (!t) return ''
  const helper = (node) => {
    if (!node) return ''
    const left = helper(node.left)
    const right = helper(node.right)
    let str = `${node.val}`
    if (left) {
      str = `${str}(${left})`
    }
    if (right) {
      str = `${str}${!left ? '()' : ''}(${right})`
    }
    return str
  }
  return helper(t)
}

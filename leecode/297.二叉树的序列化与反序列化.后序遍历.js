/**
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485871&idx=1&sn=bcb24ea8927995b585629a8b9caeed01&chksm=9bd7f7a7aca07eb1b4c330382a4e0b916ef5a82ca48db28908ab16563e28a376b5ca6805bec2&scene=21#wechat_redirect
 */

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

/**
 * Encodes a tree to a single string.
 *
 * 前序遍历
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  const res = []
  function se(node) {
    if (!node) {
      res.push(null)
      return
    }
    se(node.left)
    se(node.right)
    // 后序code
    res.push(node.val)
  }
  se(root)
  return JSON.stringify(res)
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const n = JSON.parse(data)
  function de(nodes) {
    if (!nodes.length) return
    const val = nodes.pop()
    if (val === null) return null
    const node = new TreeNode(val)
    node.right = de(nodes)
    node.left = de(nodes)
    return node
  }
  return de(n)
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

// deserialize(serialize(root))

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
  const q = [root]
  const res = []
  while (q.length) {
    const node = q.shift()
    if (!node) {
      res.push(null)
      continue
    }
    res.push(node.val)
    q.push(node.left)
    q.push(node.right)
  }
  return JSON.stringify(res)
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 * 
 * 关键是list和q两个队列的关系，不好发现。
 */
var deserialize = function (data) {
  if (!data) return
  const list = JSON.parse(data)
  if (!list.length) return
  const val = list[0]
  if (val === null) return null
  const root = new TreeNode(val)
  const q = [root]
  for (let i = 1; i < list.length; ) {
    const parent = q.shift()
    const left = list[i++]
    if (left !== null) {
      parent.left = new TreeNode(left)
      q.push(parent.left)
    } else {
      parent.left = null
    }

    const right = list[i++]
    if (right !== null) {
      parent.right = new TreeNode(right)
      q.push(parent.right)
    } else {
      parent.right = null
    }
  }
  return root
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

// deserialize(serialize(root))

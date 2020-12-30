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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
  if (!root) return []
  const map = {}
  const ans = []
  const helper = (node) => {
    if (!node) return '#'
    const { val, left, right } = node
    const lserial = helper(left)
    const rserial = helper(right)
    const serial = `${val},${lserial},${rserial}`
    !map[serial] ? (map[serial] = 1) : map[serial]++
    if (map[serial] === 2) {
      ans.push(node)
    }
    return serial
  }
  helper(root)
  return ans
}

/**
 * 方法二：唯一标识符
  *思路
  *
  *假设每棵子树都有一个唯一标识符：只有当两个子树的 id 相同时，认为这两个子树是相同的。
  *
  *一个节点 node 的左孩子 id 为 x，右孩子 id 为 y，那么该节点的 id 为 (node.val, x, y)。
  *
  *算法
  *
  *如果三元组 (node.val, x, y) 第一次出现，则创建一个这样的三元组记录该子树。如果已经出现过，则直接使用该子树对应的 id。
  *
  *作者：LeetCode
  (链接：https://leetcode-cn.com/problems/find-duplicate-subtrees/solution/xun-zhao-zhong-fu-de-zi-shu-by-leetcode/
  *来源：力扣（LeetCode）
  *著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 */
findDuplicateSubtrees = function (root) {
  if (!root) return []
  const map = {}
  const count = {}
  const ans = []
  let _uid = 0
  const getUid = (serial) => {
    const rUid = map[serial]
    if (rUid) return rUid
    map[serial] = ++_uid
    return _uid
  }
  const helper = (node) => {
    if (!node) return 0
    const { left, right, val } = node
    // 序列化
    const serial = '' + val + ',' + helper(left) + ',' + helper(right)
    // 获取唯一标识符
    const uid = getUid(serial)
    !count[uid] ? (count[uid] = 1) : count[uid]++
    if (count[uid] === 2) {
      ans.push(node)
    }
    return uid
  }
  helper(root)
  return ans
}

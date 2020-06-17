/**
 * 参考
 * https://github.com/labuladong/fucking-algorithm/blob/master/%E7%AE%97%E6%B3%95%E6%80%9D%E7%BB%B4%E7%B3%BB%E5%88%97/%E5%8F%8C%E6%8C%87%E9%92%88%E6%8A%80%E5%B7%A7.md
 */

//  快慢指针
let headNode

// 寻找环的起点
function findCycleStart() {
  let slow = headNode
  let fast = headNode
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      // 快指针追上了慢指针，说明存在环
      break
    }
  }

  slow = headNode
  while (fast !== slow) {
    fast = fast.next
    slow = slow.next
  }

  return slow
}

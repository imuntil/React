/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}
var addTwoNumbers = function(l1, l2) {
  let [t1, t2] = [l1, l2];
  while (true) {
    t1.val = t1.val + t2.val;
    if (t1.val >= 10) {
      t1.val -= 10;
      t1.next ? (t1.next.val += 1) : (t1.next = new ListNode(1));
    }

    if (!t1.next) {
      t1.next = t2.next;
      break;
    }
    if (!t2.next && t1.next.val < 10) {
      break;
    }
    t2 = t2.next || (t2.next = new ListNode(0));
    t1 = t1.next;
  }
  return l1;
};

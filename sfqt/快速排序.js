/**
 * 不需要辅助数组的快排
 */
function quickSort(arr) {
  function partition(a, lo, hi) {
    let i = lo
    let j = hi + 1
    // 切分元素（参考点）
    const v = a[lo]

    while (true) {
      // 从左边开始找比参考点大的元素
      // 当元素大于等于参考点或者超出范围时 break
      while (a[++i] < v) {
        if (i == hi) break
      }
      // 从右边开始，找比参考点小的元素
      // 当元素小于等于参考点或者超出范围时，break
      while (v < a[--j]) {
        if (j == lo) break
      }
      // 若两个点刚好相遇相遇，则此时i==j，且元素等于参考点
      // 若两个点想经过，则i>j，且a[i]>v>a[j]
      if (i >= j) break
      // 若两个元素没有没有相遇，则交换两个元素
      ;[a[j], a[i]] = [a[i], a[j]]
    }
    // 将j和参考点交换，并返回j
    ;[a[lo], a[j]] = [a[j], a[lo]]
    return j
  }

  function sort(a, lo, hi) {
    if (hi <= lo) return
    const j = partition(a, lo, hi)
    sort(a, lo, j - 1)
    sort(a, j + 1, hi)
  }
  sort(arr, 0, arr.length - 1)
  return arr
}


/**
 * 第一个值为基准值（lt值），从第二个值开始向后遍历
 * 若当前值（i值）大于基准值，则交换两个值的位置，同事将两个指针+1
 * 若当前值小于基准值，则将当前值和gt值交换位置，通知gt指针向左移动一位
 * 若当前值等于基准值，则将当前指针+1
 * 那么，当每一轮结束时
 * 从lt指针到gt指针，所指向的值都等于基准值（lt原本就是只想基准值v的，
 * 最后一次比较时，i是等于gt的，不论哪种情况，最终gt指向的值都会等于基准值）
 * 那么就可以得到 arr[lo...lt-1] < v == arr[lt...gt] < arr[gt+1...hi]
 */
function quick3Way(arr, lo, hi) {
  if (hi <= lo) return
  let [lt, i, gt] = [lo, lo + 1, hi]
  // 基准值
  const v = arr[lt]
  while (i <= gt) {
    if (v > arr[i]) {
      [arr[i], arr[lt]] = [arr[lt], arr[i]]
      i++
      lt++
    } else if (v < arr[i]) {
      [arr[i], arr[gt]] = [arr[gt], arr[i]]
      gt--
    } else {
      i++
    }
  }
  quick3Way(arr, lo, lt - 1)
  quick3Way(arr, gt + 1, hi)
}
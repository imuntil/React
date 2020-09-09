// arr[0] 为空，不参与排序
function pqSort(arr) {
  let N = arr.length
  // for循环，构建堆
  for (let k = Math.floor(N / 2); k >= 1; k--) {
    sink(arr, k, N)
  }
  // 堆构建完成后，可得arr[1]为最大的元素
  // 排序
  while (N > 1) {
    // 将1，和N对调，对调后从1开始下沉
    ;[arr[1], arr[N]] = [arr[N], arr[1]]
    // 每次下沉完成后，arr[1]对应的剩余元素的最大值
    sink(arr, 1, --N)
  }
}

function sink(arr, k, N) {
  while (2 * k <= N) {
    let j = 2 * k
    if (j < N && arr[j] < arr[j + 1]) j++
    if (arr[k] >= arr[j]) break
    ;[arr[k], arr[j]] = [arr[j], arr[k]]
    k = j
  }
}

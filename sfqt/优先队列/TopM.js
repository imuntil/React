import MaxPQ from './基于堆的优先队列'

function topM(N, arr) {
  const pq = new MaxPQ()
  pq.maxPQ(N + 1)
  for (let i = 0; i < arr.length; i++) {
    // 遍历数组，插入堆
    pq.insert(arr[i])
    // 当堆的size大于N，则删除当前堆最大的元素
    if (pq.size() > N) {
      pq.delMax()
    }
  }
  // 遍历完成后，剩余N个最小的元素
  const res = []
  while (!pq.isEmpty()) {
    res.push(pq.delMax())
  }
  res.reverse()
  return res
}

// 获取testArr中最小的5个数， TopM(5)
const testArr = [1, 2, 4, 2, 6, 3, 4, 7, 8, 5, 3, 0, 11, 9, 5]

import MaxPQ from './基于堆的优先队列'

function topM(N, arr) {
  const pq = new MaxPQ()
  pq.maxPQ(N)
  for (let i = 0; i < arr.length; i++) {
    pq.insert(arr[i])
  }
}

// 获取testArr中最大的5个数， TopM(5)
const testArr = [1, 2, 4, 2, 6, 3, 4, 7, 8, 5, 3, 0, 11, 9, 5]

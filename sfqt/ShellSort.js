/**
 * 希尔排序
 * 感觉像是插入排序的变种，速度要快很多。
 */

function shellSort(arr) {
  const N = arr.length
  let h = 1
  while (h < N / 3) {
    h = 3 * h + 1
  }

  while (h >= 1) {
    for (let i = h; i < N; i++) {
      for (let j = i; j >= h; j -= h) {
        if (arr[j] >= arr[j - h]) {
          break
        }
        ;[arr[j], arr[j - h]] = [arr[j - h], arr[j]]
      }
    }

    h = Math.floor(h / 3)
  }
}

const xxx = [
  1,
  3,
  2,
  6,
  4,
  5,
  3,
  11,
  2,
  6,
  9,
  55,
  8,
  4,
  3,
  45,
  23,
  45,
  32,
  1,
  0,
  9,
  21,
  17,
  22,
]

shellSort(xxx)

xxx

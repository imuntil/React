/**
 * 选择排序
 * @param {Array} arr
 */
function selectSort(arr) {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[i]) {
        ;[arr[j], arr[i]] = [arr[i], arr[j]]
      }
    }
  }
  return arr
}

/**
 * 冒泡排序
 * @param {Array} arr
 */
function bubleSort(arr) {
  const len = arr.length
  for (let i = 0; i < len - 1; i++) {
    for (let j = len - 1; j > i; j--) {
      if (arr[j] < arr[j - 1]) {
        ;[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      }
    }
  }
  return arr
}

/**
 * 插入排序
 * @param {Array} arr
 */
function insertSort(arr) {
  const len = arr.length
  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        ;[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      } else {
        break
      }
    }
  }
  return arr
}

/**
 * 快速排序
 * @param {*} arr
 */
function quickSort(arr) {
  if (arr.length <= 1) return arr
  const refer = arr.shift()
  const [left, right] = [[], []]
  for (let i = 0; i < arr.length; i++) {
    arr[i] < refer ? left.push(arr[i]) : right.push(arr[i])
  }
  return [...quickSort(left), refer, ...quickSort(right)]
}


function flat(arr) {
  return [].concat(...arr.map(v => Array.isArray(v) ? flat(v) : v))
}


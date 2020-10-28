/**
 * @param {number} n
 * @return {string[][]}
 */

const isValid = (board, row, col) => {
  const size = board.length
  // 当前行以前的行中是否存在同列的Queen
  for (let i = 0; i < row; i++) {
    if (board[i][col] === 'Q') return false
  }
  // 当前位置的左上对角中是否存在Queen
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 'Q') return false
  }
  // 当前位置的右上对角中是否存在Queen
  // 注意：j < size;
  for (let i = row - 1, j = col + 1; i >= 0 && j < size; i--, j++) {
    if (board[i][j] === 'Q') return false
  }
  return true
}

const backtrack = (board, row, res) => {
  if (board.length === row) {
    // __todo
    res.push(board.map((v) => v.join('')))
    return
  }
  const n = board[row].length
  for (let col = 0; col < n; col++) {
    if (!isValid(board, row, col)) continue
    board[row][col] = 'Q'
    backtrack(board, row + 1, res)
    board[row][col] = '.'
  }
}

var solveNQueens = function (n) {
  const res = []
  const board = Array(n)
    .fill('')
    .map(() => Array(n).fill('.'))
  backtrack(board, 0, res)
  return res
}

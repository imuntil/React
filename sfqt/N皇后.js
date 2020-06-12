const res = [];
const N = 8;

function backtrack(track = [], row = 0) {
  if (row === N) {
    res.push(JSON.stringify(track));
    return;
  }
  for (let col = 0; col < N; col++) {
    if (!track[row]) {
      track[row] = Array(N).fill('.');
    }
    if (!isValid(track, row, col)) continue;

    track[row][col] = '*';
    backtrack(track, row + 1);
    track[row][col] = '.';
  }
}

function isValid(track, row, col) {
  for (let i = 0; i < row; i++) {
    if (track[i] && track[i][col] === '*') return false;
  }
  for (let i = row - 1, j = col - 1; i >= 0, j >= 0; i--, j--) {
    if (track[i] && track[i][j] === '*') return false;
  }
  for (let i = row - 1, j = col + 1; i >= 0, j < N; i--, j++) {
    if (track[i] && track[i][j] === '*') return false;
  }
  return true;
}

backtrack();

// 500, 100, 50, 10

const result = []
for (let a = 0; a <= 2; a++) {
  for (let b = 0; b <= 10; b++) {
    for (let c = 0; c <= 15; c++) {
      for (let d = 0; d <= 15; d++) {
        if (
          500 * a + 100 * b + 50 * c + 10 * d === 1000 &&
          a + b + c + d <= 15
        ) {
          result.push({ a, b, c, d })
        }
      }
    }
  }
}

console.log(result)


function change(target, coins, usable, used = [], result = []) {
  if (target === 0) {
    result.push(used)
    return
  }
  if (coins.length === 0) return
  if (usable <= 0) return
  const [coin] = coins
  let x = Math.ceil(target / coin)
  x = x > usable ? usable : x
  if (x * coin < target) return
  for (let i = 0; i <= x; i++) {
    change(target - coin * i, coins.slice(1), usable - i, [...used, `${coin}x${i}`], result)
  }
  return result
}

change(1000, [500, 100, 50, 10], 15)


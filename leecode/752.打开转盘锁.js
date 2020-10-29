/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */

function plus(str, index) {
  const sta = str.split("")
  sta[index] === "9" ? (sta[index] = "0") : (sta[index] -= -1)
  return sta.join("")
}

function minus(str, index) {
  const sta = str.split("")
  sta[index] === "0" ? (sta[index] = "9") : (sta[index] -= 1)
  return sta.join("")
}

var openLock = function(deadends, target) {
  const q = []
  const deads = new Set(deadends)
  const visited = new Set()
  q.push("0000")
  visited.add("0000")
  let step = 0
  while (q.length) {
    const size = q.length
    for (let i = 0; i < size; i++) {
      const cur = q.shift()
      if (deads.has(cur)) continue
      if (target === cur) return step
      for (let j = 0; j < 4; j++) {
        const p = plus(cur, j)
        if (!visited.has(p)) {
          q.push(p)
          visited.add(p)
        }
        const m = minus(cur, j)
        if (!visited.has(m)) {
          q.push(m)
          visited.add(m)
        }
      }
    }
    step++
  }
  return -1
}

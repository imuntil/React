const MAX_STEP = 12
const NEXT_STEPS = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
]

function move(steps) {
  const len = steps.length
  if (len === MAX_STEP + 1) return 1
  const current = steps[len - 1]
  let count = 0
  for (let i = 0; i < NEXT_STEPS.length; i++) {
    const d = NEXT_STEPS[i]
    const next = [current[0] + d[0], current[1] + d[1]]
    if (!steps.find((v) => v[0] === next[0] && v[1] === next[1])) {
      count += move([...steps, next])
    }
  }
  return count
}

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


// 双向 BFS 
var openLock2 = function(deadends, target) {
  let q1 = new Set()
  let q2 = new Set()
  const deads = new Set(deadends)
  const visited = new Set()
  q1.add("0000")
  q2.add(target)
  let step = 0
  while (q1.size && q2.size) {
    const temp = new Set()
    for (let cur of q1) {
      if (deads.has(cur)) continue
      // 双向bfs，当第一次切换到从底部开始搜索时，也就是搜索q2时，q2初始包含target，所以不能使用下面的判断
      // if (cur === target) return step
      if (q2.has(cur)) return step
      // ：为什么在这里才将节点标记为visited？？而不是和单向bfs一样，在 -1) 处标记？
      // ：想了想，-1）处标记相当于提前标记，对于单向bfs没问题，因为接下来立即就会访问到；
      // ：但是对于双向bfs，由于存在变向，所以temp是下下一轮才会遍历，具体可以看一个简单的图例
      //       A
      //      / \
      //     B  C
      //    / \/ \
      //   D  E  F
      //  / \/ \/ \
      // G  H  I  J
      // target为H，起始为A
      // 第一轮：从A开始，temp = [B,C]，然后变向
      // 第二轮：搜索H，temp = [D,E]，然后变向。注意，如果是提前标记，那么B,C,D,E都已经被标记为visited
      // 第三轮，搜索B，由于B的出去A外的另外两个关系节点D，E已经被标记为visited，会使得D，E不能被加入temp，导致查找失败。
      visited.add(cur)
      for (let i = 0; i < 4; i++) {
        const x1 = plus(cur, i)
        if (!visited.has(x1)) {
          temp.add(x1)
          // -1)
          // visited.add(x1)
        }
        const x2 = minus(cur, i)
        if (!visited.has(x2)) {
          temp.add(x2)
          // visited.add(x2)
        }
      }
    }
    step++
    q1 = q2
    q2 = temp
  }
  return -1
}


var openLock2 = function(deadends, target) {
  let q1 = new Set()
  let q2 = new Set()
  const deads = new Set(deadends)
  const visited = new Set()
  q1.add("0000")
  q2.add(target)
  let step = 0
  while (q1.size && q2.size) {
    const temp = new Set()
    // 优化点：因为遍历的是集合q1，q1越小，遍历越快
    q1.size > q2.size && ([q1, q2] = [q2, q1])
    for (let cur of q1) {
      if (deads.has(cur)) continue
      // 双向bfs，当第一次切换到从底部开始搜索时，也就是搜索q2时，q2初始包含target，所以不能使用下面的判断
      // if (cur === target) return step
      if (q2.has(cur)) return step
      // ：为什么在这里才将节点标记为visited？？而不是和单向bfs一样，在 -1) 处标记？
      // ：想了想，-1）处标记相当于提前标记，对于单向bfs没问题，因为接下来立即就会访问到；
      // ：但是对于双向bfs，由于存在变向，所以temp是下下一轮才会遍历，具体可以看一个简单的图例
      //       A
      //      / \
      //     B  C
      //    / \/ \
      //   D  E  F
      //  / \/ \/ \
      // G  H  I  J
      // target为H，起始为A
      // 第一轮：从A开始，temp = [B,C]，然后变向
      // 第二轮：搜索H，temp = [D,E]，然后变向。注意，如果是提前标记，那么B,C,D,E都已经被标记为visited
      // 第三轮，搜索B，由于B的出去A外的另外两个关系节点D，E已经被标记为visited，会使得D，E不能被加入temp，导致查找失败。
      visited.add(cur)
      for (let i = 0; i < 4; i++) {
        const x1 = plus(cur, i)
        if (!visited.has(x1)) {
          temp.add(x1)
          // -1)
          // visited.add(x1)
        }
        const x2 = minus(cur, i)
        if (!visited.has(x2)) {
          temp.add(x2)
          // visited.add(x2)
        }
      }
    }
    step++
    q1 = q2
    q2 = temp
  }
  return -1
}
